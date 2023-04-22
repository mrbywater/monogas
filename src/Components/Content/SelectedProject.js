import "./Content.scss"
import "./SelectedProject.scss"
import {useParams} from "react-router";
import {NotFoundPage} from "./NotFoundPage"
import {BelowHeaderImage} from "./BelowHeaderImage"
import {works} from "./InfoList"
import {ImageSlider} from "./ImageSlider";

const SelectedProject = () => {

	const params = useParams()
 	const url = params.url
	console.log(params,params.url,url)
 	const include = works.filter(item => item.url === url)

 	if (include.length) {
 		return (
			works.map(item => {
	    		if (url === item.url) {
	    			return(
	    				<div className="homeCont">
							<BelowHeaderImage
                				headline = {`${item.type} ${item.model}`}
            				/>
							<div className="containerStyles">
								<ImageSlider slides={item.subImage} />
							</div>
							<div className="separator"/>
							<div className="avtoInfoCont">
								<h1>Дані по автомобілю:</h1>
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
								<span><b>Вартість {item.model}: {item.cost}</b></span>
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