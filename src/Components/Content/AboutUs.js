import "./Content.scss"
import "./AboutUs.scss"
import {BelowHeaderImage} from "./BelowHeaderImage";
import {InfoBlock} from "./InfoBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {aboutUsInformation, aboutUsAdvantages} from "./InfoList"

const AboutUs = () =>{

    return (
        <div className="homeCont">
            <BelowHeaderImage
                headline = "Про нас"
            />
            <h1></h1>
            {aboutUsInformation.map( (elm,i) => {
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
                        {aboutUsAdvantages.map(elm =>(
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