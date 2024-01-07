import { Button } from "@mui/material"
import { useState,useEffect } from "react"
import { postData,serverURL,getData } from "../../../services/FetchNodeServices"
import { PropaneSharp } from "@mui/icons-material"

export default function ProductColorDetails(props)
{   
    var product=props.product
    const [selectedId,setSelectedId]=useState(product.productdetailsid)
    const [details,setDetails]=useState([])
    
    const fetchDetails=async(id)=>{
        var result = await postData('userinterface/display_productdetails_by_id',{productdetailsid:id})
        props.setProduct(result.data[0])
        setSelectedId(result.data[0].productdetailsid)
        props.setRefresh(!props.refresh)
    }
    
    const handleChangeProduct=(id)=>{
        fetchDetails(id)
    }

    const fetchProductDetails=async()=>{
        var result=await postData('userinterface/fetch_productdetails_by_productid',{productid:product.productid})
        // console.log("DETAILS",result.data)
        setDetails(result.data) 
    }
    
    useEffect(function(){
        fetchProductDetails()
        
    },[])
    
    

    const showDetails=()=>{
        return details.map((item)=>{
          return  (
          
          <div onClick={()=>handleChangeProduct(item?.productdetailsid)} style={{ color: '#fff', fontSize: '12px', marginTop: '3%' }}>
          <Button style={{ color: '#fff', borderColor: selectedId==item.productdetailsid?'#12daa8':'gray', fontSize: 12, padding: '8px 10px 8px', fontWeight: 'bold', textTransform: 'none' }} size='small' variant='outlined'>{item.color}</Button>
         
          </div>
          
      )

        })
     }

    return(
    <>
    {showDetails()}
    </>
    )
}
