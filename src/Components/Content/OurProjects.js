import "./Content.scss"
import "./OurProjects.scss"
import {BelowHeaderImage} from "./BelowHeaderImage";
import {useState} from "react";

const OurProjects = () =>{

    const headlines = [
        {
            headline : "Всі роботи",
            selector : 0,
        },
        {
            headline : "Монтаж",
            selector : 1,
        },
        {
            headline : "Сервіс",
            selector : 2,
        }
    ]


    const subCategories = [
        {
            title : "Монтаж 1",
            img : "",
            url : "",
            selector : 1
        },
        {
            title : "Сервіс 1",
            img : "",
            url : "",
            selector : 2
        },
        {
            title : "Сервіс 2",
            img : "",
            url : "",
            selector : 2
        }
    ]



    const categorieSwitcher = () => {

    }

    return (
        <div className="homeCont">
            <BelowHeaderImage
                headline = "Наші роботи"
            />
            <div className="flexCenteredBlock headlineCont">
                {headlines.map(elm => (
                    <div className="categories" id={elm.selector}>
                        {elm.headline}
                    </div>
                ))}
            </div>
            <div className="flexCenteredBlock headlineCont">
                {subCategories.map(elm => (
                    <div className="categories" id={elm.selector}>
                        {elm.title}
                    </div>
                ))}
            </div>
        </div>
    )

}

export {OurProjects}