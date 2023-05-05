import "./Content.scss"
import {faCartShopping, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./ShoppingCart.scss"
import {useEffect, useState} from "react";

const ShoppingCart = () => {

    const items = JSON.parse(localStorage.getItem("shoppingCart"))
    const totalPrice = items.map(item => +item.price)

    const [isOpen, setIsOpen] = useState(false)
    const [previousValue, setPreviousValue] = useState(1)
    const [endSum, setEndSum]  = useState(totalPrice.reduce((elem , acc) => elem + acc, 0))

    const close = () => {
        setIsOpen(false)
    }

    const saveValue = (id, price) => (e) => {
        setPreviousValue(e.target.value)
        localStorage.setItem(id, e.target.value)
        localStorage.setItem(`${id}_price`, e.target.value * price)

        document.getElementById(id).innerHTML=`${e.target.value * price}₴`
        console.log(previousValue, e.target.value)
        const innerPrice = +document.querySelector('.itemsInCart > div').innerHTML.replace(/\D/g, '')


    }



    return (
        <>
            <div className="shoppingCartIconCont" onClick={()=>setIsOpen(true)}>
                <FontAwesomeIcon icon={faCartShopping} style={{transition:"none"}} className="shoppingCartIcon"/>
            </div>
            {isOpen &&
                <>
                    <div className="overlay" onClick={close}/>
                    <div className="cartDiv">
                        <FontAwesomeIcon icon={faXmark} onClick={close} className="closeButton"/>
                        <div className="itemsInCartCont">
                            {items.map(item => (
                                <div className="itemsInCart">
                                    <img src={item.img[0]}/>
                                    <span>{item.headline}</span>
                                    <input
                                        type="number"
                                        defaultValue={localStorage.getItem(`${item.headline}`) !== null ? localStorage.getItem(`${item.headline}`) : 1}
                                        onChange={saveValue(item.headline, item.price)}
                                        min={1}
                                        max={item.amount}
                                    />
                                    <div id={item.headline}>{item.price}₴</div>
                                    <FontAwesomeIcon icon={faXmark} className="closeItemCross"/>
                                </div>
                            ))}
                            <div className="totalCont">
                                <div className="totalPrice" id={totalPrice}>
                                    {endSum}₴
                                </div>
                                <div className="acceptButton">Оформити замовлення</div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
)
}

export {ShoppingCart}
