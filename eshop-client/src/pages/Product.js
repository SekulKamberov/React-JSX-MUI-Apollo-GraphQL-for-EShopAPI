import { useContext } from 'react'
import { useLocation } from 'react-router-dom' 

import { AuthContext } from '../AuthContext' 
import { BsCurrencyEuro } from 'react-icons/bs'  

import { format } from 'date-fns'

import { Grid, Typography, Box } from '@mui/material' 
 
import { createTheme, ThemeProvider } from '@mui/material/styles'  

//import { DeleteStoreDialog } from '../components/Store/DeleteStoreDialog' 
//import { EditStoreDialog } from '../components/Store/EditStoreDialog'   

import { CreateProductDialog } from '../components/Product/CreateProductDialog' 
import { EditProductDialog } from '../components/Product/EditProductDialog' 
import { DeleteProductDialog } from '../components/Product/DeleteProductDialog' 
import { DiscountProductDialog } from '../components/Product/DiscountProductDialog' 

import { CreateCategoryDialog } from '../components/Category/CreateCategoryDialog'
import { GET_CATEGORIES } from '../gql/queries/categories' 

const { palette } = createTheme() 
const theme = createTheme({
	palette: { 
		CatColor: palette.augmentColor({
			color: {
				main: "#281157" 
			}
		})
	}
}) 

export const Product = () => { 
    const { state } = useLocation() 
    //const navigate = useNavigate()
    const { userData } = useContext(AuthContext) 
    const categories = state.categories 
    
    const product = state.product  
    const storeId = state.storeId 
    const uuid = userData.uuid 
    const storeUserId = state.userId 
    //console.log('state', state)
 
    return(
        <Grid container item xs={12} sm={12} md={12} lg={9}   
            alignItems="center"
            justifyContent="center"  
            display="flex" 
            direction="row"   
        > 
             {storeUserId === uuid && 
                <Grid container item xs={12} sm={12} md={12} lg={9}   
                    alignItems="center"
                    justifyContent="center"  
                    display="flex" 
                    direction="row"   
                >
                    <ThemeProvider theme={theme}> 
                        <Box>
                            <EditProductDialog product={product} categories={categories}/>
                        </Box> 
                        <Box ml={1}>
                            <DeleteProductDialog item={product} />
                        </Box> 
                        <Box ml={1}>
                            <CreateProductDialog store={product} categories={categories} storeId={storeId}/>
                        </Box>
                        <Box ml={1}>
                            <CreateCategoryDialog />
                        </Box>
                        <Box ml={1}>
                            <DiscountProductDialog item={product} />
                        </Box> 
                    </ThemeProvider>
                </Grid>
            }
            <Grid container item xs={10} sm={10} md={7} lg={12} mt={1}  
                display="flex"
                direction="row"
                alignItems="center"
                justifyContent="center"   
            >
                <Grid container item xs={10} sm={10} md={7} lg={7} mt={5} style={{  color: "#281157" }} >  
                    <Typography sx={{ fontSize: 34, fontWeight: 800, width: "500px" }}>
                        {product.price} <BsCurrencyEuro/>
                    </Typography>
                    <Typography sx={{ fontSize: 39, fontWeight: 800, marginTop: "-10px", width: "500px" }}>
                        {product.name}  
                    </Typography>
                    <Typography sx={{ fontSize: 19 }}>
                       <b style={{ fontWeight: 800, width: "500px" }}>ID:</b> {product.id}
                    </Typography> 
                    <Typography sx={{fontSize: 12, fontWeight: 500, marginTop: "12px", width: "500px" }}>
                        <b>Warranty:</b> {product.warranty} months
                    </Typography> 
                </Grid>
            </Grid> 

            <Grid container item xs={10} sm={10} md={11} lg={12}   
                display="flex"
                direction="row"
                alignItems="center"
                justifyContent="center"   
            >     
                <Grid container item xs={11} sm={6} md={5} lg={7} mt={1} 
                    display="flex"
                    direction="row"
                    alignItems="center"
                    justifyContent="center"  
                    sx={{ color: "#281157" }} 
                >      
                    <img src={product.avatarUrl}
                        style={{paddingTop: "7px",  borderRadius: 12, maxWidth: "100%",
                        height: "auto",
                        padding: "0px",
                        margin: "0px" }} /> 

                    <Typography pt={2} sx={{ fontSize: 12, fontWeight: 500  }}>
                        {product.description}
                    </Typography> 

                    <Typography sx={{fontSize: 12, fontWeight: 500 }}>
                        {product.createdAt ? format(new Date(product.createdAt), "dd/MM/yyyy") : ""}
                    </Typography>
                </Grid>   
            </Grid> 
        </Grid>
    )
}
