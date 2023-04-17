import "./Content.scss"
import {useParams} from "react-router";
import {NotFoundPage} from "./NotFoundPage"

export const buttonServices = [
    {
        title : "Установка ГБО 2-го покоління",
        path : "second_generation",
    },
    {
        title : "Установка ГБО 4-го покоління",
        path : "fouth_generation"
    },
    {
        title :  "Установка ГБО на FSI, TSI, GDI",
        path : "fsi_tsi_gdi"
    },
    {
        title : "Установка ГБО на електромобілі",
        path : "electric_car"
    },
    {
        title : "Установка ГБО на дизель",
        path : "diesel"
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
							<div className="notFoundPage">
								<h1>{item.title}</h1>
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