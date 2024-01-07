import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function CircleComponent({categories})
{
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: matches_md?5:matches_sm?4:8,
        slidesToScroll: 1,
        arrows: matches_md || matches_sm?false:true
      };
/*    var data = [
        {id:1,icon:'c1.png',categoryname:"What's New"},
        {id:2,icon:'c2.png',categoryname:"Mobiles"},
        {id:3,icon:'c3.png',categoryname:"Televisions"},
        {id:4,icon:'c4.png',categoryname:"Laptops"},
        {id:5,icon:'c5.png',categoryname:"Headphones & Earphones"},
        {id:6,icon:'c6.png',categoryname:"Refrigerators"},
        {id:7,icon:'c7.png',categoryname:"Home Theatres & Soundbars"},
        {id:8,icon:'c8.png',categoryname:"Air Conditioners"},
        {id:9,icon:'c9.png',categoryname:"Speakers & Media Players"},
        {id:10,icon:'c10.png',categoryname:"Washing Machines"},
        {id:11,icon:'c11.png',categoryname:"Kichen Appliances"},
        {id:12,icon:'c12.png',categoryname:"Grooming"},
        {id:13,icon:'c13.png',categoryname:"Tablets"},
        {id:14,icon:'c14.png',categoryname:"Wearables"},
        {id:15,icon:'c15.png',categoryname:"Water Purifiers"},
        {id:16,icon:'c16.png',categoryname:"Cameras"},
        {id:17,icon:'c17.png',categoryname:"Accessories"},
        {id:18,icon:'c18.png',categoryname:"Gamings"},
    ]
*/

    const AddSlider=()=>{
        return categories.map((item)=>{
            return (
                <div style={{width:'100%'}}>
                    <div style={{width:'100%', display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
                    <div style={{width:'100%',height:'100%', borderRadius:'50%'}}>
                    <img src={`${serverURL}/images/${item.image}`} style={{width:'98%', margin:'5px'}} />
                    </div>
                    { matches_md || matches_sm ? <></> : 
                    <div style={{color:'#fff',textAlign:'center'}}>{item.categoryname}</div>
                    }
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