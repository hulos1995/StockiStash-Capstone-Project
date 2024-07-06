import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GallarySlider.scss";
import image2 from "../../assets/images/mold.jpg";
import image3 from "../../assets/images/mold-8.jpg";
import image4 from "../../assets/images/mold-3.jpg";
import image5 from "../../assets/images/mold-4.jpg";
import image6 from "../../assets/images/mold-7.jpg";
import image7 from "../../assets/images/mold-5.jpg";
import image8 from "../../assets/images/mold-6.jpg";
import image9 from "../../assets/images/mold-1.jpg";
import image10 from "../../assets/images/mold-2.jpg";
const images = [
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

const GallarySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  useEffect(() => {
    sliderRef.current.slickGoTo(currentIndex);
  }, [currentIndex]);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    beforeChange: (current, next) => setCurrentIndex(next),
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className={"gallery"}>
      <div className="gallery__thumbnails-container">
        <div className="gallery__thumbnails">
          {images.map((img, index) => (
            <div
              key={index}
              className={`gallery__thumbnail ${
                index === currentIndex ? "gallery__thumbnail-active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                className="gallery__thumbnail-image"
                src={img}
                alt={`Thumbnail ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="gallery__main">
        <Slider ref={sliderRef} {...settings}>
          {images.map((img, index) => (
            <div key={index} className="gallery__main-slide">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="gallery__main-image"
              />
            </div>
          ))}
        </Slider>
        <div className="gallery__main-controls">
          <button
            className="gallery__main-button gallery__main-button--prev"
            onClick={handlePrev}
          >
            ◀
          </button>
          <button
            className="gallery__main-button gallery__main-button--next"
            onClick={handleNext}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default GallarySlider;
