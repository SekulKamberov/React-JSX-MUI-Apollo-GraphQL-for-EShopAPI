import { useLocation, useNavigate, Link } from 'react-router-dom' 

import { format } from 'date-fns'

import { Grid, Typography, Card, Box, Button } from '@mui/material' 
import { createTheme, ThemeProvider } from '@mui/material/styles'  

import { DeleteStoreDialog } from '../components/Store/DeleteStoreDialog' 
import { EditStoreDialog } from '../components/Store/EditStoreDialog'  
import { CreateProductDialog } from '../components/Product/CreateProductDialog'
import { CreateCategoryDialog } from '../components/Category/CreateCategoryDialog'


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
    const navigate = useNavigate()
    
    return(
        <> 
            <Grid container item xs={12} sm={12} md={12} lg={9}   
                alignItems="center"
                justifyContent="center"  
                display="flex" 
                direction="row"   
            >
                <ThemeProvider theme={theme}> 
                    <Box>
                        <EditStoreDialog item={store} />
                    </Box>
                    <Box ml={1}>
                        <DeleteStoreDialog item={store} />
                    </Box> 
                    <Box ml={1}>
                        <CreateProductDialog store={store} />
                    </Box>
                    <Box ml={1}>
                        <CreateCategoryDialog />
                    </Box>
                </ThemeProvider>
            </Grid>

            <Grid container item xs={12} sm={12} md={12} lg={12} mt={7}  
                display="flex"
                direction="row"
                alignItems="center"
                justifyContent="center"   
            >
                <Card style={{ boxShadow: "none", height: 350, color: "#281157" }} 
                    onClick={() => navigate('/home/store', { state: {store: store} })}
                > 
                    <Typography sx={{ border: "none", fontSize: 15, marginLeft: 0.5 }}>
                        STORE ID:
                    </Typography>

                    <Typography sx={{ border: "none", fontSize: 15, marginLeft: 0.5, marginBottom: -0.5 }}>
                        {store.id}
                    </Typography>

                    <Typography sx={{border: "none", fontSize: 32, fontWeight: 800 }}>
                        {store.name.toUpperCase()}
                    </Typography>

                    <Typography sx={{ border: "none", fontSize: 12, fontWeight: 500, marginLeft: 0.5 }}>
                        {format(new Date(store.createdAt), "dd/MM/yyyy")}
                    </Typography>
                </Card>
            </Grid>
        </>
    )
}
