import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function BrandsComponent({brands,title})
{
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: matches_sm?2:matches_md?4.5:6,
        slidesToScroll: 1,
        arrows: matches_md || matches_sm?false:true,
      };

    // var data1 = ['h1.webp','h2.webp','h3.webp','h4.webp','h5.webp','h6.webp']

    const showBrands=()=>{
        return brands.map((item)=>{
            return (
                <div style={{width:'100%'}}>
                    <div style={{width:'85%', display:'flex',flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                    
                    <img src={`${serverURL}/images/${item.logo}`} style={{width:'100%',borderRadius:10}} />
                    
                    </div>
                </div>
            )
        })
    }
    
    return(<div style={{width:'80%'}}>
       <div style={{color:'#fff',fontSize:25,fontWeight:'bold',marginLeft:'10%',margin:'10px 0 10px 10px'}}>{title}</div>
        <Slider {...settings}>
            {showBrands()}
        </Slider>

    </div>)
}