import "./Header.scss"
import Logo from "../Images/logo.jpg"
import {Link} from 'react-router-dom'
import {faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const Header = () =>{

    return (
        <div className="headerCont">
            <img src={Logo} className="logo" alt=""/>
            <div className="contextMenu">
                <Link to="/" className='links'>Головна</Link>
                <Link to="/services" className='links'>Послуги</Link>
                <Link to="/works" className='links'>Наші роботи</Link>
                <Link to="/contacts" className='links'>Контакти</Link>
                <Link to="/about-us" className='links'>Про нас</Link>
                <FontAwesomeIcon icon={faInstagram} className="themeIcon"/>
                <FontAwesomeIcon icon={faFacebook} className="themeIcon"/>
                <FontAwesomeIcon icon={faMoon} className="themeIcon"/>
            </div>
        </div>

    )

}

export {Header}