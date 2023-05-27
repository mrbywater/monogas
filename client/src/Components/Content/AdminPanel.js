import "./Content.scss"
import "./AdminPanel.scss"
import React, {useContext, useEffect, useState} from "react";
import {faAngleDown, faAngleUp, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {ShoppingCartContext} from "../Context/ShoppingCartContext";

const AdminPanel = () => {

    const {
        dataBase,
        isLoading
    } = useContext(ShoppingCartContext)

    const login = 'monogas'
    const password = 'admin'

    const [switchAuth, setSwitchAuth] = useState(false)
    const [inputLogin, setInputLogin] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [incorrect, setIncorrect] = useState(false)
    const [addIsOpen, setAddIsOpen] = useState(false)
    const [changeIsOpen, setChangeIsOpen] = useState(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [cost, setCost] = useState('')
    const [brand, setBrand] = useState('')
    const [status, setStatus] = useState('Новий')
    const [amount, setAmount] = useState('')
    const [img, setImg] = useState('')
    const [description, setDescription] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)
    const [db, setDb] = useState([])
    const [arrowDirection, setArrowDirection] = useState(false)
    const [itemSearch, setItemSearch] = useState('')
    const [headline, setHeadline] = useState('Оберіть товар')
    const [dbHeadline, setDbHeadline] = useState([])

    useEffect(()=> {
        if (!isLoading) {
            setDb(dataBase[0].shopItems)
        }
    }, [dataBase])

    useEffect(()=>{
        if (db.length !== 0) {
            setDbHeadline(db.map(item => item.headline))
        }
    }, [db])

    useEffect(()=>{
        if (headline !== 'Оберіть товар'){
            db.map(item => {
                if (item.headline === headline) {
                    setName(item.headline)
                    setBrand(item.brand)
                    setAmount(item.amount)
                    setStatus(item.condition)
                    setCost(item.price)
                    setImg(item.img.map(item => item + '\n\n').join(''))
                    setDescription(item.description.map(item => item + '\n\n').join(''))
                }
            })
        }
    }, [headline])

    const authorization = () =>  {
        if (inputLogin === login && inputPassword === password) {
            setSwitchAuth(true)
        } else {
            setIncorrect(true)
        }
    }

    const handlerKeyDownDescription = (e) => {
        if (e.key === 'Enter') {
            setDescription(description + '\n')
        }
    }

    const handlerKeyDownImg = (e) => {
        if (e.key === 'Enter') {
            setImg(img + '\n')
        }
    }

    const addItemToDB = () => {

        if (name.length !== 0 &&
            cost.length !== 0 &&
            brand.length !== 0 &&
            status.length !== 0 &&
            amount.length !== 0 &&
            img.length !== 0 &&
            description.length !== 0) {

                axios.post('http://localhost:5050/new-item', {
                    name,
                    cost,
                    brand,
                    status,
                    amount,
                    img,
                    description
                })
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                setDescription('')
                setImg('')
                setAddIsOpen(false)
                setIsEmpty(false)
                setAmount('')
                setCost('')
                setName('')
                setBrand('')
        } else {
            setIsEmpty(true)
        }

    }

    const close = () => {
        setDescription('')
        setImg('')
        setAddIsOpen(false)
        setChangeIsOpen(false)
        setIsEmpty(false)
        setAmount('')
        setCost('')
        setName('')
        setBrand('')
        setHeadline('Оберіть товар')
        setArrowDirection(false)
        setDeleteIsOpen(false)
    }

    const selectItem = (headline) => {
        setHeadline(headline)
        setArrowDirection(false)
    }

    const itemsFilter = (arr) => {
        return arr.filter(item => item.toLowerCase().includes(itemSearch.toLowerCase()))
    }

    const changeItemInDB = () => {

        if (name.length !== 0 &&
            cost.length !== 0 &&
            brand.length !== 0 &&
            status.length !== 0 &&
            amount >= 0 &&
            img.length !== 0 &&
            description.length !== 0) {

            axios.post('http://localhost:5050/change-item', {
                headline,
                name,
                cost,
                brand,
                status,
                amount,
                img,
                description
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });

            setDescription('')
            setImg('')
            setChangeIsOpen(false)
            setIsEmpty(false)
            setAmount('')
            setCost('')
            setName('')
            setBrand('')
            setHeadline('Оберіть товар')
        } else {
            setIsEmpty(true)
        }

    }

    const deleteItemInDB = () => {

        if (headline !== 'Оберіть товар') {

            axios.post('http://localhost:5050/delete-item', {
                headline,
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
            setDeleteIsOpen(false)
            setHeadline('Оберіть товар')
        }

    }

    return (
        <div className="centerAuth">
            <div className={switchAuth ? 'notActive' : 'authorizationCont'}>
                {incorrect && (
                    <div id="incorrect">Непрвильний логін або пароль*</div>
                )}
                <div className="authInputCont">
                    <span>Логін</span>
                    <input
                        value={inputLogin}
                        onChange={(e)=> setInputLogin(e.target.value)}
                    />
                </div>
                <div className="authInputCont">
                    <span>Пароль</span>
                    <input
                        type='password'
                        value={inputPassword}
                        onChange={(e)=> setInputPassword(e.target.value)}
                    />
                </div>
                <div onClick={()=>authorization()} className="authButton">Авторизуватись</div>
            </div>
            {switchAuth && (
                <div className='adminButtonCont'>
                    <div onClick={()=> setAddIsOpen(true)} className="shopItemChangeButton">Додати</div>
                    <div onClick={()=> setChangeIsOpen(true)} className="shopItemChangeButton">Редагувати</div>
                    <div onClick={()=> setDeleteIsOpen(true)} className="shopItemChangeButton">Видалити</div>
                </div>
            )}
            {addIsOpen && (
                <>
                    <div onClick={close} className="overlay"/>
                    <div className='shopItemAdd'>
                        <FontAwesomeIcon icon={faXmark} onClick={close} className="closeButton"/>
                        {isEmpty && (
                            <div className="isEmpty">Заповніть усі поля*</div>
                        )}
                        <div>
                            <span>Назва*</span>
                            <input
                                value={name}
                                placeholder={'Редуктор'}
                                onChange={(e)=> setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Ціна*</span>
                            <input
                                placeholder={445}
                                value={cost}
                                onChange={(e)=> setCost(+(e.target.value.replace(/[^0-9]/, '')))}
                            />
                        </div>
                        <div>
                            <span>Бренд*</span>
                            <input
                                value={brand}
                                placeholder={'Stag'}
                                onChange={(e)=> setBrand(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Статус товару*</span>
                            <select onChange={(e)=> setStatus(e.target.value)}>
                                <option value="Новий">Новий</option>
                                <option value="Б/в">Б/в</option>
                            </select>
                        </div>
                        <div>
                            <span>Кількість*</span>
                            <input
                                placeholder={5}
                                value={amount}
                                onChange={(e)=> setAmount(+(e.target.value.replace(/[^0-9]/, '')))}
                            />
                        </div>
                        <div>
                            <span>Зображення*(силка на картинку)</span>
                            <textarea
                                placeholder={'Перше зображення\n\nДруге зображення\n\nТощо...'}
                                value={img}
                                onKeyDown={(e)=> handlerKeyDownImg(e)}
                                rows={6}
                                onChange={(e)=> setImg(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Опис*</span>
                            <textarea
                                placeholder={'Перший абзац\n\nДругий абзац\n\nТощо...'}
                                value={description}
                                onKeyDown={(e)=> handlerKeyDownDescription(e)}
                                rows={6}
                                onChange={(e)=> setDescription(e.target.value)}
                            />
                        </div>
                        <button onClick={addItemToDB}>Додати</button>
                    </div>
                </>
            )}
            {changeIsOpen && (
                <>
                    <div onClick={close} className="overlay"/>
                    <div className='shopItemAdd'>
                        <FontAwesomeIcon icon={faXmark} onClick={close} className="closeButton"/>
                        {isEmpty && (
                            <div className="isEmpty">Заповніть усі поля*</div>
                        )}
                        <div>
                            <div>
                                <button className="dropButtonItem" onClick={()=> setArrowDirection(!arrowDirection)}>
                                    {headline}
                                    <FontAwesomeIcon icon={arrowDirection ? faAngleUp : faAngleDown}/>
                                </button>
                                <div className={arrowDirection ? 'deliveryLocationItem deliveryInfoShow' : 'deliveryLocationItem'}>
                                    <input
                                        placeholder ="Пошук..." className="deliveryLocationSearch"
                                        value={itemSearch}
                                        onChange={(event) => {
                                            setItemSearch(event.target.value)
                                        }}
                                    />
                                    <div className='allAddresses'>
                                        {itemsFilter(dbHeadline).map(item => (
                                            <div
                                                onClick={()=>selectItem(item)}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span>Назва*</span>
                            <input
                                value={name}
                                placeholder={'Редуктор'}
                                onChange={(e)=> setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Ціна*</span>
                            <input
                                placeholder={445}
                                value={cost}
                                onChange={(e)=> setCost(+(e.target.value.replace(/[^0-9]/, '')))}
                            />
                        </div>
                        <div>
                            <span>Бренд*</span>
                            <input
                                value={brand}
                                placeholder={'Stag'}
                                onChange={(e)=> setBrand(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Статус товару*</span>
                            <select value={status} onChange={(e)=> setStatus(e.target.value)}>
                                <option value="Новий">Новий</option>
                                <option value="Б/в">Б/в</option>
                            </select>
                        </div>
                        <div>
                            <span>Кількість*</span>
                            <input
                                placeholder={5}
                                value={amount}
                                onChange={(e)=> setAmount(+(e.target.value.replace(/[^0-9]/, '')))}
                            />
                        </div>
                        <div>
                            <span>Зображення*(силка на картинку)</span>
                            <textarea
                                placeholder={'Перше зображення\n\nДруге зображення\n\nТощо...'}
                                value={img}
                                onKeyDown={(e)=> handlerKeyDownImg(e)}
                                rows={6}
                                onChange={(e)=> setImg(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Опис*</span>
                            <textarea
                                placeholder={'Перший абзац\n\nДругий абзац\n\nТощо...'}
                                value={description}
                                onKeyDown={(e)=> handlerKeyDownDescription(e)}
                                rows={6}
                                onChange={(e)=> setDescription(e.target.value)}
                            />
                        </div>
                        <button onClick={changeItemInDB}>Редагувати</button>
                    </div>
                </>
            )}
            {deleteIsOpen && (
                <>
                    <div onClick={close} className="overlay"/>
                    <div className='shopItemAdd' id="deleteShopItemCont">
                        <FontAwesomeIcon icon={faXmark} onClick={close} className="closeButton"/>
                        <div className="deleteCentered">
                            <div>
                                <button className="dropButtonItem" onClick={()=> setArrowDirection(!arrowDirection)}>
                                    {headline}
                                    <FontAwesomeIcon icon={arrowDirection ? faAngleUp : faAngleDown}/>
                                </button>
                                <div id='deliveryLocationItemDelete' className={arrowDirection ? 'deliveryLocationItem deliveryInfoShow' : 'deliveryLocationItem'}>
                                    <input
                                        placeholder ="Пошук..." className="deliveryLocationSearch"
                                        value={itemSearch}
                                        onChange={(event) => {
                                            setItemSearch(event.target.value)
                                        }}
                                    />
                                    <div className='allAddresses'>
                                        {itemsFilter(dbHeadline).map(item => (
                                            <div
                                                onClick={()=>selectItem(item)}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button id="deleteShopItemButton" onClick={deleteItemInDB}>Видалити</button>
                    </div>
                </>
            )}
        </div>
    )
}

export {AdminPanel}