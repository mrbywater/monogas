import "./Content.scss"
import {faCartShopping, faMinus, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./ShoppingCart.scss"
import {ShoppingCartContext} from "../Context/ShoppingCartContext"
import React, {useContext} from "react";
import {Link, useLocation} from "react-router-dom";

const ShoppingCart = () => {

    const cart = useLocation()

    const {
        shopCart,
        isOpen,
        setIsOpen,
        totalPrice,
        removeItemFromCart,
        increaseItemQuantity,
        decreaseItemQuantity
    } = useContext(ShoppingCartContext)

    const close = () => {
        setIsOpen(false)
    }

    return (
        <div className="shoppingCartIconContHeader">
            {cart.pathname === "/order" ? (
                <div id="shoppingCart" onClick={()=>setIsOpen(true)}>
                    Редагувати
                </div>
            ): (
                <div className="shoppingCartIconCont" onClick={()=>setIsOpen(true)}>
                    <FontAwesomeIcon
                        icon={faCartShopping}
                        className="shoppingCartIcon"
                    />
                    {!!shopCart.length && (
                        <div>{shopCart.length}</div>
                    )}
                </div>
            )}
            {isOpen &&
                <>
                    <div className="overlay" onClick={close}/>
                    <div className="cartDiv">
                        <FontAwesomeIcon icon={faXmark} onClick={close} className="closeButton"/>
                        <div className="itemsInCartCont">
                            {shopCart.map(item => (
                                <div className="itemsInCart">
                                    <div className="imgAndTextCont">
                                        <img src={item.img[0]}/>
                                        <span>{item.headline}</span>
                                    </div>
                                    <div className="inputAndPriceCont">
                                        <FontAwesomeIcon
                                            icon={faMinus}
                                            className={item.quantity !== 1 ? "minusButton" : "minusButton disabledBtn"}
                                            onClick={decreaseItemQuantity(item)}
                                        />
                                        <input
                                            id={item.headline}
                                            value={item.quantity}
                                            min={1}
                                            max={item.amount}
                                        />
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            className={item.amount !== item.quantity ? "plusButton" : "plusButton disabledBtn"}
                                            onClick={increaseItemQuantity(item)}
                                        />
                                        <div
                                            id={item.headline}
                                            key={`${item.headline}_price`}
                                        >
                                            {item.price * item.quantity}₴
                                        </div>
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        className="closeItemCross"
                                        onClick={removeItemFromCart(item)}
                                    />
                                </div>
                            ))}
                            {!!shopCart.length ?
                                (<div className="totalCont">
                                    <div className="totalPrice">
                                        {totalPrice}₴
                                    </div>
                                    <Link to="/order" className="acceptButton" onClick={close}>
                                        Оформити замовлення
                                    </Link>
                                </div>) : (
                                    <span className="emptyCart">Кошик порожній...</span>
                                )
                            }
                        </div>
                    </div>
                </>
            }
        </div>
   )
}

export {ShoppingCart}
