import "./Content.scss"
import "./Services.scss"
import {RequestButton} from "./RequestButton";
import {InfoBlock} from "./InfoBlock";
import {BelowHeaderImage} from "./BelowHeaderImage";
import {ArrowUp} from "./ArrowUp";
import {useRef, useEffect} from "react";
import {servicesInfoInstallation, tableText} from "./InfoList"

const Services = () =>{

    const tableHandler = (category, style) => {
        return (
            category.map((item,i) => {
                if (i % 2 === 1) {
                    return (
                        <div className="elementCont">
                            <div className="title text">{item.title}</div>
                            <div className="time value">{item.time}</div>
                            <div className="cost value">{item.cost}</div>
                        </div>
                    )
                } else {
                    return (
                        <div className="elementCont">
                            <div className={`title text ${style}`}>{item.title}</div>
                            <div className={`time value ${style}`}>{item.time}</div>
                            <div className={`cost value ${style}`}>{item.cost}</div>
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
                <div className="elementCont">
                                <div className="title headlineText">Найменування робіт</div>
                                <div className="time headlineText">Час</div>
                                <div className="cost headlineText">Ціна, грн</div>
                </div>
                {tableHandler(tableText, "backgroundTableRow")}
            </div>
        </div>
    )

}

export {Services}