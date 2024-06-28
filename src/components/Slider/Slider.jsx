// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.scss";
import image2 from "../../assets/images/mold-2.jpg";
import image3 from "../../assets/images/mold-3.jpg";
import image4 from "../../assets/images/mold-4.jpg";
import { Navigation, Pagination } from "swiper/modules";
const Slider = () => {
  return (
    <div className="slider">
      <Swiper
        navigation={{
          nextEl: ".slider__button--next",
          prevEl: ".slider__button--prev",
        }}
        modules={[Navigation, Pagination]}
        className="slider__container"
      >
        <SwiperSlide className="slider__slide">
          <img src={image2} alt="Slide 2" className="slider__image" />
        </SwiperSlide>
        <SwiperSlide className="slider__slide">
          <img src={image3} alt="Slide 3" className="slider__image" />
        </SwiperSlide>
        <SwiperSlide className="slider__slide">
          <img src={image4} alt="Slide 4" className="slider__image" />
        </SwiperSlide>
        <div className="slider__button slider__button--prev">Prev</div>
        <div className="slider__button slider__button--next">Next</div>
      </Swiper>
    </div>
  );
};

export default Slider;
