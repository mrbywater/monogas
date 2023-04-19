import "./Content.scss"
import "./AboutUs.scss"
import {BelowHeaderImage} from "./BelowHeaderImage";
import {InfoBlock} from "./InfoBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

 const AboutUsInformation = [
    {
        headline : "AboutUsInformation",
        text : ["1", "2"],
        img : require("../Images/cool_black_car_with_monogas.png")
    }
]

const advantages = [
    {
        title : "Первое",
        description : "test"
    },
    { 
        title : "И",
        description : "test"
    },
    { 
        title : "Дальше",
        description : "test"
    }
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
                    <h1>Monogas - это:</h1>
                    <div>
                        {advantages.map(elm =>(
                            <div className="advItem">
                                <FontAwesomeIcon icon={faCheck} />
                                <span className="textDecor"><i>{elm.title}</i> {elm.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}

export {AboutUs}