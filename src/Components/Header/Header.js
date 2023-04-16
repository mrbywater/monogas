import "./Header.scss"
import Logo from "../Images/logo.jpg"
import {Link} from 'react-router-dom'
import {faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useState, useEffect} from "react"

const color = "red"

const Header = () =>{

    const [changeTheme, setChangeTheme] = useState(true)

    const changePageTheme = () => {
        document.body.classList.toggle('darkMode')
        if (!!changeTheme){
            setChangeTheme(false)
        } else {
            setChangeTheme(true)
        }
    }

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
                <a href="https://www.instagram.com/monogasauto/">
                    <FontAwesomeIcon icon={faInstagram} className="themeIcon"/>
                </a>
                <a href="https://www.facebook.com/profile.php?id=100069663001399&is_tour_dismissed=true">
                    <FontAwesomeIcon icon={faFacebook} className="themeIcon"/>
                </a>
                <div >
                  <FontAwesomeIcon icon={changeTheme ? faMoon : faSun} onClick={changePageTheme} className="themeIcon"/>
                </div>  
            </div>
        </div>

    )

}

export {Header}