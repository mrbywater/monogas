import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import api from "./routes/apiNP.mjs";
import * as nodemailer from 'nodemailer'
import db from "./db/conn.mjs";
import {ObjectId} from "mongodb";
import axios from "axios";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());

app.use(express.json());

app.use("/record", records);
app.use("/apiNP", api);

let transporter

app.post('/new-item', (req) => {

    const {
        name,
        cost,
        brand,
        status,
        amount,
        img,
        description
    } = req.body

    const collection = db.collection('infoList');

    const filter = { _id: new ObjectId('671a935c61449b5e375f62e0') };
    const update = {
                $addToSet: {
                    shopItems: {
                        img : img.split('\n\n'),
                        headline : name,
                        price : cost,
                        brand : brand,
                        condition : status,
                        amount : amount,
                        description : description.split('\n\n')
                    }
                }
            };

    collection.findOneAndUpdate(filter, update);
})

app.post('/new-user', async (req) => {

    const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Используем сторонний API для определения страны по IP
    const geoResponse = await axios.get(`https://ipinfo.io/45.149.25.81/json?token=5da42df45490d7`);
    const { ip, country, city, region } = geoResponse.data;

    // Теперь у тебя есть данные о пользователе и его IP
    const userData = {
        ...req.body, // Данные из формы
        ip,          // IP-адрес
        country,     // Страна, определенная по IP
        city,
        region,
    };

    console.log(userData, userIP)

    const {
        name,
        email,
        phone,
        carModel,
        carYear,
        distribution,
        userLanguage
    } = req.body

    const collection = db.collection('usersData');

    const filter = { _id: new ObjectId('670e3c57b82c3bd82ee4ef79') };
    const update = {
        $addToSet: {
            users: {
                name : name,
                email : email,
                phone : phone,
                carModel : carModel,
                carYear : carYear,
                distribution: distribution,
                userLanguage: userLanguage,
                userCountry: userData.country,
                userCity: userData.city
            }
        }
    };

    await collection.findOneAndUpdate(filter, update);
})

app.post('/change-item', (req) => {

    const {
        headline,
        name,
        cost,
        brand,
        status,
        amount,
        img,
        description,
    } = req.body

    const collection = db.collection('infoList');

    const query = {
        _id: new ObjectId('671a935c61449b5e375f62e0'),
        shopItems: {
            $elemMatch: { headline: headline }
        }
    };

    const update = {
        $set: {
            'shopItems.$': {
                img : img.split('\n\n').filter(item => item.length !== 0),
                headline : name,
                price : cost,
                brand : brand,
                condition : status,
                amount : amount,
                description : description.split('\n\n').filter(item => item.length !== 0)
            }
        }
    };

    collection.updateOne(query, update)
})

app.post('/delete-item', (req) => {

    const { headline } = req.body

    const collection = db.collection('infoList');

    const query = {
        _id: new ObjectId('671a935c61449b5e375f62e0')
    };

    const update = {
        $pull: {
            shopItems: {
                headline : headline,
            }
        }
    };

    collection.updateOne(query, update)
})

app.post('/send-email', (req, res) => {

    const {
        phoneNumber,
        emailInput,
        tagInputFN,
        tagInputSN,
        totalPrice,
        shopCart,
        address
    }  = req.body;

    if (!transporter) {
         transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        })}


    const mailOption = {
        from: 'monogasauto@gmail.com',
        to: 'monogasauto@gmail.com',
        subject: 'Замовлення',
        html: `
            <div style="font-size: 16px; margin-bottom: 5px">Прізвище: ${tagInputSN}</div> 
            <div style="font-size: 16px; margin-bottom: 5px">Ім'я: ${tagInputFN}</div> 
            <div style="font-size: 16px; margin-bottom: 5px">Телефон: +${phoneNumber}</div> 
            <div style="font-size: 16px; margin-bottom: 5px">Електронна пошта: ${emailInput}</div>
            <div style="font-size: 16px; margin-bottom: 5px">Адреса доставки: ${address}</div>  
            <div style="font-size: 16px; margin-bottom: 5px">Товари:
                <div style='
                        display: flex;
                        height: 50px;
                        flex-wrap: wrap;
                        border: 1px solid black;
                '>
                        <div style='
                            display: flex;
                            width: 50%;
                            font-size: 24px;
                            padding: 10px 0 0 15px;
                            border-right: 1px solid black;
                            justify-content: center;
                            align-items: center;
                        '>
                            <span style="
                                width: 100%;
                                text-align: center;
                            ">
                                Назва
                            </span>
                        </div>
                        <div style='
                            display: flex;
                            width: 50%;
                            font-size: 24px;
                            padding: 10px 0 0 15px;
                        '>
                            <span style="
                                width: 100%;
                                text-align: center;
                            ">
                                Кількіть
                            </span>
                        </div>
                </div>
                ${shopCart.map(item => (
                    `
                        <div style='
                            display: flex;
                            height: 40px;
                            flex-wrap: wrap;
                            border: 1px solid black;
                            border-top: 0px;
                        '>
                            <div style='
                                display: flex;
                                width: 50%;
                                font-size: 20px;
                                padding: 5px 0 0 15px;
                                border-right: 1px solid black;
                            '>
                                <span style="
                                    width: 100%;
                                    text-align: center;
                                ">
                                    ${item.headline}
                                </span>
                            </div>
                            <div style='
                                display: flex;
                                width: 50%;
                                font-size: 20px;
                                padding: 5px 0 0 15px;
                            '>
                                <span style="
                                    width: 100%;
                                    text-align: center;
                                ">
                                    ${item.quantity}
                                </span>
                            </div>
                        </div>
                    `                       
                )).join('')}
            </div>
            <div style="font-size: 16px; margin-top: 5px; font-weight: bold">Сума замовлення: ${totalPrice}₴</div> 
        `
    }

    transporter.sendMail(mailOption, err => console.log('err', err))

});

app.post('/distribution-predict-products', (req, res) => {

    const {
        data
    }  = req.body;

    if (!transporter) {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                }
        })}

    data.forEach(({ user, products }) => {
        const renderedProduct = products.map((product) => (
            `<a href="http://localhost:3000/shop/${product.headline.replace(/ /g, "_").toLowerCase()}" style="display: inline-block; vertical-align: top; box-sizing: border-box; border: 1px solid #1F2023; border-radius: 10px; padding: 10px; margin-right: 15px; text-decoration: none">
              
                <div style="display: inline-block; vertical-align: top; padding-right: 10px;">
                    <img src="${product.img[0]}" style="height: 125px; border-radius: 8px; display: block;margin-right: 15px"/>
                </div>
                <div style="display: inline-block; vertical-align: top;">
                    <span style="font-size: 18px; font-weight: bold; display: block; margin-bottom: 5px;">${product.headline}</span>
                    <span style="font-size: 22px; color: #333;">${product.price}₴</span>
                </div>
           
            </a>`
        )).join('');

        const mailOption = {
            from: 'nick.kabachenko@gmail.com',
            to: user.email,
            subject: 'Замовлення',
            html: `<div style="white-space: nowrap; margin-bottom: 30px;">
                <span style="font-size: 18px; font-weight: bold; display: block; margin-bottom: 10px;">Рекомендовані товари:</span>
                ${renderedProduct}
            </div>`,
        };

        transporter.sendMail(mailOption, (err) => {
            if (err) {
                console.log('Error sending email to:', user.email, err);
            } else {
                console.log('Email sent to:', user.email);
            }
        });
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
