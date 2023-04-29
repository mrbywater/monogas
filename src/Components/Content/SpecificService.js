import "./Content.scss"
import "./SpecificService.scss"
import {useParams} from "react-router";
import {NotFoundPage} from "./NotFoundPage"
import {BelowHeaderImage} from "./BelowHeaderImage"
import {RequestButton} from "./RequestButton";
import {ArrowUp} from "./ArrowUp";
import {servicesName} from "./InfoList"

const SpecificService = () => {

	const params = useParams()
 	const path = params.path

 	const include = servicesName.filter(item => item.path === path)

 	if (include.length) {
 		return (
			servicesName.map(item => {
	    		if (path === item.path) {

	    			return(
	    				<div className="homeCont"> 
	    					<ArrowUp/>
							<BelowHeaderImage
                				headline = {item.title}
            				/>
            				<div className="flexCenteredBlock">
                				<h1 className="headerFontSize">Послуги для ГБО в єдиному автосервісі</h1>
                				<RequestButton/>
            				</div>
            				<div className="separator"></div>
            				<div className="flexCont">
	        					{item.subCategory.map(item => {
        							return(
        								<div className="flexElementCont">
	        								<span className="textHeadline">
	        									<b>{item.headline}</b>
	        								</span>
	        								<div className="containerText">
												{item.content.map(content => (
													<span className="textContent">
														{content}
													</span>
												))}
												{!!item.img &&
													(
														<div className="imgCont">
															<img src={item.img} className="image"/>
														</div>
													)
												}
											</div>		
										</div>	
        							)		
	        					})}
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
export {SpecificService}