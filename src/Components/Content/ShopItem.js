import "./ShopItem.scss"
import "./Content.scss"
import {useParams} from "react-router";
import {shopItems} from "./InfoList";
import {urlCreation} from "./OurProjects";
import {NotFoundPage} from "./NotFoundPage";
import {BelowHeaderImage} from "./BelowHeaderImage";
import {ImageSlider} from "./ImageSlider";
import {
    faCartShopping,
    faTruck,
    faStore,
    faWallet,
    faShieldHeart,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {useEffect} from "react";

const ShopItem = () => {

    useEffect(()=> {
        localStorage.setItem('search', '')
    },[])

    const params = useParams()
    const item = params.item

    const include = shopItems.filter(elem =>  urlCreation(elem.headline) === item)

    const toMainSearch = () =>{
        window.location.href='/shop/#mainSearch'
    }

    const saveToLS = (e) => {
        localStorage.setItem('search', e.target.value);
    }

    const enterPress = (e) => {
        if (e.key === "Enter") {
            window.location.href='/shop/#mainSearch'
        }
    }

    if (include.length) {
        return (
            shopItems.map(elem => {
                if (item === urlCreation(elem.headline)) {
                    return (
                        <div className="homeCont">
                            <BelowHeaderImage/>
                            <div className="itemCont">
                                <div className="searchCont">
                                    <div className="inputCont">
                                        <input
                                            placeholder ="Пошук..."
                                            onChange={saveToLS}
                                            onKeyDown={enterPress}
                                        />
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" onClick={toMainSearch}/>
                                    </div>
                                </div>
                                <div className="itemNameCont">
                                    <span>
                                        {elem.headline}
                                    </span>
                                </div>
                                <div className="itemDescription">
                                    <div className="sliderCont">
                                        <ImageSlider slides={elem.img}/>
                                    </div>
                                    <div className="descriptionCont">
                                        <div className="firstDescription">
                                            <div className="priceCont">
                                                <span>{elem.price}₴</span>
                                                {!!elem.amount ?
                                                    <span style={{color: "green"}}>Є в наявності</span> :
                                                    <span style={{color: "red"}}>Нема в наявності</span>
                                                }
                                            </div>
                                            <div className="shoppingButtonCont">
                                                <FontAwesomeIcon icon={faCartShopping} style={{transition:"none"}}/>
                                                <span>Купити</span>
                                            </div>
                                        </div>
                                        <div className="deliveryCont">
                                            <div className="deliveryHeadline">Доставка:</div>
                                            <div className="deliveryPostCont">
                                                <div className="deliveryPostCont">
                                                    <FontAwesomeIcon icon={faTruck}/>
                                                    <span>Самовивіз з відділень поштових операторів</span>
                                                </div>
                                                <span id="right">За тарифами перевізника</span>
                                            </div>
                                            <div className="deliveryPostCont">
                                                <div className="deliveryPostCont">
                                                    <FontAwesomeIcon icon={faStore}/>
                                                    <span>Самовивіз з нашого магазину</span>
                                                </div>
                                                <span id="right">Безкоштово</span>
                                            </div>
                                        </div>
                                        <div className="payingCont">
                                            <div className="payingItemCont">
                                                <FontAwesomeIcon icon={faWallet}/>
                                                <span><b>Оплата.</b> Оплата під час отримання товару</span>
                                            </div>
                                            <div className="payingItemCont">
                                                <FontAwesomeIcon icon={faShieldHeart}/>
                                                <span><b>Гарантія. </b>Обмін/повернення товару впродовж 14 днів </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="separator"/>
                            <div className="itemCont">
                                <span className="descriptionHeadline">Опис</span>
                                {elem.description.map(text =>(
                                    <span className="descriptionText">{text}</span>
                                ))}
                            </div>
                        </div>
                    )
                }
            })
        )
    } else {
        return (
            <NotFoundPage/>
        )
    }
}

export {ShopItem}