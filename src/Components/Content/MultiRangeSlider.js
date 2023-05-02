import "./MultiRangeSlider.scss"
import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {shopItems} from "./InfoList";

const MultiRangeSlider = ({ min, max, setPrice, setCurrentPage}) => {

    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);

    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    const buttonOk = () => {
        setPrice(shopItems.filter(elm => {
            return elm.price >= Number(minVal) && elm.price <= Number(maxVal)
        }))
        setCurrentPage(1)
    }


    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        let minPercent = minVal < min ? getPercent(min) : getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = (`${maxPercent - minPercent}%`);
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    return (
        <div className="container">
            <span className="header">Ціна</span>
            <input
                type="range"
                min={min}
                max={max}
                value={minVal === "" ? min : minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className= "thumb thumb--left"
                style={{ zIndex: minVal > max - 100 && "5" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal === "" ? max : maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className= "thumb thumb--right"
            />
            <div className="slider">
                <div className="slider__left-value">
                    <input
                        value={minVal > max ? setMinVal(max-1) : minVal}
                        min={min}
                        max={max}
                        style={{ width: "40px", height: "25px"}}
                        onChange={(e) => {
                            const result = e.target.value.replace(/\D/g, '');
                            setMinVal(result);
                        }}
                    />
                </div>
                <span className="betweenSlider">-</span>
                <div className="slider__right-value">
                    <input
                        value={maxVal > max ? setMaxVal(max): maxVal}
                        min={min - 1}
                        max={max}
                        style={{ width: "40px", height: "25px"}}
                        onChange={(e) => {
                            const result = e.target.value.replace(/\D/g, '');
                            setMaxVal(result);
                        }}
                    />
                </div>
                <button className="okButton" onClick={buttonOk}>
                    OK
                </button>
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
            </div>
        </div>
    );
};

MultiRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
};

export {MultiRangeSlider};
