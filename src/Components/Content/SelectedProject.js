import "./Content.scss"
import {useParams} from "react-router";
import {NotFoundPage} from "./NotFoundPage"
import {BelowHeaderImage} from "./BelowHeaderImage"
import {works} from "./InfoList"

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