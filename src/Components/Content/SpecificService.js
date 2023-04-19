import "./Content.scss"
import {useParams} from "react-router";
import {NotFoundPage} from "./NotFoundPage"
import {BelowHeaderImage} from "./BelowHeaderImage"

export const buttonServices = [
    {
        title : "Установка ГБО 2-го покоління",
        path : "second_generation",
        img : require("../Images/man_working_under_the_hood_of_a_car.jpg")
    },
    {
        title : "Установка ГБО 4-го покоління",
        path : "fouth_generation",
        img : require("../Images/man_working_under_the_hood_of_a_car.jpg")
    },
    {
        title :  "Установка ГБО на FSI, TSI, GDI",
        path : "fsi_tsi_gdi",
        img : require("../Images/man_working_under_the_hood_of_a_car.jpg")
    },
    {
        title : "Установка ГБО на електромобілі",
        path : "electric_car",
        img : require("../Images/man_working_under_the_hood_of_a_car.jpg")
    },
    {
        title : "Установка ГБО на дизель",
        path : "diesel",
        img : require("../Images/man_working_under_the_hood_of_a_car.jpg")
    }    
]

const SpecificService = () => {

	const params = useParams()
 	const path = params.path

 	const include = buttonServices.filter(item => item.path === path)

 	if (include.length) {
 		return (
			buttonServices.map(item => {
	    		if (path === item.path) {

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
export {SpecificService}