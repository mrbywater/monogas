import "./Content.scss"
import "./Services.scss"
import {RequestButton} from "./RequestButton";
import {InfoBlock} from "./InfoBlock";
import {BelowHeaderImage} from "./BelowHeaderImage";
import {ArrowUp} from "./ArrowUp";
import {useRef, useEffect} from "react";
import {servicesInfoInstallation, tableText} from "./InfoList"

const Services = () =>{

    const tableHandler = (category, fStyle, SStyle) => {
        return (
            category.map((item,i) => {
                if (i % 2 === 1) {
                    return (
                        <div className={fStyle}>
                            {item}
                        </div>
                    )
                } else {
                    return (
                        <div className={SStyle}>
                            {item}
                        </div>
                    )
                }
            })
        )       
    }

    return (
        <div className="homeCont">
            <ArrowUp/>
            <BelowHeaderImage
                headline = "Послуги ГБО Monogas"
            />
            <div className="flexCenteredBlock">
                <h1 className="headerFontSize">Всі послуги для ГБО в єдиному автосервісі</h1>
                <RequestButton/>
            </div>
            <div className="separator"></div>
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
            </div>
            <div className="tableCont">
                <div className="title">
                    <div className="headlineText">Найменування робіт</div>
                    {tableHandler(tableText[0].title, "text", "text backgroundTableRow")}
                </div>
                <div className="time">
                    <div className="headlineText">Час виконання</div>
                    {tableHandler(tableText[0].time, "value", "value backgroundTableRow")}
                </div>
                <div className="cost">
                    <div className="headlineText">Вартість, грн</div>
                    {tableHandler(tableText[0].cost, "value", "value backgroundTableRow")}
                </div>
            </div>
        </div>
    )

}

export {Services}