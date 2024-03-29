import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import "./ArrowUp.scss"

const ArrowUp = () => {

    const [arrowAnimation, setArrowAnimation] = useState('')

    useEffect(() =>{
        window.addEventListener("scroll", () =>{
            if (window.scrollY > 400) {
                setArrowAnimation("arrowUpVisible")
            } else {
                setArrowAnimation("arrowUpHidden")
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0
        })
    }

    return (
            <div className={`arrowUp ${arrowAnimation}`} onClick={scrollUp}>
                <FontAwesomeIcon icon={faAngleUp} />
            </div>
    )
}

export {ArrowUp}