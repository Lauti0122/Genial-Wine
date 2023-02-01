import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { WineCard } from "../WineCard";
import { ContainerTrendingWine, ContImageWine,CardTrending, StyledSlider } from "./TrendingProducts.Style";
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'

let slidesToShow = 3


export  function TrendingProducts({trendingWines}) {



  function SampleNextArrow(props) {
    const { className, style, onClick, currentSlide, slideCount } = props;
    return (
      <>
        { currentSlide !== slideCount-slidesToShow && (
          <div className={className} onClick={onClick}>
            <ArrowForwardIos style={{ color:"black", fontSize:"30px" }} />
          </div>
        ) }
        </>
    );
  }

  
  function SamplePrevArrow(props) {
    const { className, style, onClick, currentSlide } = props;
    return (
      <>
      { currentSlide !== 0 && (
        <div className={className} onClick={onClick}>
          <ArrowBackIos style={{ color:"black", fontSize:"30px" }}/>
        </div>
        )}
      </>
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <ContainerTrendingWine>
      <StyledSlider { ...settings } >
      {trendingWines.map( wine => (
        <CardTrending >
          <ContImageWine>
            <WineCard
             id={wine.id}
             name={wine.name}
             price={wine.price}
             country={wine.country}
             region={wine.region}
             type={wine.type}
             grape_type={wine.grape_type}
             description={wine.description}
             capacity={wine.capacity}
             year={wine.year}
             images={wine.images}
            />
          </ContImageWine>
      
        </CardTrending>
      ))}
      </StyledSlider>
    </ContainerTrendingWine> 


  )
}



