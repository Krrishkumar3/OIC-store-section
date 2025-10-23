import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// You can create a separate CSS file for the slider if needed
import './ImageSlider.css';

// Import your images
const ImageSlider = () => {
  // Use public or remote images so the slider works without local assets
  const slides = [
    'https://dtu.ac.in/images/background/banner1.jpg',
    'https://dtu.ac.in/images/background/banner2.jpg',
    'https://dtu.ac.in/images/background/banner3.jpg',
  ];

  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active'
        }}
        autoplay={{ 
          delay: 3000, 
          disableOnInteraction: false 
        }}
        loop={true}
        className="mySwiper"
      >
        {slides.map((url, idx) => (
          <SwiperSlide key={idx}>
            <img src={url} alt={`Slide ${idx + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;