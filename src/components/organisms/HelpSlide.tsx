import React from 'react'
// import Swiper from 'swiper';
import { Swiper,SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
// import 'swiper/css';
import "swiper/swiper.scss";
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/navigation/navigation.scss';
import testImage from '../../assets/test.jpg'
import help1 from '../../assets/help1.jpg'
import help2 from '../../assets/help2.jpg'
import help3 from '../../assets/help3.jpg'
import help4 from '../../assets/help4.jpg'
import help5 from '../../assets/help5.jpg'

SwiperCore.use([Pagination,Navigation]);

const HelpSlide = () => {
  return (
    <>
  <Swiper
  pagination={{
    "type": "progressbar"
    }} navigation={true}>
    <SwiperSlide>
      <img src={help1} alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={help2} alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={help3} alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={help4} alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={help5} alt="" />
    </SwiperSlide>
    {/* <SwiperSlide>2</SwiperSlide>
    <SwiperSlide>2</SwiperSlide> */}
  </Swiper>
    </>
  )
}

export default HelpSlide
