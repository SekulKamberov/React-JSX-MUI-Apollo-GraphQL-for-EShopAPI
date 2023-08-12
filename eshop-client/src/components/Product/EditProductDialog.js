import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
 
import { EDIT_PRODUCT } from '../../gql/mutations/products'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import useForm from '../../utils/useForm'
import { Grid, Box, Typography, TextField, Button, TextareaAutosize, Select, MenuItem } from '@mui/material' 

import { createTheme, ThemeProvider } from '@mui/material/styles' 
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
 
export function EditProductDialog(props) {
    const { product, categories } = props  
    const [ open, setOpen ] = useState(false) 
    const { values, setValues } = useForm({})

    const handleClickOpen = () => {
        setOpen(true)
    }
  
    const handleClose = () => {
        setOpen(false)
    } 

    const handleInputChange = e => {
        e.preventDefault() 
        const { name, value } = e.target   
        setValues({ ...values, [name]: value  }) 
    }

    const handleInputMUIHasBug = e => { 
            e.preventDefault()
            const { name, value } = e.target 
            setValues({ ...values, [name]: parseInt(value) }) 
    }
 
    const [submit, { error, data }] = useMutation(EDIT_PRODUCT, { 
        variables: { id: product.id, name: product.name, warranty: product.warranty, 
            description: product.description, avatarUrl: product.avatarUrl, price: product.price, 
            categoryId: product.categoryId , storeId: product.storeId },
        onCompleted:  () => {
            setOpen(false)
            window.location.reload(false)
        }
    })

  return (
    <>
    <ThemeProvider theme={theme}>
        <Box>
            <Button color="CatColor" variant="outlined" onClick={handleClickOpen}
                style={{ borderRadius: '9px',  border: "1px solid #281157", fontWeight: 600, fontSize: 12, maxWidth: "71px", maxHeight: "39px", 
                minWidth: "70px", minHeight: "37px", marginBottom: 8 }}>Edit  
            </Button>
        </Box>
    </ThemeProvider>

    <Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-paper": { borderRadius: "15px" } }}> 
        <DialogTitle> </DialogTitle>
        <DialogContent>  
            <Grid container item xs={12} sm={12} md={12} lg={12}   
                sx={{  height: '100%' }}
                //maxWidth= "100%"
                direction="row"
                alignItems="center"
                justifyContent="center"    
                display="flex"  
            > 
                <DialogContentText> 
                    <Typography variant="h4" sx={{color:" #281157", marginBottom: "12px", fontWeight: "800"}}>
                        Edit  
                    </Typography> 
                </DialogContentText> 

                <form onSubmit={submit} >  
                    <Grid container item xs={12} sm={12} md={12} lg={12} mt={5}  
                        display="flex"
                        direction="row"
                        alignItems="center"
                        justifyContent="center"   
                    >    
                        <Grid container item xs={8.4} sm={5.5} md={5.5} lg={5.8} mb={2}    
                            display="flex"
                            direction="column"   
                        >  
                            <TextField   
                                type="text" 
                                variant="outlined"
                                placeholder='Name'
                                name="name"
                                label="Name"
                                value={product.name}
                                InputProps={{ style: { fontSize: 12, borderRadius: 9  } }}
                                onChange={handleInputChange} 
                            />  
                        </Grid>

                        <Grid container item xs={8.4} sm={5.5} md={5.5} lg={5.8} mb={2} ml={2}
                            display="flex"
                            direction="column"   
                        >   
                            <Select
                                cacheOptions
                                defaultOptions
                                name="categoryId"
                                value={product.categoryId}
                                getOptionLabel={e => e.name} 
                                onChange={handleInputMUIHasBug}
                            >
                                {categories && categories?.map((c, idx) => (
                                    <MenuItem 
                                        key={idx} 
                                        value={c.id}
                                        //style={getStyles(name, personName, theme)}
                                    >
                                        {c.name}
                                    </MenuItem> 
                                ))}
                            </Select>          
                        </Grid> 

                        <Grid container item xs={8.4} sm={5.5} md={5.5} lg={5.8} mb={2} mt={2}  
                            display="flex"
                            direction="column"
                        >
                            <TextField   
                                type="text" 
                                variant="outlined"
                                placeholder='Price'
                                name="price"
                                label="Price"
                                value={product.price}
                                InputProps={{ style: { fontSize: 12, borderRadius: 9  } }}
                                onChange={handleInputChange} 
                            />   
                        </Grid>

                        <Grid container item xs={8.4} sm={5.5} md={5.5} lg={5.8} mb={2} mt={2} ml={2} 
                            display="flex"
                            direction="column"
                        >
                            <TextField   
                                type="text" 
                                variant="outlined"
                                placeholder='Warranty'
                                name="warranty"
                                label="Warranty"
                                value={product.warranty}
                                InputProps={{ style: { fontSize: 12, borderRadius: 9  } }}
                                onChange={handleInputChange} 
                            />   
                        </Grid> 
                            
                        <Grid container item xs={12} sm={12} md={12} lg={12} mb={2} mt={2} 
                            display="flex"
                            direction="column"   
                        >  
                            <TextField   
                                fullWidth
                                type="text" 
                                variant="outlined"
                                placeholder='Avatar Url'
                                name="avatarUrl"
                                label="Avatar Url"
                                value={product.avatarUrl}
                                InputProps={{ style: { fontSize: 12, borderRadius: 9  } }}
                                onChange={handleInputChange} 
                            />  
                        </Grid>   

                        <Grid container item mt={2}
                            display="flex"
                            direction="column"
                        >  
                            <TextareaAutosize     
                                InputProps={{ sx: {height:"200px", fontSize: 12 } }}  
                                minRows={12}
                                maxRows={10}
                                maxLength={1000} 
                                type="text" 
                                name="description"
                                value={product.description} 
                                onChange={handleInputChange}  
                            />  
                        </Grid>  
                    </Grid>  
                </form>
            </Grid>
        </DialogContent>

        <DialogActions>  
            <Grid container item xs={12} sm={12} md={6} lg={12} mb={3}
                alignItems="center"
                justifyContent="center"
                display="flex"
                direction="row"   
            > 
                <ThemeProvider theme={theme}>
                    <Box>
                        <Button type="submit" color="CatColor" size="medium" variant="outlined" 
                            sx={{ borderRadius: '9px', height: "43px" }} onClick={submit}>
                            SUBMIT
                        </Button>
                    </Box>   

                    <Box ml={2}>
                        <Button color="CatColor" size="medium" variant="outlined" 
                            sx={{ borderRadius: '9px', height: "43px" }} onClick={handleClose}
                        >
                        CANCEL
                        </Button>
                    </Box>  
                </ThemeProvider>  
            </Grid>
        </DialogActions>
    </Dialog>
    </>
  )
} 
