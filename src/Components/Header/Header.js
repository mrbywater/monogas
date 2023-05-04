import "./Header.scss"
import Logo from "../Images/logo.jpg"
import {Link} from 'react-router-dom'
import {faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useEffect, useState} from "react"
import { slide as Menu } from 'react-burger-menu'
import {ShoppingCart} from "../Content/ShoppingCart";

const Header = () =>{

    let darkMode = localStorage.getItem('darkMode');

    const [changeTheme, setChangeTheme] = useState(faMoon)
    const [menuOpen,setMenuOpen] = useState(false)

    const  handleStateChange = (state) => {
        setMenuOpen(state.isOpen)
    }

    const closeMenu = () =>{
        setMenuOpen(false)
    }


    const changePageTheme = () => {

        darkMode = localStorage.getItem('darkMode');

        if (darkMode !== 'enabled') {
            enableDarkMode();
            setChangeTheme(faSun)
        } else {
            disableDarkMode();
            setChangeTheme(faMoon)
        }
    }

    const enableDarkMode = () => {
        document.body.classList.add('darkmode');
        localStorage.setItem('darkMode', 'enabled');
    }

    const disableDarkMode = () => {

        document.body.classList.remove('darkmode');
        localStorage.setItem('darkMode', null);
    }

    useEffect(()=>{
        if (darkMode === 'enabled') {
            enableDarkMode();
            setChangeTheme(faSun)
        }
    })

    return (
        <div className="headerCont">
            <Menu
                isOpen = {menuOpen}
                onStateChange ={(state) => handleStateChange(state)}
            >
                <div className="sideBarHeader">
                    <a href="https://forms.gle/YQdJPVQ7meeYaxRC6" className="requestButtonInHeader">Заявка</a>
                    <a href="https://www.instagram.com/monogasauto/">
                        <FontAwesomeIcon icon={faInstagram} className="themeIcon"/>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100069663001399&is_tour_dismissed=true">
                        <FontAwesomeIcon icon={faFacebook} className="themeIcon"/>
                    </a>
                </div>
                <Link to="/" className='links' onClick={() => closeMenu()}>Головна</Link>
                <Link to="/services" className='links' onClick={() => closeMenu()}>Послуги</Link>
                <Link to="/works" className='links' onClick={() => closeMenu()}>Наші роботи</Link>
                <Link to="/shop" className='links' onClick={() => closeMenu()}>Магазин</Link>
                <Link to="/about-us" className='links' onClick={() => closeMenu()}>Про нас</Link>
                <a href="#contacts" className='links' onClick={() => closeMenu()}>Контакти</a>
            </Menu>
            <div className="logoCont">
                <Link to="/">
                    <img src={Logo} className="logo" alt=""/>
                </Link>
            </div>
            <div className="contextMenu">
                <Link to="/" className='links'>Головна</Link>
                <Link to="/services" className='links'>Послуги</Link>
                <Link to="/works" className='links'>Наші роботи</Link>
                <Link to="/shop" className='links'>Магазин</Link>
                <Link to="/about-us" className='links'>Про нас</Link>
                <a href="#contacts" className='links'>Контакти</a>
                <a href="https://forms.gle/YQdJPVQ7meeYaxRC6" className="requestButtonInHeader">Заявка</a>
            </div>
            <ShoppingCart />
            <div id="dark-mode-toggle" className="themeToggle">
                <FontAwesomeIcon icon={changeTheme} className="themeIcon" onClick={changePageTheme}/>
            </div>
        </div>
    )
}

export {Header}