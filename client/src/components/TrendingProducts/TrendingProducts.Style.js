import Slider from 'react-slick';
import styled from 'styled-components';

export const ContainerTrendingWine = styled.div`
 width:70%;
 margin: 0 auto;
 margin-top:5rem;

`

export const CardTrending = styled.div`
 border: 1px solid black;
 border-radius:8px;
 overflow: hidden;
 height:500px;
 
`


export const ContImageWine = styled.div`

    padding:2em;

    img{
        width:40%;
        height:40%;
        object-fit:cover;
    }
`
export const StyledSlider = styled(Slider)`
    
    .slick-slide > div {
        margin: 0 10px !important;
    }

    .slick-list{
        margin: 0 -10px ;
    }
   
`