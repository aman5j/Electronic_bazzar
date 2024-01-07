import Header from "../components/Header";
import { useStyles } from "./ProjectCss";
import { Grid } from "@mui/material";
import { getData, postData,serverURL } from "../../../services/FetchNodeServices";
import { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Rating,Checkbox } from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';




export default function CompareProducts()
{
    const classes = useStyles();

      var data = [
        {id:1,picture:'ac1.webp',brandname:"LG",productname:'Solo Microwave', modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:2},
        {id:2,picture:'ac2.webp',brandname:"LG",productname:'Solo Microwave', modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:3},
        {id:3,picture:'ac3.webp',brandname:"LG",productname:'Solo Microwave', modelno:'20L 44 Auto Cook',price:20000,offerprice:10000,rating:5},
    ]
    

    const showProuduct=()=>{
        return data.map((item)=>{
            return (
                <div style={{width:'100%'}}>
                    
                    <div style={{color:'#fff',marginLeft:'auto',padding:10,display:'flex',justifyContent:'right'}}>
                        <Checkbox icon={<FavoriteBorder style={{color:'#fff'}} />} checkedIcon={<Favorite style={{color:'#fff'}} />} />
                    </div>

                    <div style={{width:'90%',background:'#191919',padding:10, display:'flex',flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                    
                    <img src={`${serverURL}/images/${item.picture}`} style={{width:'30%'}} />
                    
                    <div style={{display:'flex',justifyContent:'left',flexDirection:'column',width:'80%',marginLeft:'5%'}}>
                    <div style={{color:'#fff',fontWeight:600,fontSize:'1.3vw'}}>{item.brandname} {item.productname} {item.modelno}</div>
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
                    <Divider style={{width:'100%',background:'white'}} />
                </div>
            )
        })
    }

    const listItems=[
        {
            icon : '',
            title : 'Category',
            link : '',
            options : ['south indian', 'north indian', 'chinees', 'bavarages']
        },
        {
            icon: '',
            title: 'Price',
            link: '',
            options : [10000, 20000, 30000, 40000]
        },
        {
            icon: '',
            title: 'Brands',
            link: '',
            options : ['samsung', 'croma', 'hp', 'apple']
        },
        {
            icon: '',
            title: 'Discount',
            link: '',
            options : ['10% to 20%', '20% to 30%', '30% to 40%', '40% to 60%']
        }
    ]

    return(<div className={classes.home_root}>
        <Header/>
        <div style={{background:'#191919',width:'100%',height:'100%',marginTop:'2%'}}>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <div style={{ height:'100%', borderRight: "0.5px solid white" }}>
            {listItems.map((item)=>{
            return (
            <div style={{ width:'60%', marginTop:'5%', marginLeft:'20%', background:'#191919'}}>
            <Accordion style={{background:'#191919'}}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{color:'#ffffff'}}
                >
                <Typography style={{fontWeight:200, color:'#fff'}}>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{color:'#fff'}}>
                <Typography>
                    {item.options.map((item)=>{
                        return (
                            <FormGroup>
                            <FormControlLabel control={<Checkbox style={{fontWeight:50,color:'#f1f2f6'}}/>} label={item}  />
                          </FormGroup>

                        )
                    })}
                </Typography>
                </AccordionDetails>
            </Accordion>
            </div>
            )})}
            
                
            </div>
            </Grid>
            <Grid item xs={9}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#fff'}}>{'Best Deals on ACs'}</div>
                    <Grid item xs={12}>
                        <div style={{width:'80%'}}>
                        {showProuduct()}
                        </div>
                    </Grid>
                
            </Grid>
        </Grid>
        </div>
    
    </div>)
}
