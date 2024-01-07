import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function FestiveDealsCompoent()
{
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: matches_md || matches_sm?false:true
      };

    var data = [
        {id:1,picture:'g1.webp'},
        {id:2,picture:'g2.webp'},
        {id:3,picture:'g3.webp'},
        {id:4,picture:'g4.webp'},
        {id:5,picture:'g5.webp'},
        {id:6,picture:'g6.webp'},
        {id:7,picture:'g7.webp'},
        {id:8,picture:'g8.webp'},
        {id:9,picture:'g9.webp'},
        {id:10,picture:'g10.webp'},
        
    ]

    const AddSlider=()=>{
        return data.map((item)=>{
            return (
                <div style={{width:'100%'}}>
                    <div style={{width:'95%',background:'grey', display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center', borderRadius:10}}>
                    
                    <img src={`${serverURL}/images/${item.picture}`} style={{width:'100%'}} />
                    
                    </div>
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