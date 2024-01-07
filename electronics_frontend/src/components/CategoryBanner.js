import {DropzoneArea} from 'material-ui-dropzone'
import { makeStyles } from '@mui/styles'
import Heading from './projectComponent/Heading'
import categoryicon from '../assets/category.png'
import { Button, Grid, Paper, MenuItem,InputLabel,Select,FormControl } from '@mui/material'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
    
import { getData,postData } from '../services/FetchNodeServices'
var useStyles = makeStyles({
    root: {
        width: '100%',
        height: '99vh',
        display: 'flex',
        justifyContent: 'center',
    },
    box: {
        width: '700px',
        height: '450px',
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

export default function CategoryBanner()
{   var classes = useStyles()
    const [files,setFiles]=useState([])
    const [categoryId, setCategoryId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])
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
        if (files.length === 0) {
            handleError('pls upload picture', 'picture')
            error = true
        }
        return error
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

    const handleBrandChange=(event)=>{
        setBrandId(event.target.value)
    }



    
    const handleSubmit=async()=>{
        var formData = new FormData()
        formData.append('categoryid',categoryId)
        formData.append('brandid',brandId)
        files.map((file,index)=>{
            formData.append('picture'+index, file)
        })
        
        var result = await postData('categorybanner/submit_categorybanners',formData)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Product',
                text: result.message,
                toast: true
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Product',
                text: result.message,
                toast: true
            })
        }
    }

    return(<div className={classes.root}>
        <Paper elevation={3} className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Heading image={categoryicon} caption="CategoryBanner" link="" />
                </Grid>

                <Grid item xs={6}>
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

                <Grid item xs={6}>
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
          

                <Grid item xs={12}>
                  <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText={"Drag and drop an image here or click"}
                    onChange={(files) => setFiles(files)}
                    filesLimit={7}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleSubmit} variant='contained' fullWidth>Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant='contained' fullWidth>Reset</Button>
                </Grid>
            </Grid>
        </Paper>

    </div>)
}