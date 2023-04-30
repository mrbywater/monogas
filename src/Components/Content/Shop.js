import "./Content.scss"
import "./Shop.scss"
import {BelowHeaderImage} from "./BelowHeaderImage";
import {faMagnifyingGlass, faAngleUp, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {shopFilter, shopItems} from "./InfoList"
import {MultiRangeSlider} from "./MultiRangeSlider";
import {ShoppingCart} from "./ShoppingCart";
import React, {useState, useEffect} from "react";
<<<<<<< HEAD
const initialBrands = shopFilter[0].brands.map((i) => ({
		title: i,
		checked: false
	}));
=======
>>>>>>> Nick_Kabachenko

// all of the constants that not recalculated on next render has to be moved out of component
// + it's better to move it to separate `helper.js` file

const checkedInitial = shopFilter[0].brands.reduce((acc,title) => {
	return {
		...acc,
		[title]: false
	}
},{});

const ArrowUp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>'
const ArrowDown = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>'
const price = shopItems.map(elm => elm.price)

let maxPrice = Math.max(...price)
let minPrice = Math.min(...price)

export const Shop = () => {
	const [mainSearchInput, setMainSearchInput] = useState('');
	const [brandSearchInput, setBrandSearchInput] = useState('');
	const [priceFiltered, setPriceFiltered] = useState(shopItems);
	const [brandChecked, setBrandChecked] = useState([]);
	// const [checked, setCheked] = useState(false);
	const [conditionChecked, setConditionChecked] = useState([]);
	const [amountChecked, setAmountChecked] = useState([]);
	const [brandsChecked, setBrandsChecked] = useState(checkedInitial);

<<<<<<< HEAD
	const [testBrands, setTestBrands] = useState(initialBrands);
	const [test, setTest] = useState([]);
	const [stateValue, setStateValue] = useState(false);

	const ArrowUp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>'
	const ArrowDown = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>'
	const price = shopItems.map(elm => elm.price)

	let maxPrice = Math.max(...price)
	let minPrice = Math.min(...price)
	useEffect(()=>{
		console.log('test', test)
	}, [test]);
	const dropDownShow = (id, index) => () => {	
=======


	const dropDownShow = (id, index) => () => {
>>>>>>> Nick_Kabachenko

		shopFilter.map(item => {

			let elm = document.getElementById(index)

			if (item.headline === id) {
				document.getElementById(id).classList.toggle("onClickDropDownContent");

			}
			// mr.Bywater this can be shortened to
			// elm.innerHTM = document.getElementById(id).classList.length === 1 ? ArrowUp : ArrowDown;
			if (document.getElementById(id).classList.length === 1) {
				elm.innerHTML  = ArrowUp
			} else {
				elm.innerHTML  = ArrowDown
			}
		})
	}
	// few comments despite that we're not using this value anymore
	// huge calculations better to put into useMemo hooks with corresponding dependencies
	const brandsSearchFiltered = shopFilter[0].brands.filter(item => {
<<<<<<< HEAD
		return item.toLowerCase().includes(brandSearchInput.toLowerCase());
		// if (item.toLowerCase().includes(brandSearchInput.toLowerCase())) {
		// 	if (brandChecked.length > 0) {
		// 		console.log('--------------------')
		// 		if (brandChecked.includes(item)) {
		// 			console.log("includes",document.getElementById(item))
		// 			document.getElementById(item).checked = true
		// 			return item
		// 		} else {
		// 			console.log("not includes",document.getElementById(item))
		// 			document.getElementById(item).checked = false
		// 			return item
		// 		}
		// 	} else {
				// return brandChecked.includes(item)
		// 	}
		// }
=======
		if (item.toLowerCase().includes(brandSearchInput.toLowerCase())) {
			if (brandChecked.length > 0) {
				console.log('--------------------')
				// can be shortened to
				// document.getElementById(item).checked = brandChecked.includes(item)
				// return item;
				if (brandChecked.includes(item)) {
					console.log("includes",document.getElementById(item))
					document.getElementById(item).checked = true
					return item
				} else {
					console.log("not includes",document.getElementById(item))
					document.getElementById(item).checked = false
					return item
				}
			} else {
				return item
			}
		}
>>>>>>> Nick_Kabachenko
	})


	// const brandsChecked = brandsSearchFiltered.map(item => {
	// 		if (brandsSearchFiltered.length > 0) {
	// 			if (brandChecked.includes(item)) {
	// 				return document.getElementById(item).checked = true
	// 			} else {
	// 				return document.getElementById(item).checked = false
	// 			}
	// 		}
	// 	})

	const handleChangeBrand = () => {
		setBrandChecked(Array.from(document.querySelectorAll("input[name='brand']:checked")).map((elem) => elem.value))
	}

	const handleChangeCondition = () => {
		setConditionChecked(Array.from(document.querySelectorAll("input[name='Новий']:checked, input[name='Б/в']:checked")).map((elem) => elem.value))
		setAmountChecked(Array.from(document.querySelectorAll("input[name='Є в наявності']:checked, input[name='Нема в наявності']:checked")).map((elem) => elem.value))
	}

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

<<<<<<< HEAD
	const testHandleBrand = ({title}) => (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.target.checked = true;
		setStateValue(val => !val);
	}

	return (
		<div>
			{testBrands.map(brand => {
							console.log('brand', brand.title,'test.includes(brand.title)', test.includes(brand.title));
							return  (<div key={brand.title}>
								<input id={brand.title}  checked={stateValue} type="checkbox" value={brand.title}  onClick={testHandleBrand(brand)} />
								<span>{brand.title}</span>
							</div>);
						})}
		</div>
		)
=======
	const onChangeChecked = (brandName) => (e) => {
		setBrandsChecked(brands => ({
			...brands,
			[brandName]: !brands[brandName]
		}))
	};

	// every element that return to us for render from fx. `.map` method
	// needs to have key for the root tag of it
	// https://ru.legacy.reactjs.org/docs/lists-and-keys.html
>>>>>>> Nick_Kabachenko

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
								<div className="dropdown" key={elem.headline}>
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
													onChange={(event) => {
														console.log('onChange', event.target.value)
														setBrandSearchInput(event.target.value)
													}}
												/> : null
										}
<<<<<<< HEAD



=======
										{elem.brands &&
											(Object.keys(brandsChecked).map(text => {
												const isChecked = brandsChecked[text];
												const shouldRender = text.toLowerCase().includes(brandSearchInput.toLowerCase());
												return shouldRender && (
													<div key={text+'_brands_checkboxes'}>
														<input
															type="checkbox"
															checked={isChecked}
															value={isChecked}
															name="brand"
															onChange={onChangeChecked(text)}
														/>
														<span>{text}</span>
													</div>
												);
											}))
										}
>>>>>>> Nick_Kabachenko
										{elem.items &&
											(elem.items.map(text => {
												return (
													<div key={text+'_some_items'}>
														<input
															type="checkbox"
															value={text}
															name={text}
															onChange={handleChangeCondition}
														/>
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
							<div key={elm.headline+'_shop_items'} className="specificItemCont">
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
<<<<<<< HEAD
export {Shop}

// {elem.brands &&
// 											(brandsSearchFiltered.sort().map(text => {
// 												return (
// 													<div>
// 														<input type="checkbox" value={text} name="brand" onChange={handleChangeBrand} id={text}/>
// 														<span>{text}</span>
// 													</div>
// 												)
// 											}))
// 										}
=======
>>>>>>> Nick_Kabachenko
