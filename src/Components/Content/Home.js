import "./Content.scss"
import "./Home.scss"
import {RequestButton} from "./RequestButton";
import {ArrowUp} from "./ArrowUp";
import {InfoBlock} from "./InfoBlock";
import {services} from "./SpecificService"
import {HashLink} from "react-router-hash-link"

const obj = [
    {
        headline : "Вигоди ГБО від Monogas",
        text : [
            "ГБО від Monogas – ГБО від найкращої автогазової СТО",
            "Впевненість. Monogas – це професійний монтаж, гарантія якості та кваліфіковане обслуговування.",
            "Безпека. Жодних б/в балонів та обладнання. Ми не використовуємо нелегальне обладнання, підробки та копії.",
            "Якість. ГБО монтується відповідно до технологічних карт. Проведення та рукави укладаються в гофри.",
            "Экономичность. Современное ГБО позволяет существенно снизить затраты на топливо и обслуживание автомобиля."
        ],
        img : require("../Images/man_working_under_the_hood_of_a_car.jpg")
    },
    {
        headline : "Етапи встановлення ГБО",
        text : [
            "1. Вы получаете подробнейшую консультацию с подбором оптимальных комплектующих для вашего автомобиля.",
            "2. Пригоняете автомобиль на СТО и после диагностики наши мастера устанавливают на него ГБО.",
            "3. Монтаж газобаллонного оборудования и его тщательная настройка занимают примерно 1 рабочий день.",
            "4. Вы забираете переоборудованный автомобиль и весь пакет документов для перерегистрации."
        ],
        img : require("../Images/car_with_hood_up.avif")
    },
    {
        headline : "Monogas - це:",
        text : [
            "Досвідчені майстри ГБО. Ми вирішуємо будь-які завдання у сфері ГБО та гарантуємо кваліфіковане обслуговування вашого автомобіля.",
            "Обслуговуємо на 100%. Незалежно від того, де та яке ГБО ви встановили, наші майстри нададуть допомогу та підтримку з будь-яких питань у сфері ГБО.",
            "Сертифікація ГБО. Надаємо допомогу в одержанні сертифікації на газобалонне обладнання."

        ],
        img : require("../Images/cool_black_car_with_monogas.png")
    }
]

const Home = () =>{

    return (
        <div className="homeCont" id="top">
            <ArrowUp/>
            <div className="launchCont">
                    <h1> Установка та обслуговування ГБО в Одесі</h1>
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
                    {services.map(elm =>(
                        <HashLink  to={"/services#" + elm.path} className="servicesButton">
                            {elm.title}
                        </HashLink >
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