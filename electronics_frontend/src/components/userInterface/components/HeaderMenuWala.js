import { AppBar,Box,Toolbar,Badge } from "@mui/material";
import Logo from '../../../assets/croma.gif';
import SearchComponent from "./SearchComponent";
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useState,useEffect } from "react";
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { getData,postData } from "../../../services/FetchNodeServices";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Header(props)
{
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const [categories, setCategories] = useState([])

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const fetchCategories=async()=>{
        var result = await getData('userinterface/display_all_category')
        setCategories(result.data)
    }

    useEffect(function(){
        fetchCategories()
    },[])

    const showMenuItems=()=>{
        return categories.map((item)=>{
            return <MenuItem onClick={handleClose}>{item.categoryname}</MenuItem>
        })
    }
    


    return(
        <div>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{background: 'url(https://media.croma.com/image/upload/v1697816449/Croma%20Assets/CMS/LP%20Page%20Banners/2023/Desktop_-_Navratri_opt.3_glsdyl.jpg)'}}>
                <Toolbar>
                    <div style={{width:300,display:'flex',justifyContent:'right'}}>
                    <img src={Logo} width="150" />
                    </div>
                    { matches?<></>:
                    <div style={{marginLeft:'12%',width:'48%'}}>
                        {<SearchComponent/>}
                    </div>
                    }
                    <div style={{marginLeft:matches?100:0, display:'flex', width:100, justifyContent:'space-between'}}>
                        <AccountCircle style={{fontSize:30}}  />
                        <Badge color="secondary" badgeContent={0} showZero>
                        <ShoppingCart style={{fontSize:30}} />
                        </Badge>
                    </div>
                
                </Toolbar>
            </AppBar>
            </Box>
            <div style={{display:'flex', justifyContent:'center'}}>
                {matches?
                <div style={{width:'100%',margin:'5px 10px 5px 10px', display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                 <MenuIcon 
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    
                    style={{color:'#fff'}}
                 /> 
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                        'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        {showMenuItems()}
                    </Menu>
                 <SearchComponent/> 
                </div>
                :<></>}
            </div>

        </div>
    )
}

/* paste this code in index.html to change the color of menu
 <style>
    .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper {
      background-color: #fff;
      color: rgba(0, 0, 0, 0.87);
      -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: 4px;
      box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
      position: absolute;
      overflow-y: hidden;
      overflow-x: hidden;
      -ms-overflow-style: none !important;   
      scrollbar-width: none !important;
      min-width: 16px;
      min-height: 16px;
      max-width: calc(100% - 32px);
      max-height: calc(100% - 32px);
      outline: 0;
      max-height: calc(100% - 96px);
      -webkit-overflow-scrolling: touch;
     

  }
  .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper::-webkit-scrollbar {
    display: none !important;
}
.css-6hp17o-MuiList-root-MuiMenu-list {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    padding-top: 8px;
    padding-bottom: 8px;
    outline: 0;
    background: #000;
    color: #fff;
}
  </style>
*/