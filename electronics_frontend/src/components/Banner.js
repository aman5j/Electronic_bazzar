import {DropzoneArea} from 'material-ui-dropzone'
import { makeStyles } from '@mui/styles'
import Heading from './projectComponent/Heading'
import categoryicon from '../assets/category.png'
import { Button, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Form } from 'react-router-dom'
import { postData } from '../services/FetchNodeServices'
var useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    box: {
        width: '700px',
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

export default function Banner()
{   var classes = useStyles()
    const [files,setFiles]=useState([])

   
    const handleSubmit=async()=>{
        var formData = new FormData()
        files.map((file,index)=>{
            formData.append('picture'+index, file)
        })
        
        var result = await postData('banner/submit_banners',formData)
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
        <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Heading image={categoryicon} caption="Add Banner" link="" />
                </Grid>
                <Grid item xs={12}>
                  <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText={"Drag and drop an image here or click"}
                    onChange={(files) => setFiles(files)}
                    filesLimit={8}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleSubmit} variant='contained' fullWidth>Submit</Button>
                </Grid>
             </Grid>
        </div>

    </div>)
}