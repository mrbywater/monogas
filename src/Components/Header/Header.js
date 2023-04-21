import "./Header.scss"
import Logo from "../Images/logo.jpg"
import {Link} from 'react-router-dom'
import {faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useEffect, useState} from "react"

const Header = () =>{

    let darkMode = localStorage.getItem('darkMode');

    const [changeTheme, setChangeTheme] = useState(faMoon)

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
            <Link to="/">
                <img src={Logo} className="logo" alt=""/>
            </Link>    
            <div className="contextMenu">
                <Link to="/" className='links'>Головна</Link>
                <Link to="/services" className='links'>Послуги</Link>
                <Link to="/works" className='links'>Наші роботи</Link>
                <Link to="/about-us" className='links'>Про нас</Link>
                <a href="#contacts" className='links'>Контакти</a>
                <a href="https://forms.gle/YQdJPVQ7meeYaxRC6" className="requestButtonInHeader">Заявка</a>
                <a href="https://www.instagram.com/monogasauto/">
                    <FontAwesomeIcon icon={faInstagram} className="themeIcon"/>
                </a>
                <a href="https://www.facebook.com/profile.php?id=100069663001399&is_tour_dismissed=true">
                    <FontAwesomeIcon icon={faFacebook} className="themeIcon"/>
                </a>
                <div id="dark-mode-toggle">
                  <FontAwesomeIcon icon={changeTheme} className="themeIcon" onClick={changePageTheme}/>
                </div>
            </div>
        </div>

    )

}

export {Header}