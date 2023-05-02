import "./ShopItem.scss"
import {useParams} from "react-router";
import {shopItems} from "./InfoList";
import {urlCreation} from "./OurProjects";
import {NotFoundPage} from "./NotFoundPage";
import {BelowHeaderImage} from "./BelowHeaderImage";
import {ImageSlider} from "./ImageSlider";
const ShopItem = () => {

    const params = useParams()
    const item = params.item

    const include = shopItems.filter(elem =>  urlCreation(elem.headline) === item)

    if (include.length) {
        return (
            shopItems.map(elem => {
                if (item === urlCreation(elem.headline)) {
                    return (
                        <div className="homeCont">
                            <BelowHeaderImage/>
                            <div className="itemCont">
                                <div className="itemNameCont">
                                    <span>
                                        {elem.headline}
                                    </span>
                                </div>
                                <div className="itemDescription">
                                    <div className="sliderCont">
                                        <ImageSlider slides={elem.img}/>
                                    </div>
                                    <div className="descriptionCont">
                                        fefe
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })
        )
    } else {
        return (
            <NotFoundPage/>
        )
    }
}

export {ShopItem}