import "./Content.scss"
import {faCartShopping, faMinus, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./ShoppingCart.scss"
import {ShoppingCartContext} from "../Context/ShoppingCartContext"
import React, {useContext, useEffect, useState} from "react";

const ShoppingCart = () => {

    const {
        shopItems,
        removeItemFromCart,
        increaseItemQuantity,
        decreaseItemQuantity
    } = useContext(ShoppingCartContext)

    const [isOpen, setIsOpen] = useState(false)

    const close = () => {
        setIsOpen(false)
    }

    console.log(shopItems)

    // const saveValue = (id, price) => (e) => {
    //
    //     setItemInnerPrices(items.map(item => {
    //         if (id === item.headline) {
    //             return {
    //                 headline: item.headline,
    //                 price:e.target.value * price
    //             }
    //         } else {
    //            return {
    //                headline: item.headline,
    //                price:+item.price
    //            }
    //         }
    //     }))
    //
    //     localStorage.setItem(id, e.target.value)
    //     localStorage.setItem(`${id}_price`, e.target.value * price)
    //
    //     document.getElementById(id).innerHTML=`${e.target.value * price}₴`
    //
    // }

     // const handleKeyPress=(amount) => (e) =>{
     //     if (e.target.value >= amount) {
     //         e.preventDefault();
     //     }
     // }

    //  const deleteItemFromCart = (headline, price) => (e) =>{
    //
    //      setItemInnerPrices(itemInnerPrices.filter(elem => elem.headline !== headline))
    //      setItems(items.filter(elem => elem.headline !== headline))
    //      setNewPrices(newPrices.filter(elem => elem !== headline))
    //
    //      localStorage.setItem('itemInnerPrices', JSON.stringify(itemInnerPrices.filter(elem => elem.headline !== headline)))
    //      localStorage.setItem('shoppingCart', JSON.stringify(items.filter(elem => elem.headline !== headline)))
    //      localStorage.setItem(headline, 1)
    //      localStorage.setItem(`${headline}_price`, price)
    //  }
    //
    // useEffect(()=>{
    //
    //     setNewPrices(itemInnerPrices.map(item => item.headline))
    //     setPricesSumArray(itemInnerPrices.map(item => item.price))
    //
    // },[itemInnerPrices])
    //
    //
    // useEffect(()=>{
    //
    //    let newItems = items.filter(item => {
    //         if (!newPrices.includes(item.headline)) {
    //             return  item
    //         }
    //    })
    //
    //     setItemInnerPrices([...itemInnerPrices, ...newItems])
    //
    // },[items.length])
    //
    // useEffect(() => {
    //
    //     if (JSON.parse(localStorage.getItem("itemInnerPrices")) !== null){
    //         setItemInnerPrices(JSON.parse(localStorage.getItem("itemInnerPrices")))
    //     }
    // }, [])
    //
    // useEffect(() => {
    //
    //     setItems(JSON.parse(localStorage.getItem("shoppingCart")))
    //
    // }, [localStorage.getItem("shoppingCart")])

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
                            {shopItems.map(item => (
                                <div className="itemsInCart">
                                    <img src={item.img[0]}/>
                                    <span>{item.headline}</span>
                                    <FontAwesomeIcon
                                        icon={faMinus}
                                        className="minusButton"
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
                                        className="plusButton"
                                        onClick={increaseItemQuantity(item)}
                                    />
                                    <div
                                        id={item.headline}
                                        key={`${item.headline}_price`}
                                    >
                                        {localStorage.getItem(`${item.headline}_price`) !== null ? localStorage.getItem(`${item.headline}_price`) : item.price}₴
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        className="closeItemCross"
                                        onClick={removeItemFromCart(item)}
                                    />
                                </div>
                            ))}
                            {!!shopItems.length ?
                                (<div className="totalCont">
                                    <div className="totalPrice">
                                        {/*{pricesSumArray.reduce((elem, acc) => elem + acc, 0)}₴*/}
                                    </div>
                                    <div className="acceptButton">
                                        Оформити замовлення
                                    </div>
                                </div>) : (
                                    <span className="emptyCart">Кошик порожній...</span>
                                )
                            }
                        </div>
                    </div>
                </>
            }
        </>
   )
}

export {ShoppingCart}
