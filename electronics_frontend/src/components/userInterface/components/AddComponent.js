import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function AddComponent()
{
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: matches?false:true
      };
    var data = ['banner1.webp','banner2.webp','banner1.webp','banner2.webp']

    const AddSlider=()=>{
        return data.map((item)=>{
            return (
                <div style={{width:'100%'}}>
                    <img src={`${serverURL}/images/${item}`} style={{width:'98%', margin:'5px'}} />
                </div>
            )
        })
    }

    return(<div style={{width:'80%'}}>
        <Slider {...settings}>
            {AddSlider()}
        </Slider>

    </div>)
}