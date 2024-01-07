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

export default function Brands() {
    const classes = classess()
    const [logoStatus,setLogoStatus]=useState(true)
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
            handleError('pls choose category', 'categoryId')
            error = true
        }
        if (brandName.length === 0) {
            handleError('pls enter brand name', 'brandName')
            error = true
        }
        if (logo.filename.length === 0) {
            handleError('pls upload logo', 'logo')
            error = true
        }
        return error
    }


    const handleSubmit = async () => {
        var errors = validation()
        if (errors === false) {
            var formData = new FormData()
            formData.append('categoryid', categoryId)
            formData.append('brandname', brandName)
            formData.append('logo', logo.bytes)
            var response = await postData('brands/submit_brand', formData)
            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Category',
                    text: response.message,
                    toast: true
                })
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

    const handleReset = () => {
        setCategoryId('')
        setBrandName('')
        setLogo('')
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
        setLogoStatus(false)
    }

    return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Heading image={categoryicon} caption="New Brand" link='/dashboard/displayallbrands'/>
                </Grid>

                <Grid item xs={12}>
                    <Button 
                        style={{display:'flex',flexDirection:'column'}} component="label" fullWidth
                        onFocus={()=>handleError(null,'logo')}
                        errors={errors.logo}
                    >
                        <input onChange={handleLogo} hidden type="file" accept="images/*"/>
                        <Avatar src={logo.filename} style={{width:80,height:80}}>
                            <FolderIcon style={{width:40,height:40}}/>
                        </Avatar>
                        {logoStatus?<div>Choose Brand Logo</div>:<></>}
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