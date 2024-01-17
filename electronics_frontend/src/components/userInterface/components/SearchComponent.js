import { TextField,InputAdornment } from "@mui/material";
import Search from '@mui/icons-material/Search'
import { useState } from "react";
import { postData } from "../../../services/FetchNodeServices";
import { useNavigate } from "react-router-dom";

export default function SearchComponent(props)
{
    var navigate = useNavigate()
    const [text,setText]=useState('')

    const fetchRecord=async()=>{
        var result = await postData('userinterface/product_filter',{text})
        return result.data 

    }

    const handleSearch=()=>{
        fetchRecord().then((response)=>{
        
            navigate('/productfilterscreen',{state:{result:response}})
        })
    }

    return(<div style={{display:'flex',background:'#fff',width:'70%',height:40,paddingLeft:10,paddingRight:10,borderRadius:3,alignItems:'center'}}>
        
        <TextField
            hiddenLabel
            placeholder="What you are looking for?"  
            variant="standard"
            size="small"
            fullWidth
            onChange={(e)=>setText(e.target.value)}
            
            InputProps={{
                disableUnderline: true,
                endAdornment: (
                <InputAdornment position="end">
                    <Search style={{cursor:'pointer'}} onClick={handleSearch} />
                </InputAdornment>
                ),
            }}
            />
    </div>)


}