import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function MainSlider({banners})
{
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: matches?false:true
      };
    //var data = ['b1.webp','b2.webp','b3.webp','b4.webp','b5.webp','b6.webp','b7.webp','b8.gif']

    const showSlider=()=>{
        return banners.map((item)=>{
            return (
                <div>
                    <img src={`${serverURL}/images/${item}`} style={{width:'100%'}} />
                </div>
            )
        })
    }

    return(<div style={{width:'95%'}}>
        <Slider {...settings}>
            {showSlider()}
        </Slider>

    </div>)
}