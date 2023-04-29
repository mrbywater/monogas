import "./Content.scss"
import "./Shop.scss"
import {BelowHeaderImage} from "./BelowHeaderImage";
import {faMagnifyingGlass, faAngleUp, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {shopFilter, shopItems} from "./InfoList"
import {MultiRangeSlider} from "./MultiRangeSlider";
import {ShoppingCart} from "./ShoppingCart";
import React, {useState} from "react";

const Shop = () => {

	const [mainSearchInput, setMainSearchInput] = useState('');
	const [brandSearchInput, setBrandSearchInput] = useState('');
	const [priceFiltered, setPriceFiltered] = useState(shopItems)
	const [brandChecked, setBrandChecked] = useState([])
	const [conditionChecked, setConditionChecked] = useState([])
	const [amountChecked, setAmountChecked] = useState([])

	const ArrowUp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>'
	const ArrowDown = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>'
	const price = shopItems.map(elm => elm.price)

	let maxPrice = Math.max(...price)
	let minPrice = Math.min(...price)

	const dropDownShow = (id, index) => () => {	

		shopFilter.map(item =>{

			let elm = document.getElementById(index)

			if (item.headline === id) {
				document.getElementById(id).classList.toggle("onClickDropDownContent");
				
			} 

			if (document.getElementById(id).classList.length === 1) {
				elm.innerHTML  = ArrowUp
			} else {
				elm.innerHTML  = ArrowDown
			}
		})
	}

	const brandsSearchFiltered = shopFilter[0].brands.filter(item => {
		return item.toLowerCase().includes(brandSearchInput.toLowerCase())
	})

	const handleChangeBrand = () => {
		setBrandChecked(Array.from(document.querySelectorAll("input[name='brand']:checked")).map((elem) => elem.value))
	}

	const handleChangeCondition = () => {
		setConditionChecked(Array.from(document.querySelectorAll("input[name='Новий']:checked, input[name='Б/в']:checked")).map((elem) => elem.value))
		setAmountChecked(Array.from(document.querySelectorAll("input[name='Є в наявності']:checked, input[name='Нема в наявності']:checked")).map((elem) => elem.value))
	}

	console.log(conditionChecked)

	const brandFiltered = priceFiltered.filter(item => {
		if (brandChecked.length === 0 ) {
			return priceFiltered
		} else {
			return brandChecked.includes(item.brand)
		}
	})

	const conditionFiltered = brandFiltered.filter(item => {
		if (conditionChecked.length === 0 ) {
			return brandFiltered
		} else {
			return conditionChecked.includes(item.condition)
		}
	})

	const amountFiltered = conditionFiltered.filter(item => {
		if (amountChecked.length === 0 || amountChecked.length === 2) {
			return conditionFiltered
		} else {
			if (amountChecked.includes("Нема в наявності")) {
				return item.amount === 0
			} else return item.amount
		}
	})

	const mainSearchFiltered = amountFiltered.filter(item => {
		return item.headline.toLowerCase().includes(mainSearchInput.toLowerCase())
	})

	return (
		<div className="homeCont">
			<BelowHeaderImage
				headline = "Магазин"
			/>
			<ShoppingCart/>
			<div className="shopCont">
				<div className="searchCont">
					<div className="inputCont">
						<input
							placeholder ="Пошук..."
							value={mainSearchInput}
							onChange={(event) => setMainSearchInput(event.target.value)}
						/>
						<FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
					</div>
				</div>
				<div className="belowSearchCont">
					<div className="filterCont">
						<MultiRangeSlider
							min={minPrice}
							max={maxPrice}
							setPrice={setPriceFiltered}
						/>
						{shopFilter.map((elem, i) => {
							return (
								<div className="dropdown">
									<button className="dropbtn" onClick={dropDownShow(elem.headline, i)}>
										{elem.headline}
										<FontAwesomeIcon icon={faAngleUp} className="dropDownArrow" id={i}/>
									</button>
									<div className="dropdownContent" id={elem.headline}>
										{
											elem.headline === "Бренд" ?
												<input
													placeholder ="Пошук..." className="brandSearch"
													value={brandSearchInput}
													onChange={(event) => setBrandSearchInput(event.target.value)}
												/> : null
										}
										{elem.brands &&
											(brandsSearchFiltered.sort().map(text => {
												return (
													<div>
														<input type="checkbox" value={text} name="brand" onChange={handleChangeBrand}/>
														<span>{text}</span>
													</div>
												)
											}))
										}
										{elem.items &&
											(elem.items.map(text => {
												return (
													<div>
														<input type="checkbox" value={text} name={text} onChange={handleChangeCondition}/>
														<span>{text}</span>
													</div>
												)
											}))
										}
									</div>
								</div>
							)
						})}
					</div>
					<div className="shopItemsCont">
						{mainSearchFiltered.map(elm =>(
							<div className="specificItemCont">
								<div className="specificItem">
									<div className="widthCont">
										<img src={elm.img}/>
										<span>{elm.headline}</span>
										<div className="itemPriceCont">
											<span>{elm.price}₴</span>
											<FontAwesomeIcon icon={faCartShopping} />
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>	
	)
}
export {Shop}