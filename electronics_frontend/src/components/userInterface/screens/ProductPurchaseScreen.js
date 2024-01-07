import ProductVerticalImageSlider from "../components/ProductVerticalImageSlider"
import { useStyles } from "./ProjectCss"
import Header from "../components/Header"
import ProductDescription from "../components/ProductDescription"
import BuyNow from "../components/BuyNow"
import { useMediaQuery } from "@mui/material"
import { useState, useEffect } from "react"
import Specification from "../components/Specification"
import { useLocation } from "react-router-dom"

function ProductPurchaseScreen(props) {
    var location=useLocation()
    console.log("data:",location)
    var p=location.state.product
    
    const classes = useStyles()
    const matches = useMediaQuery('(max-width:800px)')
    const matches_sm = useMediaQuery('(max-width:400px)')
    const [down, setDown] = useState(false)
    const [product, setProduct] = useState(p)
    const [refresh, setRefresh] = useState(false)


    const listenToScroll = () => {
        const height = 20;
        const divElement = document.getElementById('scrolldiv');
        const scrollPosition = divElement.scrollTop;
        if (scrollPosition > 20) {
            setDown(true)
        }
        else {
            setDown(false)
        }
    }

    useEffect(() => {
        const scrollableDiv = document.getElementById('scrolldiv');
        scrollableDiv.addEventListener('scroll', listenToScroll);
        return () => {
            scrollableDiv.removeEventListener('scroll', listenToScroll);
        };
    }, [])
    return (
        <div className={classes.ProductPurchaseScreen_Root} id="scrolldiv">
            <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                <Header />
            </div>

            <div className={classes.ProductScreen_Main_Box} style={{ flexDirection: matches ? 'column' : 'row' }}>
                <div className={classes.ProductPurchaseScreen_Left_Box} style={{ width: matches ? '100%' : '50%' }}>
                    <div style={{ width: '100%', display: matches ? 'flex' : '', justifyContent: matches ? 'center' : '' }}>
                        <ProductVerticalImageSlider setProduct={setProduct} product={product} />
                    </div>
                </div>

                <div className={classes.ProductPurchaseScreen_Right_Box} style={{ width: matches ? '100%' : '50%', display: matches ? 'flex' : '', justifyContent: matches ? 'center' : '' }}>
                    <ProductDescription setRefresh={setRefresh} refresh={refresh} setProduct={setProduct} product={product} />
                </div>
            </div>

            <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'3%'}}>
                <Specification />
            </div>

            {down ? <div style={{ width: '100%', position: 'sticky', bottom: 0 }}>
                <BuyNow />
            </div> : <></>
            }

        </div>
    )
}

export default ProductPurchaseScreen