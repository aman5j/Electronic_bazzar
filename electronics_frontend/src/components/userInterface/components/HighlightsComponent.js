import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function HighlightsCompoent({title})
{
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: matches_sm?1:matches_md?2:3,
        slidesToScroll: 1,
        arrows: matches_md || matches_sm?false:true
      };

    var data1 = ['h1.webp','h2.webp','h3.webp','h4.webp','h5.webp','h6.webp']

    const highLight1Slider=()=>{
        return data1.map((item)=>{
            return (
                <div style={{width:'100%'}}>
                    <div style={{width:'95%', display:'flex',flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                    
                    <img src={`${serverURL}/images/${item}`} style={{width:'100%',borderRadius:10}} />
                    
                    </div>
                </div>
            )
        })
    }
    
    var data2 = ['h7.webp','h8.webp','h9.webp','h10.webp','h11.webp','h12.webp']

    const highLight2Slider=()=>{
        return data2.map((item)=>{
            return (
                <div style={{width:'100%'}}>
                    <div style={{width:'95%', display:'flex',flexDirection:'row', justifyContent:'center',alignItems:'center',borderRadius:10}}>
                    
                    <img src={`${serverURL}/images/${item}`} style={{width:'100%',borderRadius:10}} />
                    
                    </div>
                </div>
            )
        })
    }

    return(<div style={{width:'80%'}}>
        <div style={{color:'#fff',fontSize:25,fontWeight:'bold',marginLeft:'10%',margin:'10px 0 10px 10px'}}>{title}</div>
        <Slider {...settings}>
            {highLight1Slider()}
        </Slider>
        <div style={{marginTop:'1.2%'}}>
        <Slider {...settings}>
            {highLight2Slider()}
        </Slider>
        </div>

    </div>)
}