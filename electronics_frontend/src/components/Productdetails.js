import { useState, useEffect } from "react"
import { useMemo, } from "react";
import { Grid, Button, TextField, Avatar, FormControl, InputLabel, Select, MenuItem, FormLabel, Radio, RadioGroup, FormControlLabel } from "@mui/material";

import { getData, postData } from '../services/FetchNodeServices';
import Swal from 'sweetalert2';
import Heading from "./projectComponent/Heading";
import categoryicon from '../assets/category.png'
import {DropzoneArea} from 'material-ui-dropzone'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { makeStyles } from "@mui/styles";
var classess = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    box: {
        width: '80%',
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
    }
})

export default function ProductDetails() {
    const classes = classess()
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

    const handleQuill = (newValue) => {
        setDescription(newValue)
        
    }

    

    const modules = useMemo(() => ({
        toolbar: {
          container: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', "strike"],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['image', "link", 'video'],
            [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
          ],
         
        },
      }), [])


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
        if (files.length === 0) {
            handleError('pls upload picture', 'picture')
            error = true
        }
        return error
    }


    const handleSubmit = async () => {
        var errors = validation()
        if (errors === false) {
            var formData = new FormData()
            formData.append('categoryid', categoryId)
            formData.append('brandid', brandId)
            formData.append('productid', productId)
            formData.append('modelno', modelNo)
            formData.append('description', description)
            formData.append('color', color)
            formData.append('price', price)
            formData.append('offerprice', offerPrice)
            formData.append('stock', stock)
            formData.append('status', status)
            formData.append('hsncode', hsnCode)
            files.map((file,index)=>{
                formData.append('picture'+index, file)
            })
            var response = await postData('productdetails/submit_productdetails', formData)
            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product',
                    text: response.message,
                    toast: true
                })
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

    const fetchProductsByCategoryAndBrands=async(bid)=>{
        var result = await postData('products/fetch_products_by_category_and_brand',{'categoryid':categoryId,'brandid':bid})
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

    

    const handlePicture = (event) => {
        // setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })

    }

    return (<div className={classes.root}>
        <div className={classes.box}>
            
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Heading image={categoryicon} caption="Product Details" link='/dashboard/displayallproductdetails'/>
                </Grid>
            

            <Grid item xs={7}>
                <Grid container spacing={2}>
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
                        <InputLabel>Status</InputLabel>
                        <Select
                            label="Status"
                            value={status}
                            onChange={(event)=>setStatus(event.target.value)} 
                        >
                            <MenuItem value={'Offer'}>Offer</MenuItem>
                            <MenuItem value={'Deal of the day'}>Deal of the day</MenuItem>
                            <MenuItem value={'Festive Deals'}>Festive Deals</MenuItem>
                            <MenuItem value={'Sale'}>Sale</MenuItem>
                            <MenuItem value={'Trending'}>Trending</MenuItem>
                            <MenuItem value={'New Arrival'}>New Arrival</MenuItem>
                            <MenuItem value={'Discontinue'}>Discontinue</MenuItem>
                        </Select>
                        <div style={{ color: '#d32f2f', fontSize: 12, marginLeft: 10, marginTop: 6 }}>{errors.categoryId}</div>
                    </FormControl>
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
                        <ReactQuill modules={modules} theme="snow" value={description} onChange={handleQuill} />
                        <div style={{ color: '#d32f2f', fontSize: 12, marginLeft: 10, marginTop: 6 }}>{errors.description}</div>
                </Grid>


                <Grid item xs={6}>
                    <Button onClick={handleSubmit} fullWidth variant="contained" style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Add</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleReset} fullWidth variant="contained" style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Reset</Button>
                </Grid>

                </Grid>
            </Grid>

            <Grid item xs={5}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <div >
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText={"Drag and drop an image here or click"}
                        onChange={(files) => setFiles(files)}
                        filesLimit={7}
                        />
                        
                        </div>
        
                        <div className={classes.center} style={{color:'#d32f2f',fontSize:12,marginLeft:10,marginTop:6}}>{errors.picture}</div>
                    </Grid>

                </Grid>

            </Grid>


                
            

            </Grid>
        </div>

    </div>)
}