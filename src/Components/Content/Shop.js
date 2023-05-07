import "./Content.scss"
import "./Shop.scss"
import {BelowHeaderImage} from "./BelowHeaderImage";
import {faMagnifyingGlass, faAngleUp, faCartShopping, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {shopFilter, shopItems} from "./InfoList"
import {MultiRangeSlider} from "./MultiRangeSlider";
import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import {urlCreation} from "./OurProjects.js"
import {Pagination} from "./Pagination";
import {ShoppingCartContext} from "../Context/ShoppingCartContext";

// all of the constants that not recalculated on next render has to be moved out of component
// + it's better to move it to separate `helper.js` file
const createBrands = shopItems.map(item => item.brand)

const checkedInitial = createBrands.reduce((acc,title) => {
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

const Shop = () => {

	const { addItemToCart } = useContext(ShoppingCartContext)

	const [mainSearchInput, setMainSearchInput] = useState('');
	const [brandSearchInput, setBrandSearchInput] = useState('');
	const [priceFiltered, setPriceFiltered] = useState(shopItems);
	const [brandCheckedTrue, setBrandCheckedTrue] = useState([]);
	const [conditionChecked, setConditionChecked] = useState([]);
	const [amountChecked, setAmountChecked] = useState([]);
	const [brandsChecked, setBrandsChecked] = useState(checkedInitial);
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage] = useState(2)
	const [selectedValue, setSelectedValue] = useState("relevance")

	useEffect(()=>{
		setBrandCheckedTrue(Object.entries(brandsChecked).map(item => {
			if (item[1] === true) {
				return item[0]
			}
		}))
	}, [brandsChecked])

	useEffect(()=> {

		if (!localStorage.getItem('search')) {
			setMainSearchInput('')
		} else {
			setMainSearchInput(localStorage.getItem('search'))
		}

	},[])

	useEffect(()=> {
		if (mainSearchInput !== "") {
			localStorage.setItem('search', '')
		}
	},[mainSearchInput])

	const dropDownShow = (id, index) => () => {
		shopFilter.map(item => {
			let elm = document.getElementById(index)

			if (item.headline === id) {
				document.getElementById(id).classList.toggle("onClickDropDownContent");
			}
			elm.innerHTML = document.getElementById(id).classList.length === 1 ? ArrowUp : ArrowDown;
		})
	}

	const handleChangeCondition = () => {
		setConditionChecked(Array.from(document.querySelectorAll("input[name='Новий']:checked, input[name='Б/в']:checked")).map((elem) => elem.value))
		setAmountChecked(Array.from(document.querySelectorAll("input[name='Є в наявності']:checked, input[name='Нема в наявності']:checked")).map((elem) => elem.value))
		setCurrentPage(1)
	}

	const brandFiltered = priceFiltered.filter(item => {
		if (brandCheckedTrue.every(elem => elem === undefined)) {
			return priceFiltered
		} else {
			return brandCheckedTrue.includes(item.brand)
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

	const sortMainSearchFiltered = selectedValue === "minToMax" ? mainSearchFiltered.sort((a, b) => a.price - b.price) : selectedValue === "maxToMin" ? mainSearchFiltered.sort((a, b) => b.price - a.price) : mainSearchFiltered

	const lastItemIndex = currentPage * itemsPerPage
	const firstItemIndex = lastItemIndex - itemsPerPage
	const currentItem = sortMainSearchFiltered.slice(firstItemIndex,lastItemIndex)

	const nextPage = () => setCurrentPage(prev => prev + 1)
	const prevPage = () => setCurrentPage(prev => prev - 1)

	const paginate = pageNumber => setCurrentPage(pageNumber)

	const onChangeChecked = (brandName) => (e) => {
		setBrandsChecked(brands => ({
			...brands,
			[brandName]: !brands[brandName]
		}))
		setCurrentPage(1)
	};

	const slectedMinMax = (event) => {
		setSelectedValue(event.target.value)
		setCurrentPage(1)
	}

	// every element that return to us for render from fx. `.map` method
	// needs to have key for the root tag of it
	// https://ru.legacy.reactjs.org/docs/lists-and-keys.html
	return (
		<div className="homeCont">
			<BelowHeaderImage
				headline = "Магазин"
			/>
			<div className="shopCont">
				<div className="searchCont">
					<div className="inputCont">
						<input
							id="mainSearch"
							placeholder ="Пошук..."
							value={mainSearchInput}
							onChange={(event) => {
								setMainSearchInput(event.target.value)
								setCurrentPage(1)
							}}
						/>
						<FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
					</div>
					<select className="sortCont" value={selectedValue} onChange={slectedMinMax}>
						<option value="relevance" selected>За релевантністю</option>
						<option value="minToMax" >Від дешевих до дорогих</option>
						<option value="maxToMin" >Від дорогих до дешевих</option>
					</select >
				</div>
				<div className="belowSearchCont">
					<div className="filterCont" >
						<MultiRangeSlider
							min={minPrice}
							max={maxPrice}
							setPrice={setPriceFiltered}
							setCurrentPage={setCurrentPage}
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
														setBrandSearchInput(event.target.value)
													}}
												/> : null
										}
										<div className="allBrands">
											{!elem.items &&
												(Object.keys(brandsChecked).sort().map(text => {
													const isChecked = brandsChecked[text];
													const shouldRender = text.toLowerCase().includes(brandSearchInput.toLowerCase());
													return shouldRender && (
														<div key={text+'_brands_checkboxes'}>
															<input
																type="checkbox"
																checked={isChecked}
																value={text}
																name="brand"
																onChange={onChangeChecked(text)}
															/>
															<span>{text}</span>
														</div>
													);
												}))
											}
										</div>
										<div className="allBrands">
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
								</div>
							)
						})}
					</div>
					<div className="itemsAndNavigationCont">
						<div className="shopItemsCont">
							{!!currentItem.length ?
								(currentItem.map(elm =>(
									<div key={elm.headline+'_shop_items'} className="specificItemCont">
										<div className="specificItem">
											<div className="widthCont" style={!elm.amount ? {opacity : 0.4} : null}>
												<Link to={"/shop/" + urlCreation(elm.headline)}>
													<img src={elm.img[0]}/>
													<span className="itemHeadline">{elm.headline}</span>
												</Link>
												{!elm.amount && <span className="itemAmount">Немає в наявності</span>}
												<div className="itemPriceCont">
													<span>{elm.price}₴</span>
													<FontAwesomeIcon
														onClick={addItemToCart(elm)}
														icon={faCartShopping}
														style={!elm.amount ? {pointerEvents: "none"} : ""}
													/>
												</div>
											</div>
										</div>
									</div>
								))) :
								<div className="noItems">
									На Ваш запит нічого не знайдено
								</div>
							}
						</div>
						<div className="pagesNavigationCont">
							<FontAwesomeIcon
								icon={faAngleLeft}
								onClick={prevPage}
								className={currentPage === 1 ? "disabled" : ""}
							/>
							<div className="pagesCont">
								<Pagination
									itemsPerPage = {itemsPerPage}
									totalItems = {sortMainSearchFiltered.length}
									paginate = {paginate}
									currentPage = {currentPage}
								/>
							</div>
							<FontAwesomeIcon
								icon={faAngleRight}
								onClick={nextPage}
								className={currentPage === Math.ceil(sortMainSearchFiltered.length / itemsPerPage) || Math.ceil(sortMainSearchFiltered.length / itemsPerPage) === 0 ? "disabled" : ""}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export {Shop}

