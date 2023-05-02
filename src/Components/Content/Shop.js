import "./Content.scss"
import "./Shop.scss"
import {BelowHeaderImage} from "./BelowHeaderImage";
import {faMagnifyingGlass, faAngleUp, faCartShopping, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {shopFilter, shopItems} from "./InfoList"
import {MultiRangeSlider} from "./MultiRangeSlider";
import {ShoppingCart} from "./ShoppingCart";
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {urlCreation} from "./OurProjects.js"
import {Pagination} from "./Pagination";

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

const Shop = () => {
	const [mainSearchInput, setMainSearchInput] = useState('');
	const [brandSearchInput, setBrandSearchInput] = useState('');
	const [priceFiltered, setPriceFiltered] = useState(shopItems);
	const [brandCheckedTrue, setBrandCheckedTrue] = useState([]);
	const [conditionChecked, setConditionChecked] = useState([]);
	const [amountChecked, setAmountChecked] = useState([]);
	const [brandsChecked, setBrandsChecked] = useState(checkedInitial);
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage] = useState(2)
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

	const lastItemIndex = currentPage * itemsPerPage
	const firstItemIndex = lastItemIndex - itemsPerPage
	const currentItem = mainSearchFiltered.slice(firstItemIndex,lastItemIndex)

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

	useEffect(()=>{
		setBrandCheckedTrue(Object.entries(brandsChecked).map(item => {
			if (item[1] === true) {
				return item[0]
			}
		}))
	}, [brandsChecked])

	// every element that return to us for render from fx. `.map` method
	// needs to have key for the root tag of it
	// https://ru.legacy.reactjs.org/docs/lists-and-keys.html

	return (
		<div className="homeCont">
			<BelowHeaderImage
				headline = "Магазин"
			/>
			<ShoppingCart />
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
														console.log('onChange', event.target.value)
														setBrandSearchInput(event.target.value)
													}}
												/> : null
										}
										{elem.brands &&
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
					<div className="itemsAndNavigationCont">
						<div className="shopItemsCont">
							{currentItem.map(elm =>(
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
												<FontAwesomeIcon icon={faCartShopping} />
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="pagesNavigationCont">
							<FontAwesomeIcon icon={faAngleLeft} onClick={prevPage} className={currentPage === 1 ? "disabled" : ""}/>
							<div className="pagesCont">
								<Pagination
									itemsPerPage = {itemsPerPage}
									totalItems = {mainSearchFiltered.length}
									paginate = {paginate}
									currentPage = {currentPage}
								/>
							</div>
							<FontAwesomeIcon icon={faAngleRight} onClick={nextPage} className={currentPage === Math.ceil(mainSearchFiltered.length / itemsPerPage) ? "disabled" : ""}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export {Shop}

