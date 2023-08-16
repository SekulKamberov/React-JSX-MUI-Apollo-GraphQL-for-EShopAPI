import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom' 

import { useQuery } from '@apollo/client'
import { AuthContext } from '../AuthContext'
import { addproductOnSessionStorage } from '../utils/session'
 
import { BsCurrencyEuro } from 'react-icons/bs'  

import { format } from 'date-fns'

import { Grid, Typography, Box, Button } from '@mui/material'  
import { createTheme, ThemeProvider } from '@mui/material/styles'  

import { DeleteStoreDialog } from '../components/Store/DeleteStoreDialog' 
import { EditStoreDialog } from '../components/Store/EditStoreDialog'  
import { CreateProductDialog } from '../components/Product/CreateProductDialog'
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

export const Store = () => {
    const { state } = useLocation() 
    const store = state.store  
    const storeId = state.store.id
    const { userData } = useContext(AuthContext) 
    const navigate = useNavigate()
    const uuid = userData.uuid
    const storeUserId = store.userId  

    const {loading, errorCategories, data} = useQuery(GET_CATEGORIES)
    console.log('Store CATEGORIES', data) 

    const handleClickAdd = (product, uuid, storeId) => {
        let obj = {}
        obj = product 
        obj.userId = uuid 
        obj.storeId = storeId
        obj.cartQuantity = 1 
        addproductOnSessionStorage(obj) 
    }

    return(
        <> 
            {storeUserId === uuid && 
                <Grid container item xs={12} sm={12} md={12} lg={9}   
                    alignItems="center"
                    justifyContent="center"  
                    display="flex" 
                    direction="row"   
                >
                    <ThemeProvider theme={theme}> 
                        <Box>
                            <EditStoreDialog item={store} categories={data?.categories} />
                        </Box>
                        <Box ml={1}>
                            <DeleteStoreDialog item={store}/>
                        </Box> 
                        <Box ml={1}>
                            <CreateProductDialog categories={data?.categories} storeId={storeId} />
                        </Box> 
                        <Box ml={1}>
                            <CreateCategoryDialog />
                        </Box>
                    </ThemeProvider>
                </Grid>
            }
            <Grid container item xs={10} sm={10} md={7} lg={12} mt={7}  
                display="flex"
                direction="row"
                alignItems="center"
                justifyContent="center"   
            >
                <Grid item style={{  color: "#281157" }}> 
                    <Typography sx={{ fontSize: 23 }}>
                       <b style={{ fontWeight: 800 }}>ID:</b> {store.id}
                    </Typography>  
                    <Typography sx={{ fontSize: 52, fontWeight: 800 }}>
                        {store.name.toUpperCase()} 
                        <span style={{ marginLeft: "9px", fontSize: 21, fontWeight: 400, color: "#281157" }}>store</span>
                    </Typography> 
                    <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                        {format(new Date(store.createdAt), "dd/MM/yyyy")}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container item xs={9} sm={12} md={12} lg={12} mt={8} mb={1}   
                display="flex"
                direction="row"
                alignItems="center"
                justifyContent="center"   
            >
                <Typography p={1.2} sx={{ fontWeight: 800, fontSize: 31, lineHeight: "0.8", 
                    backgroundColor: "#281157", color: "#ffff" }}>
                    All {store.name.toUpperCase()} Products
                </Typography>
            </Grid>

            <Grid container item xs={10} sm={10} md={11} lg={12}   
                display="flex"
                direction="row"
                alignItems="center"
                justifyContent="center"   
            >    
                {store && store.products.map((product, idx) => (   
                    <Grid container item xs={10} sm={7} md={5} lg={3.3} mt={6} mb={6} key={idx}  
                        display="flex"
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"  
                        sx={{ height: "350px", color: "#281157" }}
                        onClick={uuid === storeUserId ? () => navigate(`/home/product`, 
                            { state: {product: product, categories: data.categories, storeId: storeId, userId: storeUserId } }) : undefined}
                    >     
                        <Typography sx={{ fontSize: 21, fontWeight: 800, width: "250px" }}>
                            {product.price} <BsCurrencyEuro/>
                        </Typography> 
                        {storeUserId !== uuid && 
                            <ThemeProvider theme={theme}> 
                                <Box mb={-0.2}>
                                    <Button variant="outlined" color="CatColor" onClick={() => handleClickAdd(product, uuid, storeId)}
                                        style={{ borderRadius: '7px', fontSize: "10px", maxWidth: "47px", maxHeight: "30px", 
                                            fontWeight: "600", minWidth: "46px", minHeight: "29px" }}  
                                    > 
                                        Add 
                                    </Button>
                                </Box>
                            </ThemeProvider>
                        }
                        <Typography sx={{ fontSize: 17, fontWeight: 800, width: "300px" }}>
                            {product.name}
                        </Typography>  
                            
                        <Typography sx={{ fontSize: 12, width: "300px"}}>
                            <b>ID: </b> {product.id.toUpperCase()}
                        </Typography>
                         
                        <img src={product.avatarUrl}
                            style={{paddingTop: "7px",  borderRadius: 12, align: "flex-start", width: "300px", height: "170px" }} /> 

                        <Typography pt={1} sx={{ fontSize: 12, fontWeight: 500, width: "310px", height: "100px" }}>
                            {product.description}
                        </Typography>

                        <Typography sx={{fontSize: 12, fontWeight: 500, marginTop: "12px", width: "300px" }}>
                            <b>Warranty:</b> {product.warranty} months
                        </Typography> 

                        <Typography sx={{fontSize: 12, fontWeight: 500 }}>
                            {product.createdAt ? format(new Date(product.createdAt), "dd/MM/yyyy") : ""}
                        </Typography>
                    </Grid> 
                ))} 
            </Grid>
        </>
    )
}
