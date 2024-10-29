const tf = require('@tensorflow/tfjs');
const axios = require("axios");
const {xportToExcel} = require("./exportToExcel");

// Подключение к базе данных MongoDB
async function fetchProducts() {
    const response = await fetch("http://localhost:5050/record");
    return await response.json();
}

// Функция для получения пользователей
async function fetchUsers() {
    const response = await fetch("http://localhost:5050/record/users");
    return await response.json();
}

// Функция для получения пользователей, которым нужно сделать рекомендации
async function getUsersForDistribution(users) {
    return users[0].users.filter(user => user.distribution === "checked");
}

async function mainFilter() {


    const users = await fetchUsers();            // Получаем пользователей
    const itemsData = await fetchProducts();         // Получаем продукты
    const usersForDistribution = await getUsersForDistribution(users); // Фильтруем пользователей

    const products = itemsData[0].shopItems;

    const cities = [...new Set(products.flatMap(product => product.cities))];

    const cars = [...new Map(
        products.flatMap(product => product.car.map(car => [`${car.carModel} - ${car.carYear}`, car]))
    ).values()];

    function encodeType(city) {
        const encoding = new Array(cities.length).fill(0);
        const index = cities.indexOf(city);
        if (index !== -1) {
            encoding[index] = 1;
        }
        return encoding;
    }

    function encodeCar(carModel, carYear) {
        const modelEncoding = new Array(cars.length).fill(0);
        const modelIndex = cars.findIndex(c => c.carModel === carModel && +c.carYear === +carYear);
        if (modelIndex !== -1) {
            modelEncoding[modelIndex] = 1;
        }
        return modelEncoding;
    }

    const productVectors = products.map(product => ({
        cities: encodeType(product.cities),
        cars: product.car.flatMap(car => encodeCar(car.carModel, +car.carYear)),
    }));

    const inputSize = productVectors[0] ? [...productVectors[0].cities, ...productVectors[0].cars].length : 0;
    const outputSize = cities.length;

    const modelUsers = tf.sequential();
    modelUsers.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [inputSize] }));
    modelUsers.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    modelUsers.add(tf.layers.dense({ units: outputSize, activation: 'sigmoid' }));
    modelUsers.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });

    const xs = tf.tensor2d(productVectors.map(p => [...p.cities, ...p.cars]));
    const ys = tf.tensor2d(products.map(product => encodeType(product.cities)));

    const history = await modelUsers.fit(xs, ys, { epochs: 100 })
    console.log(history)

    await modelUsers.fit(xs, ys, { epochs: 100 });

    await predictRec(modelUsers, encodeType, encodeCar, cities, products, usersForDistribution);

}

async function predictRec(model, encodeType, encodeCar, cities, products, usersForDistribution) {
    const accumulatedRecommendations = [];

    const predictCity = (allCities, userSelectedCity) => {
        return (
            tf.equal(tf.tensor(allCities), tf.tensor([userSelectedCity]))
                .any()
                .dataSync()[0]
        )
    }

    for (const users of usersForDistribution) {

        const recommendedProducts = products.filter(product => {
            const isCarMatch = product.car.some(car => car.carModel === users.carModel && +car.carYear === +users.carYear);
            const cityMatches = predictCity(product.cities, users.userCity);
            return cityMatches && isCarMatch;
        });

        if (recommendedProducts.length > 0) {
            accumulatedRecommendations.push({products: [...recommendedProducts].slice(0, 5),user: users});
        }
    }


    if (accumulatedRecommendations.length > 0) {
        await axios.post('http://localhost:5050/distribution-predict-products', {
            data: accumulatedRecommendations
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        console.error("Не найдено подходящих товаров.");
    }
}

// Запуск
mainFilter()