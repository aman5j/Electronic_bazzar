import { useState, useEffect } from "react"
import { Grid, Button, TextField, Avatar, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import { getData, postData, serverURL } from '../services/FetchNodeServices';
import Swal from 'sweetalert2';
import categoryicon from '../assets/category.png'
import FolderIcon from '@mui/icons-material/Folder';
import MaterialTable from "@material-table/core"
import { useNavigate } from "react-router-dom";
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



export default function DisplayAllProducts()
{   var classes=useStyles()
    var navigate = useNavigate()
    const [productId,setProductId]=useState('')
    const [productList,setProductList]=useState([])
    const [open,setOpen]=useState(false)
    const [cameraStatus,setCameraStatus]=useState(false)
    const [statusBtn,setStatusBtn]=useState(false)
    const [tempFile,setTempFile]=useState('')

    const [categoryId, setCategoryId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [productName, setProductName] = useState('')
    const [picture, setPicture] = useState({ filename: '', bytes: '' })
    const [errors, setErrors] = useState({})


    const fetchAllProducts=async()=>{
        var result = await getData('products/fetch_products')
        setProductList(result.data)
    }
    //////////////// Product Form Actions ///////////////////////////////

    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        var error = false
        console.log("Errors", errors)
        if (categoryId.length === 0) {
            handleError('pls choose category', 'categoryId')
            error = true
        }
        if (brandId.length === 0) {
            handleError('pls choose brand', 'brandId')
            error = true
        }
        if (productName.length === 0) {
            handleError('pls enter product name', 'productName')
            error = true
        }
        if (picture.filename.length === 0) {
            handleError('pls upload picture', 'picture')
            error = true
        }
        return error
    }


    const handleSubmit = async () => {
        var errors = validation()
        if (errors === false) {
            var body={
            'categoryid': categoryId,
            'brandid': brandId,
            'productname': productName,
            'productid': productId
            }
            var response = await postData('products/edit_product', body)
            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product',
                    text: response.message,
                    toast: true
                })
                fetchAllProducts()
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Product',
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
              var response = await postData('products/delete_product',{'productid':rowData.productid})
              if(response.status)
              {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              fetchAllProducts()
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
    

    const handleReset = () => {
        setCategoryId('')
        setProductName('')
        setPicture('')
    }

    const fetchAllCategory = async () => {
        var result = await getData('category/display_all_category')
        setCategoryList(result.data)
    }

    const fillCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const fetchBrandsByCategory = async (cid) => {
        var result = await postData('brands/fetch_brands_by_category',{'categoryid':cid})
        setBrandList(result.data)
    }

    const fillBrands = () => {
        return brandList.map((item) => {
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    useEffect(function () {
        fetchAllCategory()
        
    }, [])

    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchBrandsByCategory(event.target.value)
    }

    const handlePicture = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setStatusBtn(true)
    }

    const handleCancel=()=>{
        setStatusBtn(false)
        setPicture({filename:tempFile,bytes:''})
    }

    const handleSave=async()=>{
        setStatusBtn(false)
        var formData = new FormData()
        formData.append('picture',picture.bytes)
        formData.append('productid',productId)
        var result = await postData('products/edit_product_picture',formData)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Category',
                text: result.message,
                toast: true
            })
            fetchAllProducts()
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



    const productForm=()=>{
        return (<div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={3}>
                <Grid item xs={12}>
                        <h2 style={{color:'black', margin:0}}>Product: <font style={{ color: '#004cef' }}>{productName}</font></h2>
                    </Grid>
    
                    <Grid item xs={12} className={classes.center}>
                        {statusBtn?<SaveCancelBtn/>:<></>}
                        <Button 
                            onMouseEnter={()=>setCameraStatus(true)}
                            onMouseLeave={()=>setCameraStatus(false)}
                            style={{position:'relative'}} component="label" 
                            onFocus={()=>handleError(null,'logo')}
                            errors={errors.picture}
                        >
                            {cameraStatus?
                            <div style={{
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                                position:'absolute',
                                zIndex:2,
                                width:40,
                                height:40,
                                borderRadius:13,
                                background:'white',
                                right:0,
                                bottom:0                                
                            }}>
                                <PhotoCameraIcon className={classes.center} style={{color:'black'}}/>
                            </div>
                            :<></>}
                            <input onChange={handlePicture} hidden type="file" accept="images/*"/>
                            <Avatar src={picture.filename} style={{width:80,height:80}}>
                                <FolderIcon style={{width:40,height:40}}/>
                            </Avatar>
                            
                        </Button>
                        <div className={classes.center} style={{color:'#d32f2f',fontSize:12,marginLeft:10,marginTop:6}}>{errors.picture}</div>
                    </Grid>
    
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                onFocus={() => handleError(null, 'categoryId')}
                                error={errors.categoryId}
                                label="Category Id"
                                value={categoryId}
                                onChange={handleCategoryChange} 
                            >
                                {fillCategory()}
                            </Select>
                            <div style={{ color: '#d32f2f', fontSize: 12, marginLeft: 10, marginTop: 6 }}>{errors.categoryId}</div>
                        </FormControl>
                    </Grid>
    
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Brand</InputLabel>
                            <Select
                                onFocus={() => handleError(null, 'brandId')}
                                error={errors.brandId}
                                label="Brand"
                                value={brandId}
                                onChange={(event) => setBrandId(event.target.value)}
                            >
                                {fillBrands()}
                            </Select>
                            <div style={{ color: '#d32f2f', fontSize: 12, marginLeft: 10, marginTop: 6 }}>{errors.categoryId}</div>
                        </FormControl>
                    </Grid>
    
                    <Grid item xs={12}>
                        <TextField
                            onFocus={()=>handleError(null,'productName')}
                            error={errors.productName}
                            helperText={errors.productName}
                            value={productName}
                            label="Product Name"
                            fullWidth onChange={(event) => setProductName(event.target.value)}
                        />
                    </Grid>
    
               
    
                </Grid>
            </div>
    
        </div>)
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    const handleClose=()=>{
        setOpen(false)
    }

    const showProductDialog=()=>{
        return(
            <Dialog open={open}>
                {/* <DialogTitle>Update Product</DialogTitle> */}
                <DialogContent>
                    {productForm()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Edit</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        )
    }


    const handleOpen=(rowData)=>{
        fetchBrandsByCategory(rowData.categoryid)
        setProductId(rowData.productid)
        setCategoryId(rowData.categoryid)
        setBrandId(rowData.brandid)
        setProductName(rowData.productname)
        setPicture({filename:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setTempFile(`${serverURL}/images/${rowData.picture}`)
        setOpen(true)
    }

    useEffect(function(){
        fetchAllProducts()
    },[])

    function displayProducts() {
        return (
          <MaterialTable
            title={
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div>
                        <img src={categoryicon} width={25}/>
                    </div>
                    <div style={{fontFamily:'dosis',fontSize:18,fontWeight:'bold',marginLeft:5}}>
                        Product List
                    </div>
                </div>
            }
            columns={[
              { title: 'Product Id', field: 'productid' },
              { title: 'Category', render: (rowData)=><>{rowData.categoryid}/{rowData.categoryname}</> },
              { title: 'Brand', render: (rowData)=><>{rowData.brandid}/{rowData.brandname}</> },
              { title: 'Product Name', field: 'productname' },
              { title: 'Picture', render: (rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} width={40} /></> },
              
            ]}
            data={productList}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Product',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Product',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Product',
                isFreeAction: true,
                onClick: (event, rowData) => navigate('/dashboard/products')
              },
            ]}
          />
        )
      }
    
    
    return(<div className={classes.reportroot}>
        <div className={classes.reportbox}>
            {displayProducts()}
            {showProductDialog()}
           </div>
    </div>)
}