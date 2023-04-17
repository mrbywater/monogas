import "./InfoBlock.scss"
import "./Content.scss"
import AOS from "aos"
import "aos/dist/aos.css"
import {useEffect} from "react";

const InfoBlock = (props) => {

    useEffect(() => {
        AOS.init({duration: 1500})
    },[])

    const {
        headline,
        text,
        img
    } = props

        if (props.index % 2 === 0) {
            return (
                <div className="infoBlocksCont">
                    <div className="infoBlocks">
                        <h2>{headline}</h2>
                        {text.map(elm => (
                            <p>{elm}</p>
                        ))}
                    </div>
                    <div className="infoBlocks" data-aos="fade-left">
                        <img src={img} className="imgSizeForBlocks" />
                    </div>
                </div>
            )
        }else {
            return (
                <div className="infoBlocksCont">
                    <div className="infoBlocks" data-aos="fade-right">
                        <img src={img} className="imgSizeForBlocks" />
                    </div>
                    <div className="infoBlocks">
                        <h2>{headline}</h2>
                        <p>{text}</p>
                    </div>
                </div>
            )
        }
}
export {InfoBlock}