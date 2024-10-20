import { useState, useEffect } from "react";

const tf = require('@tensorflow/tfjs');

export const useTensorFlow = (newFilteredProducts) => {
    const [shopRecommendations, setShopRecommendations] = useState([]);
    const [prevFilteredProducts, setPrevFilteredProducts] = useState(null);

    useEffect(() => {
        // Проверяем, изменились ли новые фильтрованные продукты
        if (JSON.stringify(newFilteredProducts) === JSON.stringify(prevFilteredProducts)) {
            return; // Если данные не изменились, не запускаем mainFilter
        }

        async function mainFilter() {
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
                return modelEncoding;
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

            await predictRec(model, encodeType, normalizePrice, encodeCar, types, products, newFilteredProducts, setShopRecommendations);
        }
        mainFilter();

        // Обновляем сохраненное значение newFilteredProducts
        setPrevFilteredProducts(newFilteredProducts);
    }, [newFilteredProducts, prevFilteredProducts]);

    async function predictRec(model, encodeType, normalizePrice, encodeCar, types, products, newProducts, setShopRecommendations) {

        const accumulatedRecommendations = [];

        for (const newProduct of newProducts) {
            const newProductVector = {
                type: encodeType(newProduct.type),
                price: normalizePrice(newProduct.price),
                cars: newProduct.car.flatMap(car => encodeCar(car.carModel, car.carYear)),
            };

            const newXs = tf.tensor2d([[...newProductVector.type, newProductVector.price, ...newProductVector.cars]]);
            const predictions = model.predict(newXs);

            const predictionArray = await predictions.array();

            const predictedIndex = predictionArray[0].indexOf(Math.max(...predictionArray[0]));
            const predictedType = types[predictedIndex];

            const recommendedProducts = products.filter(product => {
                const isTypeMatch = encodeType(product.type).toString() === encodeType(predictedType).toString();
                const isPriceMatch = Math.abs(normalizePrice(product.price) - newProductVector.price) <= 200;
                const isCarMatch = product.car.some(car =>
                    newProduct.car.some(newCar =>
                        car.carModel === newCar.carModel && car.carYear === newCar.carYear
                    )
                );

                return isTypeMatch && isPriceMatch && isCarMatch;
            });

            if (recommendedProducts.length > 0) {
                accumulatedRecommendations.push(...recommendedProducts);
            }
        }

        const finaleRecommendations = accumulatedRecommendations.filter(recommendedProduct => {
            return !newProducts.some(newProduct => newProduct.headline === recommendedProduct.headline);
        });

        if (finaleRecommendations.length > 0) {
            setShopRecommendations(finaleRecommendations);
        } else {
            console.error("Не найдено подходящих товаров.");
        }
    }

    return { shopRecommendations }
}
