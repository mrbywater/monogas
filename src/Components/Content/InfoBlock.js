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

    console.log(path)

        if (props.index % 2 === 0) {
            return (
                <div className="infoBlocksCont" >
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
                    <div className="infoBlocks" data-aos="fade-left">
                        <img src={img} className="imgSizeForBlocks"/>   
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