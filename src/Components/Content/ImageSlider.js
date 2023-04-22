import "./ImageSlider.scss"
import { useState } from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faAngleLeft, faAngleUp} from "@fortawesome/free-solid-svg-icons";
const ImageSlider = ({slides} ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="sliderStyles">
            <div onClick={goToPrevious} className="leftArrowStyles">
                <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            <div onClick={goToNext} className="rightArrowStyles">
                <FontAwesomeIcon icon={faAngleRight} />
            </div>
            <img className="slideStyles" src={slides[currentIndex]}></img>
            <div className="dotsContainerStyles">
                {slides.map((slide, slideIndex) => (
                    <div
                        className={slideIndex === currentIndex ? "dotStyleSelected":"dotStyle" }
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                    >
                        ●
                    </div>
                ))}
            </div>
        </div>
    );
};

export {ImageSlider};
