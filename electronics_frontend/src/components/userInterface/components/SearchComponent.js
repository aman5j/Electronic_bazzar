import { TextField,InputAdornment } from "@mui/material";
import Search from '@mui/icons-material/Search'
export default function SearchComponent(props)
{
    return(<div style={{display:'flex',background:'#fff',width:'70%',height:40,paddingLeft:10,paddingRight:10,borderRadius:3,alignItems:'center'}}>
        
        <TextField
            hiddenLabel
            placeholder="What you are looking for?"  
            variant="standard"
            size="small"
            fullWidth
            
            InputProps={{
                disableUnderline: true,
                endAdornment: (
                <InputAdornment position="end">
                    <Search />
                </InputAdornment>
                ),
            }}
            />
    </div>)


}