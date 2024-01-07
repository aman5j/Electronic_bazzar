import MaterialTable from "@material-table/core";
import categoryicon from '../assets/category.png'
import { getData, serverURL,postData } from "../services/FetchNodeServices";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import FolderIcon from '@mui/icons-material/Folder';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


import { Grid, TextField, Avatar, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Swal from 'sweetalert2';
import Heading from "./projectComponent/Heading";


import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { makeStyles } from "@mui/styles";
var useStyles = makeStyles({
    reportroot: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    reportbox: {
        width: 900,
        height: 'auto',
        background: '#f1f2f6',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center'
      }
})

export default function DisplayAllBrands()
{   var classes = useStyles()
    var navigate = useNavigate()
    const [tempFile,setTempFile]=useState('')
    const [cameraStatus,setCameraStatus]=useState(false)
    const [brandId,setBrandId]=useState('')
    const [brand,setBrand]=useState([])
    const [statusBtn,setStatusBtn]=useState(false)
    const [open,setOpen]=useState(false)

    const fetchAllBrand=async()=>{  
        var result = await getData('brands/fetch_brands')
        setBrand(result.data)
    }

    useEffect(function(){
        fetchAllBrand()
        fetchAllCategory()
    },[])


    ////////////// Brand Form Actions /////////////////////

    const [categoryId, setCategoryId] = useState('')
    const [category, setCategory] = useState([])
    const [brandName, setBrandName] = useState('')
    const [logo, setLogo] = useState({ filename: '', bytes: '' })
    const [errors, setErrors] = useState({})

    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        var error = false
        console.log("Errors", errors)
        if (categoryId.length === 0) {
            handleError('Pls Choose Category...', 'categoryId')
            error = true
        }
        if (brandName.length === 0) {
            handleError('Pls Enter Brand Name', 'brandName')
            error = true
        }
        if (logo.filename.length === 0) {
            handleError('Pls Upload Logo', 'logo')
            error = true
        }
        return error
    }


    const handleSubmit = async () => {
        var errors = validation()
        if (errors === false) {
            var body = {
            'categoryid': categoryId,
            'brandname': brandName,
            'brandid': brandId
            }
            var response = await postData('brands/edit_brand', body)
            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Category',
                    text: response.message,
                    toast: true
                })
                fetchAllBrand()
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Category',
                    text: response.message,
                    toast: true
                })
            }
        }
    }

    const handleDelete=async(rowData)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
              var response = await postData('brands/delete_brand',{'brandid':rowData.brandid})
              if(response.status)
              {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              fetchAllBrand()
              }
              else 
              {
                Swal.fire(
                    'Deleted!',
                    'Fail to delete Brand',
                    'error'
                  ) 
              }
            }
          })
    }
    
    const fetchAllCategory = async () => {
        var result = await getData('category/display_all_category')
        setCategory(result.data)
    }

    const fillCategory = () => {
        var categoryList = category.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
        return categoryList
    }

    useEffect(function () {
        fetchAllCategory()
    }, [])

    const handleLogo = (event) => {
        setLogo({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setStatusBtn(true)
    }

    const handleCancel=()=>{
        setStatusBtn(false)
        setLogo({filename:tempFile,bytes:''})
    }

    const handleSave=async()=>{
        setStatusBtn(false)
        var formData = new FormData()
        formData.append('logo',logo.bytes)
        formData.append('brandid',brandId)
        var result = await postData('brands/edit_brand_logo',formData)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Category',
                text: result.message,
                toast: true
            })
            fetchAllBrand()
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Category',
                text: result.message,
                toast: true
            })
        }
    }

    const SaveCancelBtn=()=>{
        return(<div>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </div>)
    }


    const brandForm=()=>{
        return (<div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h2 style={{color:'black', margin:0}}>Brand: <font style={{ color: '#004cef' }}>{brandName}</font></h2>
                    </Grid>
    
                    <Grid item xs={12} className={classes.center}>
                        {statusBtn?<SaveCancelBtn/>:<></>}
                        <Button 
                            onMouseEnter={()=>setCameraStatus(true)}
                            onMouseLeave={()=>setCameraStatus(false)}
                            component="label"
                            onFocus={()=>handleError(null,'logo')}
                            errors={errors.logo}
                            style={{position:'relative'}} 
                        >
                        { cameraStatus?
                            <div className={classes.center} 
                                style={{
                                    width:40,
                                    height:40,
                                    borderRadius:13,
                                    background:'white',
                                    position:'absolute',
                                    zIndex:2,
                                    right:0,
                                    bottom:0}}
                            >
                                <CameraAltIcon style={{color:'black'}}/>
                            </div>
                            :<></>}
                            <input onChange={handleLogo} hidden type="file" accept="images/*"/>
                            <Avatar src={logo.filename} style={{width:80,height:80}}>
                                <FolderIcon style={{width:40,height:40}}/>
                            </Avatar>
                            
                        </Button>
                        <div className={classes.center} style={{color:'#d32f2f',fontSize:12,marginLeft:10,marginTop:6}}>{errors.logo}</div>
                    </Grid>
    
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Category Id</InputLabel>
                            <Select
                                onFocus={() => handleError(null, 'categoryId')}
                                error={errors.categoryId}
                                label="Category Id"
                                value={categoryId}
                                onChange={(event) => setCategoryId(event.target.value)}
                            >
                                {fillCategory()}
                            </Select>
                            <div style={{ color: '#d32f2f', fontSize: 12, marginLeft: 10, marginTop: 6 }}>{errors.categoryId}</div>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onFocus={()=>handleError(null,'brandName')}
                            error={errors.brandName}
                            helperText={errors.brandName}
                            value={brandName}
                            label="Brand Name"
                            fullWidth onChange={(event) => setBrandName(event.target.value)}
                        />
                    </Grid>
    
           
    
                </Grid>
            </div>
    
        </div>)
    }

    ////////////////////////////////////////////////////////

    const handleClose=()=>{
        setOpen(false)
    }

    const showBrandDialog=()=>{
        return(
            <Dialog open={open}>
                <DialogTitle>Update Brand</DialogTitle>
                <DialogContent>
                    {brandForm()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Edit</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        )
    }

    const handleOpen=(rowData)=>{
        setBrandId(rowData.brandid)
        setCategoryId(rowData.categoryid)
        setBrandName(rowData.brandname)
        setLogo({filename:`${serverURL}/images/${rowData.logo}`,bytes:''})
        setTempFile(`${serverURL}/images/${rowData.logo}`)
        setOpen(true)
    }

    

    function displayBrands() {
        return (
          <MaterialTable
            title={<div style={{display:'flex',flexDirection:'row'}}>
                <div>
                    <img alt="category icon" src={categoryicon} width={25} />
                </div>
                <div style={{fontFamily:'dosis',fontSize:18,fontWeight:'bold',marginLeft:5}}>
                    Brand List
                </div>

            </div>}
            columns={[
              { title: 'Brand Id', field: 'brandid' },
              { title: 'Category', render: (rowData)=> <>{rowData.categoryid}/{rowData.categoryname}</> },
              { title: 'Brand Name', field: 'brandname' },
              { title: 'Logo', render: (rowData) => <><img src={`${serverURL}/images/${rowData.logo}`} width={40} /></> },  
             
            ]}
            data={brand}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Brand',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Brand',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Brand',
                isFreeAction: true,
                onClick: (event, rowData) => navigate('/dashboard/brands')
              }
            ]}
          />
        )
      }

    return(<div className={classes.reportroot}>
        <div className={classes.reportbox}>
            {displayBrands()}
            {showBrandDialog()}
        </div>
    </div>)
}

