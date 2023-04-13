import "./Content.scss"
import "./Services.scss"
import {RequestButton} from "./RequestButton";
import {InfoBlock} from "./InfoBlock";
import test_1 from "../Images/test_1.jpg";

const Services = () =>{

    const servicesInfo = [
        {
            headline : "1",
            text : "2",
            img : test_1
        },
        {
            headline : "3",
            text : "4",
            img : test_1
        },
        {
            headline : "5",
            text : "6",
            img : test_1
        }
    ]

    return (
        <div className="homeCont">
            <div className="launchContServices">
                <h1>Послуги ГБО Monogas</h1>
            </div>
            <div className="flexCenteredBlock">
                <h1>Всі послуги для ГБО в єдиному автосервісі</h1>
                <RequestButton/>
                <div className="separator"></div>
            </div>
            <div className="flexCenteredBlock">
                <h1 className="headerFontSize">Монтаж ГБО</h1>
                {servicesInfo.map( (elm,i) => {
                    return (
                        <InfoBlock
                            index = {i}
                            headline={elm.headline}
                            text={elm.text}
                            img={elm.img}
                        />)
                })}
            </div>
            <div className="separator"></div>
            <div className="flexCenteredBlock">
                <h1 className="headerFontSize">Сервіс ГБО</h1>
                {servicesInfo.map( (elm,i) => {
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