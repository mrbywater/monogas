import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import "./ArrowUp.scss"

const ArrowUp = () => {

    const [arrowUp, setArrowUp] = useState(false)
    const [arrowAnimation, setArrowAnimation] = useState('')

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
            <div className={`arrowUp ${arrowAnimation}`} onClick={scrollUp}>
                <FontAwesomeIcon icon={faAngleUp} />
            </div>
    )
}

export {ArrowUp}