import "./Content.scss"
import {useParams} from "react-router";
import {NotFoundPage} from "./NotFoundPage"
import {BelowHeaderImage} from "./BelowHeaderImage"

export const works = [
    {
        title : "Монтаж 1",
        img : require("../Images/car.jpg"),
        url : "work_installation_1",
        selector : 1
    },
    {
        title : "Сервіс 1",
        img : require("../Images/car.jpg"),
        url : "work_service_1",
        selector : 2
    },
    {
        title : "Монтаж 2",
        img : require("../Images/car.jpg"),
        url : "work_installation_2",
        selector : 1
    },
    {
        title : "Сервіс 2",
        img : require("../Images/car.jpg"),
        url : "work_service_2",
        selector : 2
    }
]

const SelectedProject = () => {

	const params = useParams()
 	const url = params.url

 	const include = works.filter(item => item.url === url)

 	if (include.length) {
 		return (
			works.map(item => {
	    		if (url === item.url) {

	    			return(
	    				<div className="homeCont"> 
							<BelowHeaderImage
                				headline = {item.title}
            				/>
            				<div>
            					
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