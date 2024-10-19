const tf = require('@tensorflow/tfjs');

const newProduct = {
    amount: 5,
    brand: "TRW",
    car: [
        {carModel: 'Honda', carYear: 2013},
        {carModel: 'Mazda', carYear: 2014}
    ],
    condition:"Новий",
    description: ['Комплект гальмівних колодок TRW з високим рівнем зчеплення та стійкістю до зносу.', 'Ідеальний вибір для агресивного стилю водіння.', 'Забезпечує короткий гальмівний шлях на будь-якій поверхні дороги.'],
    headline:"Гальмівні колодки TRW GDB 3175",
    img:['https://content2.rozetka.com.ua/goods/images/big/343731934.jpg'],
    price:900,
    type:"Brake Pads",
};

async function main() {
    const fetch = (await import('node-fetch')).default;

    let productsFetch = await fetch("http://localhost:5050/record")
        .then(response => response.json());

    const products = productsFetch[0].shopItems;

    const types = [...new Set(products.map(product => product.type))];
    const cars = [...new Map(
        products.flatMap(product => product.car.map(car => [`${car.carModel} - ${car.carYear}`, car]))
    ).values()];

    const minPrice = 0;
    const maxPrice = 3000;

    function encodeType(type) {
        const encoding = new Array(types.length).fill(0);
        const index = types.indexOf(type);
        if (index !== -1) {
            encoding[index] = 1;
        }
        return encoding;
    }

    function normalizePrice(price) {
        return (price - minPrice) / (maxPrice - minPrice);
    }

    function encodeCar(carModel, carYear) {
        const modelEncoding = new Array(cars.length).fill(0);
        const modelIndex = cars.findIndex(c => c.carModel === carModel && c.carYear === carYear);
        if (modelIndex !== -1) {
            modelEncoding[modelIndex] = 1;
        }
        return modelEncoding; // Возвращаем только модель
    }

    const productVectors = products.map(product => ({
        type: encodeType(product.type),
        price: normalizePrice(product.price),
        cars: product.car.flatMap(car => encodeCar(car.carModel, car.carYear)),
    }));

    const inputSize = productVectors[0] ? [...productVectors[0].type, productVectors[0].price, ...productVectors[0].cars].length : 0;
    const outputSize = types.length;

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [inputSize] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: outputSize, activation: 'sigmoid' }));
    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });

    const xs = tf.tensor2d(productVectors.map(p => [...p.type, p.price, ...p.cars]));
    const ys = tf.tensor2d(products.map(product => encodeType(product.type)));

    await model.fit(xs, ys, { epochs: 100 });
    console.log("Обучение завершено!");

    predictRec(model, encodeType, normalizePrice, encodeCar, types, products);
}

async function predictRec(model, encodeType, normalizePrice, encodeCar, types, products) {
    const newProductVector = {
        type: encodeType(newProduct.type),
        price: normalizePrice(newProduct.price),
        cars: newProduct.car.flatMap(car => encodeCar(car.carModel, car.carYear)),
    };

    const newXs = tf.tensor2d([[...newProductVector.type, newProductVector.price, ...newProductVector.cars]]);
    const predictions = model.predict(newXs);

    // Получаем массив предсказаний
    const predictionArray = await predictions.array();
    console.log("Предсказания: ", predictionArray);

    // Находим индекс наибольшего значения
    const predictedIndex = predictionArray[0].indexOf(Math.max(...predictionArray[0]));

    // Получаем тип товара по индексу
    const predictedType = types[predictedIndex];

    // Находим соответствующий товар с учетом типа, цены и характеристик автомобилей
    const recommendedProduct = products.find(product => {
        const isTypeMatch = encodeType(product.type).toString() === encodeType(predictedType).toString();
        const isPriceMatch = Math.abs(normalizePrice(product.price) - newProductVector.price) <= 200; // Допуск по цене
        const isCarMatch = product.car.some(car =>
            newProduct.car.some(newCar =>
                car.carModel === newCar.carModel && car.carYear === newCar.carYear
            )
        );

        return isTypeMatch && isPriceMatch && isCarMatch;
    });

    if (recommendedProduct) {
        console.log(`Рекомендуемый товар: `, recommendedProduct);
    } else {
        console.log("Не найдено подходящего товара.");
    }
}

// Запускаем основную функцию
main().catch(err => console.error(err));
