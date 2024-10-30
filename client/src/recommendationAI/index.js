    import { useState, useEffect } from "react";
    import {exportToExcel} from "./exportToExcel";

    const tf = require('@tensorflow/tfjs');

    export const useTensorFlow = (newFilteredProducts) => {
        const [shopRecommendations, setShopRecommendations] = useState([]);
        const [prevFilteredProducts, setPrevFilteredProducts] = useState(null);
        const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false); // Добавляем переменную isLoadingRecommendation

        useEffect(() => {
            // Проверяем, изменились ли новые фильтрованные продукты
            if (JSON.stringify(newFilteredProducts) === JSON.stringify(prevFilteredProducts)) {
                return; // Если данные не изменились, не запускаем mainFilter
            }

            async function mainFilter() {
                setIsLoadingRecommendation(true); // Устанавливаем загрузку в true при запуске
                try {
                    let productsFetch = await fetch("http://localhost:5050/record")
                        .then(response => response.json());

                    const products = productsFetch[0].shopItems;

                    const types = [...new Set(products.map(product => product.type))];
                    const cars = [...new Map(
                        products.flatMap(product => product.car.map(car => [`${car.carModel} - ${car.carYear}`, car]))
                    ).values()];
                    const priceArr = products.map(elm => elm.price)

                    const minPrice = Math.min(...priceArr);
                    const maxPrice = Math.max(...priceArr);

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
                    model.compile({ optimizer: tf.train.rmsprop(0.001), loss: 'binaryCrossentropy' });

                    const xs = tf.tensor2d(productVectors.map(p => [...p.type, p.price, ...p.cars]));
                    const ys = tf.tensor2d(products.map(product => encodeType(product.type)));
                    const startTime = performance.now();

                    await model.fit(xs, ys, { epochs: 100 });

                    const history = await model.fit(xs, ys, { epochs: 100 })

                    console.log(history)
                    const endTime = performance.now();

                    const trainingTime = ((endTime - startTime) / 1000).toFixed(2);

                    await exportToExcel('adam',[{ epoch: history.epoch, loss: history.history.loss}], trainingTime, 'contextAds')

                    await predictRec(model, encodeType, normalizePrice, encodeCar, types, products, newFilteredProducts, setShopRecommendations);
                } finally {
                    setIsLoadingRecommendation(false); // Устанавливаем загрузку в false после завершения
                }
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
                    const isPriceMatch = Math.abs(normalizePrice(product.price) - newProductVector.price) <= newProductVector.price;
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

        return { shopRecommendations, isLoadingRecommendation }; // Возвращаем также isLoadingRecommendation
    }
