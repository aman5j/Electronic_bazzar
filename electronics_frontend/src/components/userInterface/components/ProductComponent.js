import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Rating,Checkbox } from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";

export default function ProductComponent({data,title})
{
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    var navigate = useNavigate()

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: matches_sm?1:matches_md?2:4,
        slidesToScroll: 1,
        arrows: matches_md || matches_sm?false:true
      };

    /*  var data = [
        {id:1,picture:'p3.png',brandname:"LG",productname:'Solo Microwave', modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:2},
        {id:1,picture:'p3.png',brandname:"LG",productname:'Solo Microwave', modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:3},
        {id:1,picture:'p3.png',brandname:"LG",productname:'Solo Microwave', modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:5},
        {id:1,picture:'p3.png',brandname:"LG",productname:'Solo Microwave', modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:2},
        {id:1,picture:'p3.png',brandname:"LG",productname:'Solo Microwave', modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:1},
        {id:1,picture:'p3.png',brandname:"LG",productname:'Solo Microwave', modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:5},
        {id:1,picture:'p3.png',brandname:"LG",productname:'Solo Microwave', modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:5},
    ]
    */

    const handleClick=(item)=>{
        
        navigate('/productpurchasescreen',{state:{product:item}})
    
    }
    

    const AddSlider=()=>{
        return data.map((item)=>{
            return (
                <div onClick={()=>handleClick(item)} style={{width:'100%'}}>
                    <div style={{cursor:'pointer',width:'90%',background:'#121212',padding:10, display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center', borderRadius:10}}>
                    
                    <div style={{color:'#fff',marginLeft:'auto',padding:10}}>
                        <Checkbox icon={<FavoriteBorder style={{color:'#fff'}} />} checkedIcon={<Favorite style={{color:'#fff'}} />} />
                    </div>
                    <img src={`${serverURL}/images/${item.productpicture}`} style={{width:'80%'}} />
                    <div style={{display:'flex',justifyContent:'left',flexDirection:'column',width:'80%',marginTop:'5%'}}>
                    <div style={{color:'#fff',fontWeight:600,fontSize:'1.3vw',height:100}}>{item.brandname} {item.productname} {item.modelno}</div>
                    <div style={{display:'flex',flexDirection:'row',marginTop:'8%'}}>
                    <div style={{color:'#fff',fontWeight:600,fontSize:'1.3vw',textDecoration: 'line-through'}}>&#8377;{item.price}</div>
                    <div style={{color:'#fff',fontWeight:400,fontSize:'1vw'}}>&#8377;{item.offerprice}</div>
                    </div>
                    <Rating
                        style={{marginTop:'5%'}}
                        name="simple-controlled"
                        value={item.rating}
                        
                    />
                    </div>
                    
                    </div>
                </div>
            )
        })
    }

    return(<div style={{width:'80%'}}>
        <div style={{color:'#fff',fontSize:25,fontWeight:'bold',marginLeft:'10%',margin:'10px 0 10px 10px'}}>{title}</div>
        <Slider {...settings}>
            {AddSlider()}
        </Slider>

    </div>)
}