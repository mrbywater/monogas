import "./Content.scss"
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import "./ShoppingCart.scss"

const ShoppingCart = () => {

    //const [arrowAnimation, setArrowAnimation] = useState('')

    // useEffect(() =>{
    //     window.addEventListener("scroll", () =>{
    //         if (window.scrollY > 400) {
    //             setArrowAnimation("arrowUpVisible")
    //         } else {
    //             setArrowAnimation("arrowUpHidden")
    //         }
    //     })
    // }, [])

    // const scrollUp = () => {
    //     window.scrollTo({
    //         top: 0
    //     })
    // }

    return (
        <div className="shoppingCartIcon">
            <FontAwesomeIcon icon={faCartShopping} />
        </div>
    )
}

export {ShoppingCart}
