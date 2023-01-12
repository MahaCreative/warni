import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Paralax(props) {
    const model = props.model;
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {model.length > 0
                    ? model.map((item) => (
                          <SwiperSlide className="relative w-full">
                              <div className="relative w-full">
                                  <img
                                      src={"/storage/" + item.thumbnail}
                                      alt=""
                                  />
                              </div>
                              <div className="absolute bottom-[5vh] left-[10vw] bg-gray-400/50 py-2.5 px-4 rounded-md backdrop-blur-sm">
                                  <p className="text-white">{item.judul}</p>
                              </div>
                          </SwiperSlide>
                      ))
                    : ""}
            </Swiper>
        </>
    );
}
