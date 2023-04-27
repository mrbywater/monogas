import "./Content.scss"
import "./Shop.scss"
import {BelowHeaderImage} from "./BelowHeaderImage";
import {faMagnifyingGlass,faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useState} from "react";

const Shop = () => {

	const ArrowUp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>'
	const ArrowDown = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>'

	const [arrowStyle, setArrowStyle] = useState(ArrowDown)
	const [dropDownBorderBottom, setDropDownBorderBottom] = useState(  {borderBottom: "1px solid black"})

	const dropDownShow = (id,id1) => () => {

		document.getElementById(id).classList.toggle("onClickDropDownContent");
		document.getElementById(id).classList.toggle("dropDownBorderBottom");
		if (arrowStyle === ArrowDown) {
			setDropDownBorderBottom({borderBottom: "none"})
		} else {
			setDropDownBorderBottom({borderBottom: "1px solid black"})
		}

		if (document.getElementById(id).classList.length > 1 ) {
			if (id1 === "country_arrow"){
				let elm = document.getElementById(id1)
				elm.innerHTML  = ArrowUp
			}
		} else setArrowStyle(ArrowDown)
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
						<div className="dropdown">
							<button className="dropbtn" onClick={dropDownShow("brands","brands_arrow")}>
								Dropdown
								<FontAwesomeIcon icon={faAngleDown} className="dropDownArrow" id="brands_arrow"/>
							</button>
							<div className="dropdown-content" id="brands">
								<a href="#">Link 1</a>
								<a href="#">Link 2</a>
								<a href="#">Link 3</a>
							</div>
						</div>
						<div className="dropdown">
							<button className="dropbtn" onClick={dropDownShow("country","country_arrow")}>
								Dropdown
								<FontAwesomeIcon icon={faAngleDown} className="dropDownArrow" id="country_arrow"/>
							</button>
							<div className="dropdown-content" id="country">
								<a href="#">Link 1</a>
								<a href="#">Link 2</a>
								<a href="#">Link 3</a>
							</div>
						</div>
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