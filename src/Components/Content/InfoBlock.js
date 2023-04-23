import "./InfoBlock.scss"
import "./Content.scss"
import AOS from "aos"
import "aos/dist/aos.css"
import {useEffect} from "react"
import {Link} from 'react-router-dom'

const InfoBlock = (props) => {

    const {
        headline,
        text,
        img,
        path
    } = props

    useEffect(() => {

        AOS.init({duration: 1500})

    }, [])


        if (props.index % 2 === 0) {
            return (
                <div className="infoBlocksCont" id={path}>
                    <div className="infoBlocks">
                        <span className="headline">{headline}</span>
                        {text.map(elm => (
                            <span className="spanPadding">{elm}</span>
                        ))}
                        {!!path &&(
                            <Link  to={"/services/" + path} className="path">
                                Детальніше...
                            </Link > 
                        )}
                    </div>
                    <div className="infoBlocks">
                        <img src={img} className="imgSizeForBlocks" data-aos="fade-left"/>
                    </div>
                </div>
            )
        }else {
            return (
                <div className="infoBlocksCont infoBlocksContProperReverse" id={path}>
                    <div className="infoBlocks">
                        <img src={img} className="imgSizeForBlocks" data-aos="fade-right"/>
                    </div>
                    <div className="infoBlocks">
                        <span className="headline">{headline}</span>
                        {text.map(elm => (
                            <span className="spanPadding">{elm}</span>
                        ))}
                        {!!path &&(
                            <Link  to={"/services/" + path} className="path">
                                Детальніше...
                            </Link > 
                        )}
                    </div>
                </div>
            )
        }
}
export {InfoBlock}