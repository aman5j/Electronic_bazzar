import { useState, useEffect } from "react"
import { Grid, Button, TextField, Avatar, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { getData, postData } from '../services/FetchNodeServices';
import Swal from 'sweetalert2';
import Heading from "./projectComponent/Heading";
import categoryicon from '../assets/category.png'
import FolderIcon from '@mui/icons-material/Folder';

import { makeStyles } from "@mui/styles";
var classess = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    box: {
        width: '500px',
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

export default function Products() {
    const classes = classess()
    const [categoryId, setCategoryId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [productName, setProductName] = useState('')
    const [picture, setPicture] = useState({ filename: '', bytes: '' })
    const [errors, setErrors] = useState({})

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
            var formData = new FormData()
            formData.append('categoryid', categoryId)
            formData.append('brandid', brandId)
            formData.append('productname', productName)
            formData.append('picture', picture.bytes)
            var response = await postData('products/submit_product', formData)
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
    }

    return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Heading image={categoryicon} caption="New Product" link='/dashboard/displayallproducts'/>
                </Grid>

                <Grid item xs={12}>
                    <Button 
                        style={{display:'flex',flexDirection:'column'}} component="label" fullWidth
                        onFocus={()=>handleError(null,'logo')}
                        errors={errors.picture}
                    >
                        <input onChange={handlePicture} hidden type="file" accept="images/*"/>
                        <Avatar src={picture.filename} style={{width:80,height:80}}>
                            <FolderIcon style={{width:40,height:40}}/>
                        </Avatar>
                        Choose Product Picture
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

                <Grid item xs={6}>
                    <Button onClick={handleSubmit} fullWidth variant="contained" style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Add</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleReset} fullWidth variant="contained" style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Reset</Button>
                </Grid>


            </Grid>
        </div>

    </div>)
}