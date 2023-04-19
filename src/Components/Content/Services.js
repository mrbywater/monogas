import "./Content.scss"
import "./Services.scss"
import {RequestButton} from "./RequestButton";
import {InfoBlock} from "./InfoBlock";
import test_1 from "../Images/cool_black_car_with_monogas.png";
import {BelowHeaderImage} from "./BelowHeaderImage";
import {ArrowUp} from "./ArrowUp";
import {useRef, useEffect} from "react";

const servicesInfoInstallation = [
    {
        headline : "Установка ГБО 2-го покоління",
        text : [
            "Вартість встановлення: від 260$",
            "Встановлюється інжекторні двигуни.",
            "Газ під власним тиском виходить по видатковій магістралі з балона до редуктора, там тиск знижується до робочого, і газ перетворюється з рідкого в газоподібний стан, нагріваючись при цьому."
        ],
        img : require("../Images/second_generation.jpg"),
        path : "second_generation"
    },
    {
        headline : "Установка ГБО 4-го покоління",
        text : [
            "Вартість встановлення:",
            "4 циліндри - від 390$",
            "6 циліндри - від 700$",
            "8 циліндри - від 900$",
            "ГБО 4 покоління – використовує систему циклічної подачі газу.",
            "За рахунок фазованого упорскування з'явилася можливість зменшити витрату палива, значно знизити кількість викидів у навколишнє середовище, знизити навантаження на випускні клапани та циліндро-поршневу систему, а також підвищити динамічні характеристики."
        ],
        img : require("../Images/fouth_generation.webp"),
        path : "fouth_generation"
    },
    {
        headline : "Установка ГБО на FSI, TSI, GDI",
        text : [
            "Вартість встановлення:",
            "4 циліндри - від 1000$",
            "6 циліндри - від 1200$",
            "8 циліндри - від 1400$",
            "ГБО на двигун TSI, GDI, TSI повинен гармонійно вписуватися в решту електроніки вашого автомобіля.",
            "«Рідна» прошивка, а також прошивка ГБО мають працювати злагоджено та не конфліктувати. Існують також універсальні варіанти, що підходять під будь-яку прошивку."
        ],
        img : require("../Images/tsi_fsi_tfsi.jpg"),
        path : "fsi_tsi_gdi"
    },
    {
        headline : "Установка ГБО на електромобілі",
        text : ["2"],
        img : require("../Images/electro_car.jpg"),
        path : "electric_car"
    },
    {
        headline : "Установка ГБО на дизель",
        text : ["2"],
        img : require("../Images/disel.png"),
        path : "diesel"
    }
]

const servicesInfoService = [
    {
        headline : "1",
        text : ["2"],
        img : test_1
    },
    {
        headline : "3",
        text : ["4"],
        img : test_1
    },
    {
        headline : "5",
        text : ["6"],
        img : test_1
    }
]

const Services = () =>{

    return (
        <div className="homeCont">
            <ArrowUp/>
            <BelowHeaderImage
                headline = "Послуги ГБО Monogas"
            />
            <div className="flexCenteredBlock">
                <h1 className="headerFontSize">Всі послуги для ГБО в єдиному автосервісі</h1>
                    <RequestButton/>
                <div className="separator"></div>
            </div>
            <div className="flexCenteredBlock">
                <h1 className="headerFontSize">Монтаж ГБО</h1>
                {servicesInfoInstallation.map( (elm,i) => {
                    return (
                        <InfoBlock
                            index={i}
                            headline={elm.headline}
                            text={elm.text}
                            img={elm.img}
                            path={elm.path}
                        />
                    )
                })}
            </div>
            <div className="separator"></div>
            <div className="flexCenteredBlock">
                <h1 className="headerFontSize">Сервіс ГБО</h1>
                {servicesInfoService.map( (elm,i) => {
                    return (
                        <InfoBlock
                            index = {i}
                            headline={elm.headline}
                            text={elm.text}
                            img={elm.img}
                        />)
                })}
            </div>
        </div>
    )

}

export {Services}