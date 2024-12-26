import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from "../assets/image1.jpg";

export default function SlickBannerSlide() {
  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    swipe:false,
    customPaging: () => (
      <div className="h-full flex flex-col justify-center">
        <div className="custom-dot"></div>
      </div>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="banner flex justify-center items-center">{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="w-[100%] max-h-[993px] overflow-hidden banner-slider">
      <Slider {...settings}>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg`}
            className="max-h-[993px]"
            alt=""
          />
        </div>
        <div>
          <img src={Image1} className="max-h-[993px]" alt="" />
        </div>
        <div>
          <img src={Image1} className="max-h-[993px]" alt="" />
        </div>
        <div>
          <img src={Image1} className="max-h-[993px]" alt="" />
        </div>
        <div>
          <img src={Image1} className="max-h-[993px]" alt="" />
        </div>
      </Slider>
    </div>
  );
}
