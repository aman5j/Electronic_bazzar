import AddComponent from "../components/AddComponent";
import CircleComponent from "../components/CircleComponent";
import FestiveDealsCompoent from "../components/FestiveDealsComponent";
import Header from "../components/Header";
import MainSlider from "../components/MainSlider";
import ProductComponent from "../components/ProductComponent";
import { useStyles } from "./ProjectCss";
import { getData, postData } from "../../../services/FetchNodeServices";
import { useEffect, useState } from "react";
import MenuComponent from "../components/MenuComponent";
import HighlightsCompoent from "../components/HighlightsComponent";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BrandsComponent from "../components/BrandsComponent";


export default function Home()
{
    const classes = useStyles();
    const [banners, setBanners] = useState([])
    const [categories, setCategories] = useState([])
    const [productDeals, setProductDeals] = useState([])
    const [brands, setBrands] = useState([])
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    

    const fetchBanners=async()=>{
        var result = await getData('userinterface/fetch_all_banners')
        setBanners((result.data[0].files).split(','))
    }
    
    const fetchCategories=async()=>{
        var result = await getData('userinterface/display_all_category')
        setCategories(result.data)
    }

    const fetchDeals=async()=>{
        var result = await postData('userinterface/display_all_products_by_status',{status:'Deal of the day'})
        setProductDeals(result.data)
    }

    const fetchBrands=async()=>{
        var result = await getData('userinterface/display_all_brands')
        setBrands(result.data)
    }

    useEffect(function(){
        fetchBanners()
        fetchCategories()
        fetchDeals()
        fetchBrands()
    },[])

    return(<div className={classes.home_root}>
        <Header/>
        {matches?<></>:<MenuComponent/>}
        <div style={{display:'flex', justifyContent:'center'}}>
        <MainSlider banners={banners} />
        </div>
        <div style={{display:'flex', justifyContent:'center', width:'100%', marginTop:5}}>
        <AddComponent/>
        </div>
        <div style={{display:'flex', justifyContent:'center', width:'100%', marginTop:20}}>
        <CircleComponent categories={categories} />
        </div>        
        <div style={{color:'#fff',fontSize:25,fontWeight:'bold',marginLeft:'10%',marginTop:20}}>Festive Fiesta Deals</div>
        <div style={{display:'flex', justifyContent:'center', width:'100%', marginTop:20}}>
        <FestiveDealsCompoent/>
        </div>
        <div style={{display:'flex', justifyContent:'center', width:'100%', marginTop:20}}>
        <ProductComponent data={productDeals} title={'Deals of the Day'} />
        </div>
        <div style={{display:'flex', justifyContent:'center', width:'100%', marginTop:20}}>
        <HighlightsCompoent title={'Highlights'} />
        </div>
        <div style={{display:'flex', justifyContent:'center', width:'100%', marginTop:20}}>
        <BrandsComponent brands={brands} title={'Top Brands'} />
        </div>

    </div>)
}
