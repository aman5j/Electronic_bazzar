import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from "../components/Header";

import { Grid } from "@mui/material";
import { useStyles } from "./ProjectCss";
import { Rating,Checkbox } from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';



export default function SpecificationProduct()
{
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    var settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true,
        vertical: true,
        verticalSwiping: true,
        centerMode: true,
        focusOnSelect: true,
        infinite: true
      };

      var data = [
        {id:1,picture:'ac1.webp',brandname:"LG",productname:'Solo Microwave', modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:2},
    ]

    var productimages = ['camera1.webp','camera2.webp','camera3.webp','camera4.webp','camera5.webp','camera6.webp','camera7.webp','camera8.webp','camera9.webp']

    const showSlider=()=>{
        return productimages.map((item)=>{
            return (
                <div>
                    <img src={`${serverURL}/images/${item}`} style={{width:'30%'}} />
                </div>
            )
        })
    }

    const showProductDetails=()=>{
        return data.map((item)=>{
            return (
                <div style={{width:'100%'}}>
                    <div style={{width:'90%',background:'#191919',padding:10, display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center', borderRadius:10}}>
            
                    <div style={{display:'flex',justifyContent:'left',flexDirection:'column',width:'80%',marginTop:'5%'}}>
                    <div style={{color:'#fff',fontWeight:600,fontSize:'1.3vw'}}>{item.brandname} {item.productname} {item.modelno}</div>
                    <div style={{display:'flex',flexDirection:'row',marginTop:'5%'}}>
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




    return (<div className={classes.home_root}>
        <Header/>
 
        <Grid container spacing={2}>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>

            <div style={{width:'95%'}}>
                {/* <Slider {...settings}>
                    {showSlider()}
                </Slider> */}
                <div style={{color:'#fff',marginLeft:'auto',padding:10,display:'flex',justifyContent:'right'}}>
                        <Checkbox icon={<FavoriteBorder style={{color:'#fff'}} />} checkedIcon={<Favorite style={{color:'#fff'}} />} />
                </div>

                <div style={{ height:'70%', borderRight: "0.5px solid black" }}>
                
                <div>
                    <img src={`${serverURL}/images/camera2.webp`} style={{width:400, height:400}} />
                </div>

                </div>

            </div>
            </Grid>

            <Grid item xs={6}>
                <div>
                    {showProductDetails()}
                </div>
            </Grid>
        </Grid>
 
    </div>)
}