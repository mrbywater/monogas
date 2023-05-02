import "./ImageSlider.scss"
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css"
import "../../../node_modules/slick-carousel/slick/slick-theme.css";


const ImageSlider = ( {slides} ) => {

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {slides.map(img => (
                <img className="imgSlide" src={img}/>
            ))}
        </Slider>
    );
};

export {ImageSlider};
