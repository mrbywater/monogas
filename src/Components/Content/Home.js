import "./Content.scss"
import "./Home.scss"
import {RequestButton} from "./RequestButton";
import {ArrowUp} from "./ArrowUp";
import {InfoBlock} from "./InfoBlock";
import {HashLink} from "react-router-hash-link"
import {homeInfo, servicesName} from "./InfoList"

const Home = () =>{

    return (
        <div className="homeCont" id="top">
            <ArrowUp/>
            <div className="launchCont">
                    <h1>Установка та обслуговування ГБО в Одесі</h1>
                    <h2>Monogas | Моногас</h2>
                    <h4>Ремонт й технічне обслуговування ГБО</h4>
                    <RequestButton/>
            </div>
            <div className="flexCenteredBlock">
                <div className="servicesText">
                    <h1>Послуги Monogas</h1>
                    <h2>Ремонт та сервісне обслуговування</h2>
                </div>
                <div className="servicesButtonCont">
                    {servicesName.map(elm =>(
                        <HashLink  to={"/services#" + elm.path} className="servicesButton">
                            {elm.title}
                        </HashLink >
                    ))}
                </div>
            </div>
            <div className="separator"></div>
            <div>
                {homeInfo.map( (elm,i) => {
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