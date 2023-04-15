import "./Content.scss"
import "./OurProjects.scss"
import {BelowHeaderImage} from "./BelowHeaderImage";
import {useEffect, useState} from "react";
import pepe from "../Images/PepeLaugh.jpg"
import car from "../Images/car.jpg"
import {motion,AnimatePresence} from "framer-motion"

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
            img : car,
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
            title : "Монтаж 2",
            img : "",
            url : "",
            selector : 1
        },
        {
            title : "Сервіс 2",
            img : pepe,
            url : "",
            selector : 2
        }
    ]

    const [filter, setFilter] = useState(subCategories)
    const [style, setStyle] = useState("")

    const categorieSwitcher = (elm) => () => {
        setStyle("")
        const result = subCategories.filter(word => word.selector === elm.selector);
        if (elm.selector === 0){
            setFilter(subCategories)
        } else {
            setFilter(result)
        }
    }

    useEffect(() => {
        setStyle("animation")
    },[style]);

    return (
        <div className="homeCont">
            <BelowHeaderImage
                headline = "Наші роботи"
            />
            <div className="flexCenteredBlock headlineCont">
                {headlines.map(elm => (
                    <div className="categories" id={elm.selector} onClick={categorieSwitcher(elm)}>
                        <span className="textHoverAnimation">{elm.headline}</span>
                    </div>
                ))}
            </div>
            <div className="placementOfBlockCentered">
                <div className="placementOfBlock">
                    {filter.map(elm => (
                        <a className="linkBlocks" href={elm.url}>
                            <div className={`blocksSize ${style}`} id={elm.selector}>
                                <span className="blockText">{elm.title}</span>
                                <img className="innerImg" src={elm.img}></img>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )

}

export {OurProjects}