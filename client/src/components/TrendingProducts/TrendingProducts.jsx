import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true
};

export  function TrendingProducts({trendingWines}) {

  return (
    <div>
    
    <Slider {...settings}>

      {trendingWines.length > 0 ? trendingWines.map(wine => (

          <div>
                <h3> {wine.name} </h3>
          </div>

      )) : <div>Trending wines not found</div> }
   
    </Slider>
  </div>
  )
}


