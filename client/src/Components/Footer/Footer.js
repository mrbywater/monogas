import "./Footer.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";
import {useLocation} from "react-router-dom";
const Footer = () =>{

    const ref = useLocation()

    return (
        <div className={ref.pathname === "/order" || ref.pathname === "/admin-panel" ? "onOrderPage" : ""}>
            <div className="footerCont" id="contacts">
                <div className="info">
                    <h1>Адреса</h1>
                    <span>
                        Миколаївська, 10 вл1 <br/>
                        с. Крижанівка, <br/>
                        Одеський район,<br/>
                        Одеська область, 67562
                    </span>
                </div>
                <div className="info">
                    <h1>Час роботи</h1>
                    <span>
                        Пн-Пт : 09:00 - 18:00 <br/>
                        Сб &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 10:00 - 16:00 <br/>
                        Нд &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: вихідний
                    </span>
                </div>
                <div className="info">
                    <h1>Контакти</h1>
                    <span>
                        Юрий &nbsp;&nbsp;: +380000000 <br/>
                        Сергей : +380000000
                        <p>monogasauto@gmail.com</p>
                    </span>
                    <div className="socialCont">
                        <a href="https://www.instagram.com/monogasauto/">
                            <FontAwesomeIcon icon={faInstagram} className="socialIcon"/>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100069663001399&is_tour_dismissed=true">
                            <FontAwesomeIcon icon={faFacebook} className="socialIcon"/>
                        </a>
                    </div>
                </div>
                <div className="info">
                    <iframe
                        className="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2743.1588527094336!2d30.794423943749297!3d46.564323887505665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c63be097257bad%3A0xc825f8230c8c26c1!2z0KPRgdGC0LDQvdC-0LLQutCwINCT0JHQniB8INCg0LXQvNC-0L3RgiDQk9CR0J4gfCDQk9Cw0Lcg0L3QsCDQsNCy0YLQviB8IE1vbm9nYXM!5e0!3m2!1sru!2sua!4v1681230878064!5m2!1sru!2sua"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
            <div className="lowerCont">
                © 2023 ГБО Monogas
            </div>
        </div>
    )

}

export {Footer}