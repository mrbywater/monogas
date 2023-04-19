import "./Content.scss"
import "./OurProjects.scss"
import {BelowHeaderImage} from "./BelowHeaderImage";
import {useEffect, useState} from "react";

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
        img : require("../Images/car.jpg"),
        url : "",
        selector : 1
    },
    {
        title : "Сервіс 1",
        img : require("../Images/car.jpg"),
        url : "",
        selector : 2
    },
    {
        title : "Монтаж 2",
        img : require("../Images/car.jpg"),
        url : "",
        selector : 1
    },
    {
        title : "Сервіс 2",
        img : require("../Images/car.jpg"),
        url : "",
        selector : 2
    }
]

const OurProjects = () =>{

    const [filter, setFilter] = useState(subCategories)
    const [checker, setChecker] = useState(false)
    const [style, setStyle] = useState("")
    const [prevSelector, setPrevSelector] = useState(0)
    const [active, setActive] = useState(0);

    const categorieSwitcher = (elm, i) => () => {

        setStyle("")
        setActive(i)
        const result = subCategories.filter(word => word.selector === elm.selector);
        
        if (elm.selector !== prevSelector) {
            setChecker(true)
                if (elm.selector === 0){    
                    setFilter(subCategories)
                } else {
                    setFilter(result)
                }
            }else{
                setChecker(false)
            }
        
        setPrevSelector(elm.selector)
    }

    console.log(active)
    

    useEffect(() => {
        
        if (checker) {
            setStyle("animation")
        }

    },[prevSelector]);

    return (
        <div className="homeCont">
            <BelowHeaderImage
                headline = "Наші роботи"
            />
            <div className="flexCenteredBlock headlineCont">
                {headlines.map((elm, i )=> (
                    <div className={`categories `} id={elm.selector} onClick={categorieSwitcher(elm, i)}>
                        <span className={`textHoverAnimation ${i === active ? 'active' : ''}`}>{elm.headline}</span>
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