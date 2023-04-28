import "./MultiRangeSlider.scss"
import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const MultiRangeSlider = ({ min, max}) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
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

    console.log(Number.parseInt(minVal))

    return (
        <div className="container">
            <span className="header">Ціна</span>
            <input
                type="range"
                min={min}
                max={max}
                value={minVal < min ? setMinVal(0) : minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className= {Number.parseInt(minVal) ? "thumb thumb--left" : "thumb thumb--left start"}
                style={{ zIndex: minVal > max - 100 && "5" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={(maxVal > max ? setMaxVal(max) : maxVal) && (maxVal < min ? setMaxVal(min): maxVal)}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className= {Number.parseInt(maxVal) ? "thumb thumb--right" : "thumb thumb--right end"}
            />
            <div className="slider">
                <div className="slider__left-value">
                    <input
                        value={minVal}
                        min={min}
                        max={max}
                        style={{ width: "40px", height: "25px"}}
                        onChange={(e) => {
                            setMinVal(e.target.value);
                        }}
                    />
                </div>
                <span className="betweenSlider">-</span>
                <div className="slider__right-value">
                    <input
                        value={maxVal}
                        min={min - 1}
                        max={max}
                        style={{ width: "40px", height: "25px"}}
                        onChange={(e) => {
                            setMaxVal(e.target.value);
                        }}
                    />
                </div>
                <button className="okButton">
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
