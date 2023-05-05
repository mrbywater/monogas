import "./Content.scss"
import {faCartShopping, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./ShoppingCart.scss"
import {useEffect, useState} from "react";

const ShoppingCart = () => {

    const items = JSON.parse(localStorage.getItem("shoppingCart"))

    const [itemInnerPrices, setItemInnerPrices] =useState(items)

    const [isOpen, setIsOpen] = useState(false)
    // const [endArray, setEndArray] = useState(itemInnerPrices)
    // const [totalPrice, setTotalPrice] = useState(items.map(item => +item.price))



    const close = () => {
        setIsOpen(false)
    }

    const saveValue = (id, price) => (e) => {
        setItemInnerPrices(items.map(item => {
            if (id === item.headline) {
                return {
                    headline: item.headline,
                    price:e.target.value * price
                }
            } else {
               return {
                   headline: item.headline,
                   price:+item.price
               }
            }
        }))

        localStorage.setItem(id, e.target.value)
        localStorage.setItem(`${id}_price`, e.target.value * price)

        document.getElementById(id).innerHTML=`${e.target.value * price}₴`

        // setItemInnerPrices(items.map(item => (
        //     {
        //         headline: item.headline,
        //         price:+item.price
        //     }
        // )))
    }

     const handleKeyPress=(amount) => (e) =>{
         if (e.target.value >= amount) {
             e.preventDefault();
         }
     }

    // useEffect(()=>{
    //     setTotalPrice(endArray.map(item => +item.price))
    // },[endArray])
    //
    useEffect(()=>{
        // if (itemInnerPrices.length !== 0) {
        //     setTotalPrice(endArray.map(item => +item.price))
        // }
        // setItemInnerPrices(items.map(item => {
        //     if (itemInnerPrices.every(elem => elem.headline.include(item.headline))) {
        //         return {
        //             headline: item.headline,
        //             price: +item.price
        //         }
        //     }
        // }))
        setItemInnerPrices(items)

       items.map(item=> {{
           if (!itemInnerPrices.includes(item)) {
               itemInnerPrices.push(item)
           }
           }}
       )

        // console.log("TotalPrice",totalPrice,"endArray",endArray,"itemInnerPrices",itemInnerPrices)
    },[items.length])

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
                                        onKeyDown={handleKeyPress(item.amount)}
                                    />
                                    <div id={item.headline}>{localStorage.getItem(`${item.headline}_price`) !== null ? localStorage.getItem(`${item.headline}_price`) : item.price}₴</div>
                                    <FontAwesomeIcon icon={faXmark} className="closeItemCross"/>
                                </div>
                            ))}
                            <div className="totalCont">
                                <div className="totalPrice">
                                    {/*{(totalPrice.reduce((elm,acc)=> elm + acc, 0) === 0 ) ? `${items.map(item => +item.price).reduce((elm,acc)=> elm + acc, 0)}₴` : `${totalPrice.reduce((elm,acc)=> elm + acc, 0)}₴`}*/}
                                </div>
                                <div className="acceptButton" onClick={()=>{console.log(itemInnerPrices)}}>Оформити замовлення</div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
)
}

export {ShoppingCart}
