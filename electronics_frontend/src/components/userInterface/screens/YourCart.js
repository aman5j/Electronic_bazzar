import { serverURL } from "../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from "../components/Header";

import { Grid } from "@mui/material";
import { useStyles } from "./ProjectCss";
import { Rating,Checkbox } from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';



export default function YourCart()
{
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    var data = [
        {id:1,picture:'washing_machine_croma.webp',brandname:"Croma",productname:'Fully Automatic Top Load Washing Machine', modelno:'7.5 kg (CRLWMD702STL75, Fuzzy Control, Grey)',price:20000,offerprice:10000,rating:2},
        {id:2,picture:'ac2.webp',brandname:"LG",productname:'Solo Microwave Having High Capacity', modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:3},
    ]
    

    const showProuduct=()=>{
        return data.map((item)=>{
            return (
                <div style={{width:'100%',marginTop:'2%'}}>
                    
                    <div style={{width:'90%',background:'#fff',padding:10, display:'flex',flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                    
                    <img src={`${serverURL}/images/${item.picture}`} style={{width:'30%'}} />
                    
                    <div style={{display:'flex',justifyContent:'left',flexDirection:'column',width:'80%',marginLeft:'5%'}}>
                    <div style={{color:'#000',fontWeight:600,fontSize:'1.3vw'}}>{item.brandname} {item.productname} {item.modelno}</div>
                    <div style={{display:'flex',flexDirection:'row',marginTop:'8%'}}>
                    <div style={{color:'#000',fontWeight:600,fontSize:'1.3vw',textDecoration: 'line-through'}}>&#8377;{item.price}</div>
                    <div style={{color:'#000',fontWeight:400,fontSize:'1vw'}}>&#8377;{item.offerprice}</div>
                    </div>
                    <Rating
                        style={{marginTop:'5%'}}
                        name="simple-controlled"
                        value={item.rating}
                        
                    />
                    </div>
                    
                    </div>
                    <Divider style={{width:'90%',background:'white'}} />
                </div>
            )
        })
    }


    return (<div className={classes.cart_root}>
        <Header/>
 
        <Grid container spacing={2}>

            <Grid item xs={8} style={{display:'flex',justifyContent:'center'}}>
            <div style={{width:'95%'}}>
            <div style={{marginTop:'3%',marginBottom:'4%',}}>
            <div style={{fontSize:20,fontWeight:700,color:'#000'}}><span>YOUR CART</span></div>
            </div>
            <div style={{ display:'flex',alignItems:'center', background:'#fff', width:'92.5%',height:'10%'}}>
                <div style={{fontSize:20,fontWeight:700,color:'#000',padding:'5%'}}>Apply Coupon</div>
            </div>
                {showProuduct()}
            </div>
            </Grid>

            <Grid item xs={4} style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
                
            <div style={{background:'#fff',width:'90%',height:'20%',padding:5}}>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:5}}>
                    <div style={{fontSize:20,fontWeight:700,color:'#000'}}><span>Delivery options for 474005</span></div>
                    <div style={{fontSize:15,fontWeight:300,color:'green'}}><u>change</u></div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',padding:5}}>
                    <div style={{fontSize:15,fontWeight:600,color:'#000'}}>Express Delivery by today</div>
                    <div style={{fontSize:15,fontWeight:400,color:'#000'}}>order within 2 days</div>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:5}}>
                    <div style={{fontSize:18,fontWeight:600,color:'#000'}}>Standard Delivery by Tue, 21 Nov</div>
                    </div>
                </div>

                <div style={{background:'#f8a5c2',padding:5,display:'flex',flexDirection:'column',width:'90%',height:'7%',marginTop:'5%',justifyContent:'center',alignItems:'center'}}>
                    <div style={{color:'red'}}>One or more products in your cart are not available for delivery mode selected.</div>
                </div>


                <div style={{background:'#fff',width:'90%',height:'27%',padding:5,marginTop:'5%'}}>
                    <div style={{fontSize:20,fontWeight:700,color:'#000'}}><span>Order Summary (2 Items)</span></div>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:5}}>
                    <div style={{fontSize:15,fontWeight:300,color:'#000'}}>Orignal Price</div>
                    <div style={{fontSize:15,fontWeight:300,color:'#000'}}>&#8377; 12,970.00</div>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:5}}>
                    <div style={{fontSize:15,fontWeight:300,color:'#000'}}>Delivery</div>
                    <div style={{fontSize:15,fontWeight:300,color:'#000'}}>&#8377; 60</div>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:5}}>
                    <div style={{fontSize:15,fontWeight:300,color:'#000'}}>Total</div>
                    <div style={{fontSize:15,fontWeight:300,color:'#000'}}>&#8377; 12,970.00</div>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',padding:5}}>
                    <Button style={{background:'#7bed9f'}} variant="contained" fullWidth>Checkout</Button>
                    </div>
                </div>


            </Grid>
        </Grid>
 
    </div>)
}