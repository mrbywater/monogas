import "./Order.scss"
import Logo from "../Images/logo.jpg";
import React, {useContext, useEffect} from "react";
import {ShoppingCartContext} from "../Context/ShoppingCartContext";
import {ShoppingCart} from "./ShoppingCart";
import {urlCreation} from "./OurProjects"



const Order = () => {

    const { shopCart, priceArray } = useContext(ShoppingCartContext)

    // const apiKey = "db724e44715117789cd062d65b5a3de0";
    // const url = "https://api.novaposhta.ua/v2.0/json/";
    //
    // const test = (url) => {
    //     const headers = {
    //         // "apiKey": apiKey,
    //         // 'Accept': 'application/json',
    //         // 'Content-Type': 'application/json',
    //     }
    //
    //     return fetch(url, {
    //         type: 'POST',
    //         dataType: 'json',
    //         url: 'https://api.novaposhta.ua/v2.0/json/',
    //         data: JSON.stringify({
    //             modelName: 'Address',
    //             calledMethod: 'searchSettlements',
    //             apiKey: 'db724e44715117789cd062d65b5a3de0'
    //         }),
    //         headers : headers
    //     })
    // }
    //
    // test( url)
    //     .then(data => console.log(data))
    //     .catch(err =>  console.log(err))

    return (
        <div className="homeCont">
            <div className="orderCont">
                <div className="orderLogoCont">
                    <img src={Logo} className="orderLogo" alt=""/>
                </div>
                <span className="headerSpan">Оформлення замовлення</span>
                <div className="widthBlockCont">
                    <div className="blockCont">
                        <div className="blockHeadline">
                            <div className="">1</div>
                            <span>Ваші контактні дані</span>
                        </div>
                        <div className="infoContactsCont">
                            <div>
                                <span>Прізвище</span>
                                <input/>
                            </div>
                            <div>
                                <span>Ім'я</span>
                                <input/>
                            </div>
                            <div>
                                <span>Мобільний телефон</span>
                                <input/>
                            </div>
                            <div>
                                <span>Електронна пошта</span>
                                <input/>
                            </div>
                        </div>
                    </div>
                    <div className="blockCont">
                        <ShoppingCart/>
                        <div className="blockHeadline">
                            <div className="">2</div>
                            <span>Товари</span>
                        </div>
                        <div className="itemsCont">
                            {shopCart.map(item => {
                                return (
                                    <div className="orderItem">
                                        <img src={item.img[0]}/>
                                        <span>
                                            <a target="_blank" href={"/shop/"+urlCreation(item.headline)}>{item.headline}</a>
                                        </span>
                                        <div>
                                            <span>Ціна</span>
                                            <span>{item.price}₴</span>
                                        </div>
                                        <div>
                                            <span>Кількість</span>
                                            <span>{item.quantity}</span>
                                        </div>
                                        <div>
                                            <span>Сума</span>
                                            <span>{item.price * item.quantity}₴</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="blockCont">
                        <div className="blockHeadline">
                            <div className="">3</div>
                            <span>Доставка</span>
                        </div>
                    </div>
                    <div className="blockContAccept">
                        <div>
                            <span>Вартість доставки</span>
                            <span>за тарифами перевізника</span>
                        </div>
                        <div>
                            <span>До сплати</span>
                            <span>{priceArray.reduce((elem, acc) => elem + acc, 0)}₴</span>
                        </div>
                        <div>Замовлення підтверджую</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Order}