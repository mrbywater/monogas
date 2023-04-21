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
            "Економічність. Сучасне ГБО дозволяє суттєво знизити витрати на паливо та обслуговування автомобіля."        ],
        img : require("../Images/man_working_under_the_hood_of_a_car.jpg")
    },
    {
        headline : "Етапи встановлення ГБО",
        text : [
            "1. Ви отримуєте докладну консультацію з підбором оптимальних комплектуючих для вашого автомобіля.",
            "2. Приганяєте автомобіль на СТО та після діагностики наші майстри встановлюють на нього ГБО.",
            "3. Монтаж газобалонного обладнання та його ретельне налаштування займають приблизно 1 робочий день.",
            "4. Ви забираєте переобладнаний автомобіль та весь пакет документів для перереєстрації."
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

    // fetch('https://catalog.api.2gis.com/3.0/suggests')
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((data) => {
    //         console.log(data);
    //     });

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