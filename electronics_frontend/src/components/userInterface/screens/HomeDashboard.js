import {AppBar,Box,Toolbar,Typography,Button, Grid, TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import kid from '../../../assets/kid.avif'
import restauranticon from '../../../assets/restauranticon.jpg'

export default function HomeDashboard()
{
    const listItems=[
        {
            icon : <StorefrontIcon/>,
            title : 'Restaurant',
            link : ''
        },
        {
            icon: <DynamicFeedIcon/>,
            title: 'DisplayAll Restaurants',
            link: ''
        },
        {
            icon: <LogoutIcon/>,
            title: 'Logout',
            link: ''
        }
    ]
    return(<div>
    <Box sx={{ flexGrow: 1 }}>
      
      <Grid container spacing={0.5}>
        
        <Grid item xs={2} style={{ marginTop: '0.1%' }}>
            <div style={{width:'100%',height:'99vh',background:'#f5f6fa',display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'30%', flexDirection:'column'}}>
                    <img src={kid} width={100} style={{borderRadius:'60%'}}/>
                    <span style={{fontSize:18,fontWeight:'bold'}}>{"Aman Prajapati"}</span>
                </div>
            <List style={{width:'100%', maxWidth: 360 }} component={"nav"}>
            {listItems.map((item)=>{
            return(
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText style={{opacity:'80%'}}>{item.title}</ListItemText>
                </ListItemButton>
            </ListItem>
            )})}
            </List>
            </div>

        </Grid>

        <Grid item xs={10} style={{height:'100vh',background:'white'}}>
            <Grid item spacing={2}>
                <Grid item xs={12}>
                <AppBar position="static" style={{background:'#fff'}}>
                    <Toolbar>
                        <div style={{display:'flex',justifyContent:'right',width:100}}>
                            <img src={restauranticon} width={50} />
                        </div>
                    
                    </Toolbar>
                </AppBar>
                </Grid>

                <Grid item xs={12} style={{marginTop:'1%'}}>
                    <TextField placeholder='Enter alskdj;flajsdfklasxd'/>
                </Grid>

            </Grid>
          
        </Grid>
      </Grid>
    </Box>

    </div>)
}