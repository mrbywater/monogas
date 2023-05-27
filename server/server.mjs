import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import api from "./routes/apiNP.mjs";
import * as nodemailer from 'nodemailer'
import db from "./db/conn.mjs";
import {ObjectId} from "mongodb";

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

    const filter = { _id: new ObjectId('6463e9bde6e4e16676e59513') };
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

app.post('/change-item', (req) => {

    const {
        headline,
        name,
        cost,
        brand,
        status,
        amount,
        img,
        description
    } = req.body

    const collection = db.collection('infoList');

    const query = {
        _id: new ObjectId('6463e9bde6e4e16676e59513'),
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
        _id: new ObjectId('6463e9bde6e4e16676e59513')
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
                        margin-bottom: 15px;
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
                ))}
            </div>
            <div style="font-size: 16px; margin-top: 5px; font-weight: bold">Сума замовлення: ${totalPrice}₴</div> 
        `
    }

    transporter.sendMail(mailOption, err => console.log('err', err))

});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});