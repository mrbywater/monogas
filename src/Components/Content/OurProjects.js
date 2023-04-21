import "./Content.scss"
import "./OurProjects.scss"
import {BelowHeaderImage} from "./BelowHeaderImage";
import {useEffect, useState} from "react";
import {works} from "./SelectedProject.js";
import {Link} from 'react-router-dom'

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

const OurProjects = () =>{

    const [filter, setFilter] = useState(works)
    const [checker, setChecker] = useState(false)
    const [style, setStyle] = useState("")
    const [prevSelector, setPrevSelector] = useState(0)
    const [active, setActive] = useState(0);

    const categorieSwitcher = (elm, i) => () => {

        setStyle("")
        setActive(i)
        const result = works.filter(word => word.selector === elm.selector);
        
        if (elm.selector !== prevSelector) {
            setChecker(true)
                if (elm.selector === 0){    
                    setFilter(works)
                } else {
                    setFilter(result)
                }
            }else{
                setChecker(false)
            }
        
        setPrevSelector(elm.selector)
    }

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
                        <Link className="linkBlocks" to={"/works/" + elm.url}>
                            <div className={`blocksSize ${style}`} id={elm.selector}>
                                <span className="blockText">{elm.title}</span>
                                <img className="innerImg" src={elm.img}></img>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )

}

export {OurProjects}