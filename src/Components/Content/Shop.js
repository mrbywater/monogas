import "./Content.scss"
import "./Shop.scss"
import {BelowHeaderImage} from "./BelowHeaderImage";
import {faMagnifyingGlass,faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useState} from "react";
import {shopFilter} from "./InfoList"

const Shop = () => {

	const ArrowUp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>'
	const ArrowDown = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>'

	const dropDownShow = (id, index) => () => {	

		shopFilter.map(item =>{

			let elm = document.getElementById(index)

			if (item.headline === id) {
				document.getElementById(id).classList.toggle("onClickDropDownContent");
				
			} 

			if (document.getElementById(id).classList.length > 1) {
				elm.innerHTML  = ArrowUp
			} else {
				elm.innerHTML  = ArrowDown
			}
		})
	}

	return (
		<div className="homeCont">
			<BelowHeaderImage
				headline = "Магазин"
			/>
			<div className="shopCont">
				<div className="searchCont">
					<div className="inputCont">
						<input placeholder ="Пошук..."/>
						<FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
					</div>
				</div>
				<div className="belowSearchCont">
					<div className="filterCont">
					{shopFilter.map((elem, i) => {
						return (
							<div className="dropdown">
								<button className="dropbtn" onClick={dropDownShow(elem.headline, i)}>
									{elem.headline}
									<FontAwesomeIcon icon={faAngleDown} className="dropDownArrow" id={i}/>
								</button>
								<div className="dropdownContent" id={elem.headline}>
									{elem.items.map(text => {
										return (
											<a href="#">{text}</a>
										)
									})}
								</div>
							</div>
						)
					})}
						<div>

						</div>
						<div>

						</div>
					</div>
					<div className="shopItemsCont">

					</div>
				</div>
			</div>
		</div>	
	)
}
export {Shop}