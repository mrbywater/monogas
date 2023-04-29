import "./Content.scss"
import "./SelectedProject.scss"
import {useParams} from "react-router";
import {NotFoundPage} from "./NotFoundPage"
import {BelowHeaderImage} from "./BelowHeaderImage"
import {works} from "./InfoList"
import {ImageSlider} from "./ImageSlider";
import {urlCreation} from "./OurProjects.js"

const SelectedProject = () => {

    const params = useParams()
    const url = params.url
    
 	const include = works.filter(item => urlCreation(item.model) === url)

 	if (include.length) {
 		return (
			works.map(item => {
	    		if (url === urlCreation(item.model)) {
	    			return(
	    				<div className="homeCont">
							<BelowHeaderImage
                				headline = {`${item.type} ${item.model}`}
            				/>
							<ImageSlider slides={item.subImage} />
							<div className="separator"/>
							<div className="avtoInfoCont">
								<h2>Дані по автомобілю:</h2>
								<span><b>Марка:</b> {item.avtoInfo[0]}</span>
								<span><b>Модель:</b> {item.avtoInfo[1]}</span>
								<span><b>Рік випуску:</b> {item.avtoInfo[2]}</span>
								<span><b>Двигун:</b> {item.avtoInfo[3]}</span>
								<span><b>Коробка:</b> {item.avtoInfo[4]}</span>
								<span><b>Пробіг:</b> {item.avtoInfo[5]}</span>
								<span><b>Привід:</b> {item.avtoInfo[6]}</span>
							</div>
							<div className="separator"/>
							<div className="infoCont">
								{item.text.map(elm => (
									<span>{elm}</span>
								))}
								<span><b>Вартість роботи над {item.model}: {item.cost}</b></span>
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

export {SelectedProject}