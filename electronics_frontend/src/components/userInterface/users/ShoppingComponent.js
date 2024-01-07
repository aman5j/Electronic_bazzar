
import { TextField ,MenuItem, Divider} from "@mui/material";
import Search2 from "./Search2";
import { postData,serverURL } from '../../../services/FetchNodeServices'
import Swal from "sweetalert2";
import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { useDispatch } from "react-redux";

export default function ShoppingComponent(props)
{    var dispatch = useDispatch()
    const [title,setTitle]=useState('')
    const [firstName,setFirstName]=useState('')
    const [middleName,setMiddleName]=useState('')
    const [lastName,setlastName]=useState('')
    const [mobileNumber,setMobileNumber]=useState(props.mobileno)
    const [email,setEmail]=useState('')
    const [pincode,setPincode]=useState('')
    const [address1,setAddress1]=useState('')
    const [address2,setAddress2]=useState('')
    const [state,setState]=useState('')
    const [city,setCity]=useState('')
    const [errors,setErrors]=useState({})
    const handleError=(error,label)=>{
      setErrors((prev)=>({...prev,[label]:error}))
    }
    
   const validation=()=>{
    var error=false
    if(title.length==0)
    {
      error=true
      handleError('pls input Title','title')
    }
    if(firstName.length==0)
    {
      error=true
      handleError('pls input Name','firstName')
    }
    if(mobileNumber.length==0)
    {
      error=true
      handleError('pls input no.','mobileNumber')
    }
    if(address1.length==0)
    {
      error=true
      handleError('pls input Address','address1')
    }
    if(city.length==0)
    {
      error=true 
      handleError('pls input city','city')
    }
    if(state.length==0)
    {
      error=true 
      handleError('pls input state','state')
    }
    if(email.length==0)
    {
      error=true
      handleError('pls input Email','email')
    }
    return error
   }

    const handleSubmit=async()=>{
        var error=validation()
        if(error==false)
        {
       var body={title:title,username:`${firstName} ${middleName} ${lastName}`,mobileno:mobileNumber,emailid:email,address:`${address1} ${address2} ${city} ${state}`,pincode:pincode}
       var response= await postData('useraccount/submit_useraccount',body)
      if(response.status)
      {
        Swal.fire({
          icon: 'success',
          title: 'Payment',
          text: response.message,
          toast:true
        })
        dispatch({type:"ADD_USER",payload:[mobileNumber,body]})
        localStorage.setItem("User",JSON.stringify(body))
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          toast:true
        })
      }
        }
      }
    return(<div style={{height:'100%',color:'#000'}}>
        <div style={{fontSize:15,display:'flex',justifyContent:'center'}}>
       <div style={{marginTop:'2%'}}> Continue Creating Account…</div>
        </div>
        <div style={{fontSize:17,marginTop:'2%',marginLeft:'15%'}}>
       <b>ENTER SHIPPING INFORMATION</b>
        </div>
        <div style={{marginLeft:'15%',marginTop:'2%'}}>
        <div style={{width:'85%',height:'auto',borderRadius:5,background:'#fff',padding:15}}>
            <div style={{fontSize:13,padding:4}}>
               <b> Contact information</b>
            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
          <div>
         <div  style={{fontSize:13,padding:4}}>
               Title
            </div>
            <div>
             <TextField  error={errors.title}  onFocus={()=>handleError('','title')} helperText={errors.title} value={title} onChange={(event)=>setTitle(event.target.value)} size="small"  style={{background:'#f1f2f6',width:'36ch',borderRadius:'3%'}}/>       
         </div>
         </div>
         <div style={{marginLeft:'5%'}}>
            <div  style={{fontSize:13,padding:4}} >
             First Name
            </div>
             <TextField error={errors.firstName}  onFocus={()=>handleError('','firstName')} helperText={errors.firstName}  size="small" value={firstName} onChange={(event)=>setFirstName(event.target.value)} style={{background:'#f1f2f6',width:'36ch',borderRadius:'3%'}}/>       
         </div>
         </div>
        
        
         <div style={{display:'flex',flexDirection:'row',marginTop:'3%'}}>
         <div>
         <div  style={{fontSize:13,padding:4}}>
               Middle Name
            </div>
             <TextField size="small" value={middleName} onChange={(event)=>setMiddleName(event.target.value)} style={{background:'#f1f2f6',width:'36ch',borderRadius:'3%'}}/>       
         </div>
         <div style={{marginLeft:'5%'}}>
            <div  style={{fontSize:13,padding:4}} >
             Last Name
            </div>
             <TextField size="small" value={lastName} onChange={(event)=>setlastName(event.target.value)} style={{background:'#f1f2f6',width:'36ch',borderRadius:'3%'}}/>       
         </div>
         </div>

         <div style={{display:'flex',flexDirection:'row',marginTop:'3%'}}>
         <div>
         <div  style={{fontSize:13,padding:4}}>
               Email Id*
            </div>
             <TextField error={errors.email}  onFocus={()=>handleError('','email')} helperText={errors.email}  value={email} onChange={(event)=>setEmail(event.target.value)} size="small"  style={{background:'#f1f2f6',width:'36ch',borderRadius:'3%'}}/>       
         </div>
         <div style={{marginLeft:'5%'}}>
            <div  style={{fontSize:13,padding:4}} >
             Mobile Number*
            </div>
             <TextField value={mobileNumber} error={errors.mobileNumber}  onFocus={()=>handleError('','mobileNumber')} helperText={errors.mobileNumber}  size="small"  onChange={(event)=>setMobileNumber(event.target.value)}  style={{background:'#f1f2f6',width:'36ch',borderRadius:'3%'}}/>       
         </div>
         </div>
         <div style={{marginTop:'5%',fontSize:14}}>
         <b>Enter Shipping Address:</b>
         </div>
         <div style={{marginTop:'4%',fontSize:14}}>
         <div style={{display:'flex',flexDirection:'row'}}>
          <div>
         <div  style={{fontSize:13,padding:4}}>
               Address 1
            </div>
            <div>
             <TextField  error={errors.address1}  onFocus={()=>handleError('','address1')} helperText={errors.address1} value={address1} onChange={(event)=>setAddress1(event.target.value)} size="small"  style={{background:'#f1f2f6',width:'41ch',borderRadius:'3%'}}/>       
         </div>
         </div>
         <div style={{marginLeft:'5%'}}>
            <div  style={{fontSize:13,padding:4}} >
             Address 2
            </div>
             <TextField size="small" onChange={(e)=>setAddress2(e.target.value)}   style={{background:'#f1f2f6',width:'41ch',borderRadius:'3%'}}/>       
         </div>
         </div>   
          <div style={{display:'flex',flexDirection:'row',marginTop:'2%'}}>
          <div>
         <div  style={{fontSize:13,padding:4}}>
              City 
            </div>
            <div>
             <TextField size="small" onFocus={()=>handleError('','city')} error={errors.city} helperText={errors.city} onChange={(e)=>setCity(e.target.value)}  style={{background:'#f1f2f6',width:'26ch',borderRadius:'3%'}}/>       
         </div>
         </div>
         <div style={{marginLeft:'5%'}}>
            <div  style={{fontSize:13,padding:4}} >
             State
            </div>
             <TextField size="small" onFocus={()=>handleError('','state')} error={errors.state} helperText={errors.state} onChange={(e)=>setState(e.target.value)}  style={{background:'#f1f2f6',width:'26ch',borderRadius:'3%'}}/>       
         </div>
         <div style={{marginLeft:'5%'}}>
            <div  style={{fontSize:13,padding:4}} >
             Pincode
            </div>
             <TextField error={errors.pincode}  onFocus={()=>handleError('','pincode')} helperText={errors.pincode}  size="small" value={pincode} onChange={(event)=>setPincode(event.target.value)} style={{background:'#f1f2f6',width:'25.5ch',borderRadius:'3%'}}/>       
         </div>
         </div>
         </div>
         <div style={{color:'brown',fontSize:12,marginTop:'2%'}}>
         <b>Change your location settings in the browser to use current location.</b>
         </div>
        </div>
        <div onClick={handleSubmit} style={{border:'1px solid #12DAA8',cursor:'pointer',width:'87%',borderRadius:6,padding:2,marginTop:'3%',display:'flex',justifyContent:'center',background:'#12DAA8',fontSize:14}}>
                 <div  style={{padding:6}}><b> Process to Payment </b></div>
                </div>
        </div>
     
        <div style={{marginLeft:'15%',marginTop:'2%'}}>
        <div style={{width:'85%',height:'25vh',borderRadius:5,background:'#fff',padding:15}}>
            <div style={{fontSize:14,padding:4}}>
               <b>Billing Adress</b>
            </div>
            <div style={{marginTop:'2%'}}>
              <FormGroup style={{ color: "#000",fontSize:15 }}>
                      <FormControlLabel 
                      control={<Checkbox  style={{ color:"Black"}} />}
                        label="Same as Shipping address" 
                      />
             </FormGroup>
      </div>
      <div style={{fontSize:14,padding:4,marginTop:'2%'}}>
               <b>Search Your location</b>
            </div>
      <div style={{marginTop:'2%',fontSize:14}}>
         <Search2/>
         </div>
      
        </div>


      
        </div>


        

        <div style={{marginLeft:'15%',marginTop:'2%'}}>
        <div style={{width:'85%',height:'23vh',borderRadius:5,background:'#fff',padding:20}}>
        <div style={{display:'flex',flexDirection:'row'}}>
        <div style={{width:'40%'}}>
         <div style={{fontSize:14}}>
         <span style={{color:'#12DAA8',fontSize:20}}>✔</span> <span style={{marginLeft:'2%',fontSize:15}}> <b> Available to Ship @</b></span> 
         </div>
         <div style={{marginTop:'28%',fontSize:22,color:'#000'}}>
         <span><AirportShuttleIcon fontSize="large" style={{marginBottom:'-2%'}}/></span><span style={{marginLeft:'4%'}}><b>Delivery by tomorrow</b></span>
         </div>
         </div>
         <div style={{width:'20%'}}>
         <div style={{width:'70%',marginLeft:'15%'}}>
         <img src={`${serverURL}/images/aaaa.webp`} style={{width:'100%',height:'100%',marginLeft:"6px"}}/>
         </div>         
         </div>
         <div style={{width:'40%',marginTop:'4%'}}>
        <b> Croma Type C to Type C 3.3 Feet (1M) Cable (Nylon Braided, Red)</b>
         </div>
         </div>
        </div>
        </div>
        <div style={{marginTop:'5%'}}>
            <Divider>

            </Divider>
        </div>
        
    </div>)
}