import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";


const FinanceSlider = () => {


const[financeImageData,setFinanceImageData]=useState([])

const fetchFinanceImage=async()=>{
try {
  const data=await fetch("/FinanceSlideData/FinanceData.json")
  const response=await data.json()
  console.log(response);
  
  setFinanceImageData(response)
} catch (error) {
  console.log("Error is",error);
  
}
}

useEffect(()=>{
fetchFinanceImage()
},[])

  return (
    <div className="w-full py-10 min-h-90">
      <div className="flex w-full items-center flex-col justify-center">
        <h2 className="text-4xl ">
          Our Financing{" "}
          <span className="text-4xl text-green-600 font-semibold">
            Partners
          </span>
        </h2>
      </div>

      <div className="mt-10">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={5}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          freeMode={true}
          grabCursor={true}
        >



          {
            financeImageData.map((item,idx)=>{
              return(
                <div >
 <SwiperSlide key={idx} >
              <div className="w-[200px] h-[100px] flex items-center justify-center bg-white shadow-lg   rounded-xl p-5 flex-col">
                <img src={item.image} className="h-[70px] w-[200px]" />
               
              </div>
            </SwiperSlide>
                </div>
              )
            })
          }
          
        </Swiper>
      </div>
    </div>
  );
};

export default FinanceSlider;
