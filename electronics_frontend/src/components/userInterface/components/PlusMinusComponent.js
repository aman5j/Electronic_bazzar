import { Button,Fab } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function PlusMinusComponent(props)
{
    
    const [count, setCount] = useState(0)

    useEffect(function(){
        setCount(props.value)
    },[props])

    const handleAdd=()=>{
        var c=count+1
        setCount(c)

        props.onChange(c)
    }
    const handleMinus=()=>{
        var c=count-1
        if(c>=0)
        {
            setCount(c)
            props.onChange(c)
        }
        
    }

    return (<div>
        {count==0?
        
        <div style={{ width:'100%', display:'flex', }}>
            <Button onClick={handleAdd} style={{ color: '#fff', borderColor: '#353535', borderRadius: 10, background: '#353535', borderColor: '#fff', padding: '6px 40px', textTransform: 'none', fontWeight: 'bold' }} variant="outlined">Add to Cart</Button>
            <Button  style={{  marginLeft: '10px', color: '#191919', borderColor: '#353535', background: '#12daa8', borderRadius: 10, fontWeight: 'bold', padding: '6px 40px 6px 40px', textTransform: 'none' }} variant="outlined">Buy Now</Button>
        </div>
        :
        <div style={{display:'flex', alignItems:'center'}}>
        <div style={{padding:5,width:110,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Fab onClick={handleMinus} size="small" style={{background:'rgb(18, 218, 168)', color:'#000'}} aria-label="add">
        <RemoveIcon fontSize="small" />
        </Fab>
        <div style={{fontSize:20,fontWeight:500,color:props.screen=='cart'?'#000':'#fff'}}>{count}</div>
        <Fab onClick={handleAdd} size="small" style={{background:'rgb(18, 218, 168)', color:'#000'}} aria-label="add">
        <AddIcon fontSize="small" />
        </Fab>
        
        
        </div>
        {props.screen=='cart'?<></>:
         <Button  style={{ height:40, marginLeft: '10px', color: '#191919', borderColor: '#353535', background: '#12daa8', borderRadius: 10, fontWeight: 'bold', textTransform: 'none' }} variant="outlined">Continue Shoping</Button>}

        </div>}
    </div>)
}