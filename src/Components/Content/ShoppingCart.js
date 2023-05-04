import "./Content.scss"
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./ShoppingCart.scss"

const ShoppingCart = () => {

    function showCart() {
        const cartDiv = document.createElement('div');
        cartDiv.classList.add('cart-div');

        const closeBtn = document.createElement('span');
        closeBtn.classList.add('close-btn');
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
            document.body.removeChild(cartDiv);
        });
        cartDiv.appendChild(closeBtn);

        document.body.appendChild(cartDiv);

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.addEventListener('click', () => {
            document.body.removeChild(overlay);
            document.body.removeChild(cartDiv);
        });
        document.body.appendChild(overlay);

        setTimeout(() => {
            cartDiv.classList.add('show');
        }, 50);
    }


    return (
        <div onClick={showCart} className="shoppingCartIconCont">
            <FontAwesomeIcon icon={faCartShopping} style={{transition:"none"}} className="shoppingCartIcon"/>
        </div>
)
}

export {ShoppingCart}
