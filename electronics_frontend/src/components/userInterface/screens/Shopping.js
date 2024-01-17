import Header from "../components/Header";
import { useStyles } from "./ProjectCss";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ShoppingComponent from "../users/ShoppingComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SmallScreenCartComponent from "../components/SmallScreenCartComponent";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLocation } from "react-router-dom";
import DeliveryAddress from "../components/DeliveryAddressComponent";

export default function Cart()
{
    var location = useLocation()
    var mobileno = location?.state?.mobileno
    var status = location?.state?.status
    var userData = location?.state?.user 
    // alert(JSON.stringify(userData))
    
    var navigate=useNavigate()
    var cart=useSelector(state=>state.mycart)
    var productCart=Object.values(cart)

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md')); 

    const showAddress=()=>{
        return(<div>
            <div>{userData[0]?.username}</div>
        </div>)
    }

    const handleShop=()=>{
     navigate('/cart')
    }
    return(<div>
       <div>
        <Header/>
       </div>
       <div style={{width:'100%',background:'#f1f2f6',display:'flex',flexDirection:'row'}}>
       <div style={{width:'80%'}}>
       {status?<DeliveryAddress userData={userData} />:
       <ShoppingComponent mobileno={mobileno} />
       }
       </div>
       <div style={{width:'40%'}}>
       <div ><KeyboardBackspaceIcon onClick={handleShop} fontSize="large" style={{marginLeft:'70%',marginBottom:'-10%',cursor:'pointer'}}/></div>
       <SmallScreenCartComponent title={"Proceed to payment"} productCart={productCart}/>
       </div>
       </div>
     
    </div>)
}