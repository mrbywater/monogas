import "./Content.scss"
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./ShoppingCart.scss"

const ShoppingCart = () => {


    return (
        <div className="shoppingCartIcon" >
            <FontAwesomeIcon icon={faCartShopping} style={{transition:"none"}} />
        </div>
    )
}

export {ShoppingCart}
