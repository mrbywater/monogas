import "./Content.scss"
import "./Home.scss"
import test_1 from "../Images/test_1.jpg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect} from "react"

const Home = () =>{

    const [arrowUp, setArrowUp] = useState(false)
    const [arrowAnimation, setArrowAnimation] = useState('')

    const obj = [
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

    useEffect(() =>{
        window.addEventListener("scroll", () =>{
            if (window.scrollY > 400) {
                setArrowUp(true);
                setArrowAnimation("arrowUpVisible")
            } else {
                setArrowUp(false);
                setArrowAnimation("arrowUpHidden")
            }
        })
    }, [])


    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className="homeCont">
            {(
                <div className={`arrowUp ${arrowAnimation}`} onClick={scrollUp}>
                    <FontAwesomeIcon icon={faAngleUp} />
                </div>
            )}
            <div className="launchCont">
                    <h1>Установка та обслуговування ГБО в Одесі</h1>
                    <h2>Monogas | Моногас</h2>
                    <h4>Ремонт й техничене обслуговування ГБО</h4>
                    <div className="requestButton">
                        Оставить заявку
                </div>
            </div>
            <div className="servicesCont">
                <div className="servicesText">
                    <h1>Послуги Monogas</h1>
                    <h2>Ремонт та сервісне обслуговування</h2>
                </div>
                <div className="servicesButtonCont">
                    <div className="servicesButton">
                        Установка ГБО 2-го покоління
                    </div>
                    <div className="servicesButton">
                        Установка ГБО 4-го покоління
                    </div>
                    <div className="servicesButton">
                        Установка ГБО на FSI, TSI, GDI
                    </div>
                </div>
                <div className="servicesButtonCont">
                    <div className="servicesButton">
                        Установка ГБО на електромобілі
                    </div>
                    <div className="servicesButton">
                        Установка ГБО на дизель
                    </div>
                </div>
            </div>
            <div className="separator"></div>
            <div>
                {obj.map( (elm,i) => {
                    if (i % 2 === 0) {
                        return (
                            <div className="servicesButtonCont">
                                <div className="infoBlocks">
                                    <h2>{elm.headline}</h2>
                                    <p>{elm.text}</p>
                                </div>
                                <div className="infoBlocks">
                                    <img src={elm.img} className="imgSizeForBlocks"/>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="servicesButtonCont">
                                <div className="infoBlocks">
                                    <img src={elm.img} className="imgSizeForBlocks"/>
                                </div>
                                <div className="infoBlocks">
                                    <h2>{elm.headline}</h2>
                                    <p>{elm.text}</p>
                                </div>
                            </div>
                        )
                    }
                })
                }
            </div>
        </div>
    )

}

export {Home}