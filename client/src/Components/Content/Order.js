import "./Order.scss"
import Logo from "../Images/logo.jpg";
import React, {useContext, useEffect, useState} from "react";
import {ShoppingCartContext} from "../Context/ShoppingCartContext";
import {ShoppingCart} from "./ShoppingCart";
import {urlCreation} from "./OurProjects"
import PhoneInput from 'react-phone-input-2'
import {faAngleDown, faAngleUp, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {novaPoshtaAddresses, novaPoshtaBox, operators} from "./InfoList";
import axios from "axios";

const Order = () => {

    const {
        shopCart,
        totalPrice,
        setShopCart
    } = useContext(ShoppingCartContext)

    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailInput, setEmailInput] = useState("")
    const [tagInputFN, setTagInputFN] = useState("")
    const [tagInputSN, setTagInputSN] = useState("")
    const [accepted, setAccepted] = useState(false)
    const [pickup, setPickup] = useState(false)
    const [novaPoshta, setNovaPoshta] = useState(false)
    const [novaPoshtaDepartment, setNovaPoshtaDepartment] = useState(false)
    const [novaPoshtaPostBox, setNovaPoshtaPostBox] = useState(false)
    const [deliveryLocationSearch, setDeliveryLocationSearch] = useState('')
    const [arrowDirection, setArrowDirection] = useState(false)
    const [incorrectValues, setIncorrectValues] = useState(false)
    const [targetAddress, setTargetAddress] = useState('Оберіть необхідне відділення')
    const [incorrectAddress, setIncorrectAddress] = useState(false)

    useEffect(()=>{
        if (shopCart.length === 0){
            window.location.href = '/shop'
        }
    }, [shopCart])
    const acceptOrder = () => {

        if ((operators.some(code => code === phoneNumber.slice(3, 5)) && phoneNumber.length === 12) && emailInput.length !== 0 && tagInputFN.length !== 0 && tagInputSN.length !== 0) {
            setIncorrectValues(false)

                if (pickup || targetAddress !== 'Оберіть необхідне відділення'){
                    setIncorrectAddress(false)
                    setAccepted(true)
                    const address = pickup ? 'Самовивіз' : `Нова Пошта ${targetAddress}`

                        axios.post('http://localhost:5050/send-email', {
                            phoneNumber,
                            emailInput,
                            tagInputFN,
                            tagInputSN,
                            totalPrice,
                            shopCart,
                            address
                            // Добавьте остальные поля input и их значения
                        })
                            .then((response) => {
                                console.log(response.data);
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                } else {
                    setIncorrectAddress(true)
                    window.scrollTo({ left: 0, top: document.body.scrollHeight});
                }

        } else {
            setIncorrectValues(true)
            window.scroll(0, 80)
        }
    }

    const closeButton = () => {
       setShopCart([])
    }

    const selectAddress = (address) => {
        setTargetAddress(address)
        setArrowDirection(false)
    }

    const addressFilter = (arr) => {
        return arr.filter(item => item.toLowerCase().includes(deliveryLocationSearch.toLowerCase()))
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
                                        <div className="imgAndSpanCont">
                                            <img src={item.img[0]}/>
                                            <span>
                                                <a target="_blank" href={"/shop/"+urlCreation(item.headline)}>{item.headline}</a>
                                            </span>
                                        </div>
                                        <div className="itemInfoCont">
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
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="blockCont">
                        <div className="blockHeadline">
                            <div className="">3</div>
                            <span>Доставка</span>
                            {incorrectAddress && (
                                <span id="incorrectValues">Оберіть адресу*</span>
                            )}
                        </div>
                        <div className="inputRadioCont">
                            <div>
                                <label>
                                    <div>
                                        <input
                                            type="radio"
                                            name="delivery"
                                            onClick={()=> {
                                                setPickup(true)
                                                setNovaPoshta(false)
                                                setTargetAddress('Оберіть необхідне відділення')
                                            }}
                                            id='inputRadioSpan'
                                        />
                                        <span>Самовивіз</span>
                                    </div>
                                    <div>безкоштовно</div>
                                </label>
                                <div className={pickup ? 'deliverySubInfo deliveryInfoShow' : 'deliverySubInfo'}>
                                    <span>Товар можливо отримати за адрессою Миколаївська, 10 вл1 с. Крижанівка, Одеський район, Одеська область, 67562</span>
                                    <span>Додаткову інформацію уточнюйте у оператора*</span>
                                </div>
                            </div>
                            <div>
                                <label>
                                    <div>
                                        <input
                                            type="radio"
                                            name="delivery"
                                            id="NP"
                                            onClick={()=> {
                                                setPickup(false)
                                                setNovaPoshta(true)
                                            }}
                                            id='inputRadioSpan'
                                        />
                                        <span>Самовивіз Нова Пошта(Одеса)</span>
                                    </div>
                                    <div>за тарифами перевізника</div>
                                </label>
                                <div className={novaPoshta ? 'deliverySubInfo deliveryInfoShow' : 'deliverySubInfo'}>
                                   <div className="inputRadioContNP">
                                       <label
                                           onClick={()=> {
                                               setNovaPoshtaDepartment(true)
                                               setNovaPoshtaPostBox(false)
                                               setArrowDirection(false)
                                           }}
                                       >
                                           <input type="radio"  name="NP"/>
                                           <span>Відділення</span>
                                       </label>
                                       <label
                                           onClick={()=> {
                                               setNovaPoshtaDepartment(false)
                                               setNovaPoshtaPostBox(true)
                                               setArrowDirection(false)
                                           }}
                                       >
                                           <input type="radio"  name="NP"/>
                                           <span>Поштомат</span>
                                       </label>
                                   </div>
                                    <div className={novaPoshtaDepartment ? 'novaPoshtaDepartment deliveryInfoShow' : 'novaPoshtaDepartment'}>
                                        <div className="dropDownDelivery">
                                            <button className="dropButtonDelivery" onClick={()=> setArrowDirection(!arrowDirection)}>
                                                {targetAddress}
                                                <FontAwesomeIcon icon={arrowDirection ? faAngleUp : faAngleDown}/>
                                            </button>
                                            <div className={arrowDirection ? 'deliveryLocation deliveryInfoShow' : 'deliveryLocation'}>
                                                <input
                                                    placeholder ="Пошук..." className="deliveryLocationSearch"
                                                    value={deliveryLocationSearch}
                                                    onChange={(event) => {
                                                        setDeliveryLocationSearch(event.target.value)
                                                    }}
                                                />
                                                <div className='allAddresses'>
                                                    {addressFilter(novaPoshtaAddresses).map(address => (
                                                        <div
                                                            onClick={()=>selectAddress(address)}
                                                        >
                                                            {address}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={novaPoshtaPostBox ? 'novaPoshtaPostBox deliveryInfoShow' : 'novaPoshtaPostBox'}>
                                        <div className="dropDownDelivery">
                                            <button className="dropButtonDelivery" onClick={()=> setArrowDirection(!arrowDirection)}>
                                                {targetAddress}
                                                <FontAwesomeIcon icon={arrowDirection ? faAngleUp : faAngleDown}/>
                                            </button>
                                            <div className={arrowDirection ? 'deliveryLocation deliveryInfoShow' : 'deliveryLocation'}>
                                                <input
                                                    placeholder ="Пошук..." className="deliveryLocationSearch"
                                                    value={deliveryLocationSearch}
                                                    onChange={(event) => {
                                                        setDeliveryLocationSearch(event.target.value)
                                                    }}
                                                />
                                                <div className='allAddresses'>
                                                    {addressFilter(novaPoshtaBox).map(address => (
                                                        <div
                                                            onClick={()=>selectAddress(address)}
                                                        >
                                                            {address}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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