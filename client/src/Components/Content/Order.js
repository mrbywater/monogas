import "./Order.scss"
import Logo from "../Images/logo.jpg";
import React, {useContext, useEffect, useState} from "react";
import {ShoppingCartContext} from "../Context/ShoppingCartContext";
import {ShoppingCart} from "./ShoppingCart";
import {urlCreation} from "./OurProjects"
import {shopItems} from "./InfoList";
import PhoneInput from 'react-phone-input-2'
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {operators} from "./InfoList";
import axios from "axios";

const Order = () => {

    const {
        shopCart,
        totalPrice,
        setShopCart
    } = useContext(ShoppingCartContext)

    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailInput, setEmailInput] = useState("")
    const [tagInputFN, setTagInputFN] = useState("");
    const [tagInputSN, setTagInputSN] = useState("");
    const [accepted, setAccepted] = useState(false)
    const [incorrectValues, setIncorrectValues] = useState(false)

    useEffect(()=>{
        if (shopCart.length === 0){
            window.location.href = '/shop'
        }
    }, [shopCart])
    const acceptOrder = () => {
        if ((operators.some(code => code === phoneNumber.slice(3, 5)) && phoneNumber.length === 12) && emailInput.length !== 0 && tagInputFN !== 0 && tagInputSN !== 0) {

            setAccepted(true)
            setIncorrectValues(false)

            axios.post('http://localhost:5050/send-email', {
                phoneNumber,
                emailInput,
                tagInputFN,
                tagInputSN,
                totalPrice,
                shopCart
                // Добавьте остальные поля input и их значения
            })
                .then((response) => {
                    console.log(response.data);
                    alert('Значения успешно отправлены на почту.');
                })
                .catch((error) => {
                    console.error(error);
                    alert('Произошла ошибка при отправке значений на почту.');
                });
        } else {
            setIncorrectValues(true)
            window.scroll(0, 80)
        }
    }

    const closeButton = () => {
       setShopCart([])
    }

    return (
        <div className="homeCont">
            {accepted && (
                <>
                    <div className="overlay" onClick={closeButton}/>
                    <div className="cartDiv" id="acceptButton">
                        <FontAwesomeIcon icon={faXmark} onClick={closeButton} className="closeButton"/>
                        <span>Ваше замовлення прийнято для подальшої обробки</span>
                        <span>Оператор зв'яжеться з вами протягом 10-15 хвилин</span>
                        <span>Слава Україні!</span>
                    </div>
                </>
            )}
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
                            {incorrectValues && (
                                <span id="incorrectValues">Перевірте ваші данні*</span>
                            )}
                        </div>
                        <div className="infoContactsCont">
                            <div id="inputStyles">
                                <span>Прізвище*</span>
                                <input
                                    placeholder="Каплан"
                                    maxLength={20}
                                    value={tagInputSN}
                                    onChange={(e) => {
                                        setTagInputSN(e.target.value.replace(/[^A-Za-zА-Яа-яЁёіІїЇєЄҐґ]/, ''))
                                    }}
                                />
                            </div>
                            <div id="inputStyles">
                                <span>Ім'я*</span>
                                <input
                                    placeholder="Юрій"
                                    maxLength={20}
                                    value={tagInputFN}
                                    onChange={(e) => {
                                        setTagInputFN(e.target.value.replace(/[^A-Za-zА-Яа-яЁёіІїЇєЄҐґ]/, ''))
                                    }}
                                />
                            </div>
                            <div id="inputStyles">
                                <span>Мобільний телефон*</span>
                                <PhoneInput
                                    country={"ua"}
                                    countryCodeEditable={false}
                                    maxLength={16}
                                    value={phoneNumber}
                                    onChange={setPhoneNumber}
                                    specialLabel={""}
                                    disableDropdown={true}
                                    disableSearchIcon={true}
                                />
                            </div>
                            <div id="inputStyles">
                                <span>Електронна пошта*</span>
                                <input
                                    placeholder="example@xxx.xxx"
                                    type="email"
                                    id="email"
                                    value={emailInput}
                                    onChange={(e) => {
                                        setEmailInput(e.target.value)
                                    }}
                                />
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
                                        {shopItems.map(sub => {
                                            if (sub.headline === item.headline) {
                                                return <img src={sub.img[0]}/>
                                            }
                                        })}
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
                            <span>{totalPrice}₴</span>
                        </div>
                        <div onClick={acceptOrder}>Замовлення підтверджую</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Order}