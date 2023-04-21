import "./Content.scss"
import "./AboutUs.scss"
import {BelowHeaderImage} from "./BelowHeaderImage";
import {InfoBlock} from "./InfoBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

 const AboutUsInformation = [
    {
        headline : "Робимо ваш автомобіль економічніше та екологічніше!",
        text : [
            "Ми – експерти з встановлення газобалонного обладнання на автомобілі, які мають понад 5 років досвіду у цій сфері. Ми гарантуємо швидку та якісну установку обладнання, з урахуванням усіх вимог та норм.",
            "Ми також допомагаємо нашим клієнтам у сертифікації обладнання, щоб гарантувати їхню безпеку та відповідність усім стандартам.",
            "Наша компанія прагне забезпечити максимальну зручність та комфорт нашим клієнтам, надаючи широкий спектр послуг із встановлення та обслуговування газобалонного обладнання.",
            "Звертайтесь до нас, і ми із задоволенням допоможемо вам заощаджувати на паливі та покращувати екологічні показники вашого автомобіля.",
        ],
        img : require("../Images/about_us.jpg")
    }
]

const advantages = [
  "Понад 5 років досвіду в установці газобалонного обладнання",
  "Якісне та швидке встановлення обладнання з урахуванням норм та вимог",
  "Допомога у сертифікації обладнання для гарантованої безпеки клієнтів",
  "Широкий спектр послуг з встановлення та обслуговування газобалонного обладнання.",
  "Збільшення економії на паливі та покращення екологічних показників автомобіля клієнта.",
  "Доступність та гнучкий графік роботи",
  "Кваліфіковані спеціалісти з великим досвідом роботи",
  "Гарантія на виконані роботи та встановлене обладнання",
  "Використання якісних запчастин та комплектуючих під час встановлення",
  "Наявність професійного обладнання та інструментів для роботи",
]

const AboutUs = () =>{

    return (
        <div className="homeCont">
            <BelowHeaderImage
                headline = "Про нас"
            />
            <h1></h1>
            {AboutUsInformation.map( (elm,i) => {
                return (
                    <InfoBlock
                        index = {1}
                        headline={elm.headline}
                        text={elm.text}
                        img={elm.img}
                    />)
            })}
            <div className="separator"></div>
            <div className="flexCenteredBlock">
                <div className="infoListCont">
                    <h1>Monogas - це:</h1>
                    <div>
                        {advantages.map(elm =>(
                            <div className="advItem">
                                <FontAwesomeIcon icon={faCheck} />
                                <span className="textDecor">{elm}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}

export {AboutUs}