import categoryicon from '../assets/category.png'
import MaterialTable from "@material-table/core"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useState } from 'react';
import { getData,postData, serverURL } from '../services/FetchNodeServices';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid, TextField, Avatar, FormControl, InputLabel, Select, MenuItem, FormLabel, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Swal from 'sweetalert2';
import Heading from './projectComponent/Heading';
import {DropzoneArea} from 'material-ui-dropzone'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


var useStyles = makeStyles({
    reportroot: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    reportbox: {
        width: 999,
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

export default function DisplayAllProductDetails()
{   var classes = useStyles()
    var navigate = useNavigate()
    const [productDetailsList,setProductDetailsList]=useState([])
    const [open,setOpen]=useState(false)
    const [openPicture,setOpenPicture]=useState(false)
    const [productDetailsId,setProductDetailsId]=useState('')

    ////////////////////ProductDetails Actions /////////////////////////////

    const [categoryId, setCategoryId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [productId,setProductId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState([])
    const [modelNo, setModelNo] = useState('')
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [stock, setStock] = useState('')
    const [status, setStatus] = useState('')
    const [hsnCode, setHsnCode] = useState('')
    const [picture, setPicture] = useState({ filename: '', bytes: '' })
    const [errors, setErrors] = useState({})
    const [files, setFiles] = useState([])


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
        if (productId.length === 0) {
            handleError('pls enter product', 'productId')
            error = true
        }
        if (modelNo.length === 0) {
            handleError('pls enter modelno', 'modelNo')
            error = true
        }
        if (description.length === 0) {
            handleError('pls enter description', 'description')
            error = true
        }
        if (color.length === 0) {
            handleError('pls enter color', 'color')
            error = true
        }
        if (price.length === 0) {
            handleError('pls enter price', 'price')
            error = true
        }
        if (offerPrice.length === 0) {
            handleError('pls enter offerprice', 'offerPrice')
            error = true
        }
        if (stock.length === 0) {
            handleError('pls enter stock', 'stock')
            error = true
        }
        if (status.length === 0) {
            handleError('pls enter status', 'status')
            error = true
        }
        if (hsnCode.length === 0) {
            handleError('pls enter hsn code', 'hsnCode')
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
            var body = {
            'categoryid': categoryId,
            'brandid': brandId,
            'productid': productId,
            'modelno': modelNo,
            'description': description,
            'color': color,
            'price': price,
            'offerprice': offerPrice,
            'stock': stock,
            'status': status,
            'hsncode': hsnCode,
            'productdetailsid': productDetailsId,
            }
            var response = await postData('productdetails/edit_productdetails', body)
            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product',
                    text: response.message,
                    toast: true
                })
                fetchAllProductDetails()
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
              var response = await postData('productdetails/delete_productdetails',{'productdetailsid':rowData.productdetailsid})
              if(response.status)
              {
              Swal.fire(
                'Deleted!',
                'Productdetails has been deleted.',
                'success'
              )
              fetchAllProductDetails()
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
        setBrandId('')
        setProductId('')
        setModelNo('')
        setDescription('')
        setColor('')
        setPrice('')
        setOfferPrice('')
        setStock('')
        setStatus('')
        setHsnCode('')
        setPicture({filename:'',bytes:''})
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

    const fetchProductsByCategoryAndBrands=async(bid,cid=categoryId)=>{
        // var cat_id = (!cid)?categoryId:cid
        var result = await postData('products/fetch_products_by_category_and_brand',{'categoryid':cid,'brandid':bid})
        setProductList(result.data)
    }

    const fillProducts=()=>{
        return productList.map((item)=>{
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }
    

    useEffect(function () {
        fetchAllCategory()
    }, [])

    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchBrandsByCategory(event.target.value)
    }

    const handleBrandChange=(event)=>{
        setBrandId(event.target.value)
        fetchProductsByCategoryAndBrands(event.target.value)
    }

    const handleQuill = (newValue) => {
        setDescription(newValue)
        
    }

    const handlePicture = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    const productDetailsForm=()=>{
        return (<div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={3}>
                    
                <Grid item xs={12}>
                    <Heading image={categoryicon} caption="Edit Product Details" link=''/>
                </Grid>
            
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                onFocus={() => handleError(null, 'categoryId')}
                                error={errors.categoryId}
                                label="Category"
                                value={categoryId}
                                onChange={handleCategoryChange} 
                            >
                                {fillCategory()}
                            </Select>
                            <div style={{ color: '#d32f2f', fontSize: 12, marginLeft: 10, marginTop: 6 }}>{errors.categoryId}</div>
                        </FormControl>
                    </Grid>
    
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Brand</InputLabel>
                            <Select
                                onFocus={() => handleError(null, 'brandId')}
                                error={errors.brandId}
                                label="Brand"
                                value={brandId}
                                onChange={handleBrandChange}
                            >
                                {fillBrands()}
                            </Select>
                            <div style={{ color: '#d32f2f', fontSize: 12, marginLeft: 10, marginTop: 6 }}>{errors.categoryId}</div>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Product</InputLabel>
                            <Select
                                onFocus={() => handleError(null, 'productId')}
                                error={errors.productId}
                                label="Product"
                                value={productId}
                                onChange={(event)=>setProductId(event.target.value)}
                            >
                                {fillProducts()}
                            </Select>
                            <div style={{ color: '#d32f2f', fontSize: 12, marginLeft: 10, marginTop: 6 }}>{errors.categoryId}</div>
                        </FormControl>
                    </Grid>
    
                    <Grid item xs={4}>
                        <TextField
                            onFocus={()=>handleError(null,'modelNo')}
                            error={errors.modelNo}
                            helperText={errors.modelNo}
                            value={modelNo}
                            label="Model No"
                            fullWidth onChange={(event) => setModelNo(event.target.value)}
                        />
                    </Grid>
    
                    <Grid item xs={4}>
                        <TextField
                            onFocus={()=>handleError(null,'color')}
                            error={errors.color}
                            helperText={errors.color}
                            value={color}
                            label="Color"
                            fullWidth onChange={(event) => setColor(event.target.value)}
                        />
                    </Grid>
                    
                    <Grid item xs={4}>
                        <TextField
                            onFocus={()=>handleError(null,'stock')}
                            error={errors.stock}
                            helperText={errors.stock}
                            value={stock}
                            label="Stock"
                            fullWidth onChange={(event) => setStock(event.target.value)}
                        />
                    </Grid>
    
                    <Grid item xs={6}>
                        <TextField
                            onFocus={()=>handleError(null,'price')}
                            error={errors.price}
                            helperText={errors.price}
                            value={price}
                            label="Price"
                            fullWidth onChange={(event) => setPrice(event.target.value)}
                        />
                    </Grid>
    
                    <Grid item xs={6}>
                        <TextField
                            onFocus={()=>handleError(null,'offerPrice')}
                            error={errors.offerPrice}
                            helperText={errors.offerPrice}
                            value={offerPrice}
                            label="Offer Price"
                            fullWidth onChange={(event) => setOfferPrice(event.target.value)}
                        />
                    </Grid>
    
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <FormLabel>Status</FormLabel>
                            <RadioGroup row>
                                <FormControlLabel checked={status === "continue"} onChange={(event)=>setStatus(event.target.value)} value={"continue"} control={<Radio/>} label="Continue"/>
                                <FormControlLabel checked={status === "discontinue"} onChange={(event)=>setStatus(event.target.value)} value={"discontinue"} control={<Radio/>} label="Discontinue"/>
                            </RadioGroup>
                        </FormControl>
                        <div style={{ color: '#d32f2f', fontSize: 12, marginLeft: 10, marginTop: 6 }}>{errors.status}</div>
                    </Grid>
                    
                    <Grid item xs={6}>
                        <TextField
                            onFocus={()=>handleError(null,'hsnCode')}
                            error={errors.hsnCode}
                            helperText={errors.hsnCode}
                            value={hsnCode}
                            label="Hsn Code"
                            fullWidth onChange={(event) => setHsnCode(event.target.value)}
                        />
                    </Grid>
    
                    
                    <Grid item xs={12}>
                            <ReactQuill theme="snow" value={description} onChange={handleQuill} />
                            <div style={{ color: '#d32f2f', fontSize: 12, marginLeft: 10, marginTop: 6 }}>{errors.description}</div>
                    </Grid>
    
                </Grid>
            </div>
    
        </div>)
    }


    ////////////////////////////////////////////////////////////////////

    const fetchAllProductDetails=async()=>{
        var result = await getData('productdetails/fetch_productdetails')
        setProductDetailsList(result.data)
    }

    useEffect(function(){
        fetchAllProductDetails()
    },[])

    const handleClosePicture=()=>{
        setOpenPicture(false)
    }

    
    const showPictureDialog=()=>{
        return(
            <Dialog open={openPicture}
                maxWidth={'md'}
                onClose={handleClose}
            >
                {/* <DialogTitle>Update Product</DialogTitle> */}
                <DialogContent>
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText={"Drag and drop an image here or click"}
                        onChange={(files) => setFiles(files)}
                        filesLimit={7}
                        initialFiles={files}
                        
                    />
                     
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Edit</Button>
                    <Button onClick={handleClosePicture} autoFocus>Close</Button>
                </DialogActions>
            </Dialog>
        )
    }



    const handleClose=()=>{
        setOpen(false)
    }

    const showProductDetailsDialog=()=>{
        return(
            <Dialog open={open}
                maxWidth={'md'}
                onClose={handleClose}
            >
                {/* <DialogTitle>Update Product</DialogTitle> */}
                <DialogContent>
                    {productDetailsForm()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Edit</Button>
                    <Button onClick={handleClose} autoFocus>Close</Button>
                </DialogActions>
            </Dialog>
        )
    }

    const handleOpenPicture=(rowData)=>{
        setProductDetailsId(rowData.productdetailsid)
        var pictures = rowData.picture.split(',').map((item)=>{
            return `${serverURL}/images/${item}`
        })
        console.log('pictures .......',pictures)
        setFiles(pictures)
        setOpenPicture(true)
    }


    const handleOpen=(rowData)=>{
        console.log("RowData: ",rowData)
        fetchBrandsByCategory(rowData.categoryid)
        fetchProductsByCategoryAndBrands(rowData.brandid,rowData.categoryid)
        setProductDetailsId(rowData.productdetailsid)
        setCategoryId(rowData.categoryid)
        setBrandId(rowData.brandid)
        setProductId(rowData.productid)
        setModelNo(rowData.modelno)
        setDescription(rowData.description)
        setColor(rowData.color)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setStock(rowData.stock)
        setStatus(rowData.status)
        setHsnCode(rowData.hsncode)
        
        
        setOpen(true)
    }

    function DisplayProductDetails() {
        return (
          <MaterialTable
            title={<div style={{display:'flex',flex:'row'}}>
                <div>
                    <img src={categoryicon} width={25} />
                </div>
                <div style={{fontSize:18,fontFamily:'dosis',fontWeight:'bold',marginLeft:5}}>
                    ProductDetails List
                </div>
            </div>}
            columns={[
              { title: 'productdetailsid', field: 'productdetailsid' },
              { title: 'Category', render: (rowData)=> <>{rowData.categoryid}/{rowData.categoryname}</> },
              { title: 'Brand', render: (rowData)=> <>{rowData.brandid}/{rowData.brandname}</> },
              { title: 'Product', render: (rowData)=> <>{rowData.productid}/{rowData.productname}</> },
              { title: 'modelno/color', render: (rowData)=> <>{rowData.modelno}/{rowData.color}</> },
              { title: 'Price', render: (rowData)=> <><s>{rowData.price}</s>/{rowData.offerprice}</> },
              
            ]}
            data={productDetailsList}        
            actions={[
                {
                    icon: 'photooutlined',
                    tooltip: 'Edit Picture',
                    onClick: (event, rowData) => handleOpenPicture(rowData)
                  },
                
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
                    onClick: (event, rowData) => navigate('/dashboard/productdetails')
                  },
            ]}
          />
        )
      }


    return(<div className={classes.reportroot}>
        <div className={classes.reportbox}>
            {DisplayProductDetails()}
            {showProductDetailsDialog()}
            {showPictureDialog()}
        </div>
    </div>)
}
