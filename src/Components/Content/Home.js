import "./Content.scss"
import "./Home.scss"
import {RequestButton} from "./RequestButton";
import test_1 from "../Images/test_1.jpg"
import {ArrowUp} from "./ArrowUp";
import {InfoBlock} from "./InfoBlock";

const Home = () =>{

    const obj = [
        {
            headline : "1",
            text : ["1"],
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

    const buttonServices = [
        "Установка ГБО 2-го покоління",
        "Установка ГБО 4-го покоління",
        "Установка ГБО на FSI, TSI, GDI",
        "Установка ГБО на електромобілі",
        "Установка ГБО на дизель"
    ]

    return (
        <div className="homeCont">
            <ArrowUp/>
            <div className="launchCont">
                    <h1>Установка та обслуговування ГБО в Одесі</h1>
                    <h2>Monogas | Моногас</h2>
                    <h4>Ремонт й техничене обслуговування ГБО</h4>
                    <RequestButton/>
            </div>
            <div className="flexCenteredBlock">
                <div className="servicesText">
                    <h1>Послуги Monogas</h1>
                    <h2>Ремонт та сервісне обслуговування</h2>
                </div>
                <div className="servicesButtonCont">
                    {buttonServices.map(elm =>(
                        <div className="servicesButton">
                            {elm}
                        </div>
                    ))}
                </div>
            </div>
            <div className="separator"></div>
            <div>
                {obj.map( (elm,i) => {
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

export {Home}