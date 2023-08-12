import React, { useState } from 'react' 
import { useNavigate, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client' 

import { ADD_PRODUCT } from '../../gql/mutations/products'
import { GET_CATEGORIES } from '../../gql/queries/categories' 

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

//import useForm from '../../utils/useForm'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import { Grid, Box, Typography, Button, TextField, TextareaAutosize, Select, MenuItem } from '@mui/material' 
import { createTheme, ThemeProvider } from '@mui/material/styles' 
const { palette } = createTheme()
const theme = createTheme({
	palette: { 
		CatColor: palette.augmentColor({
			color: {
				main: "#281157" 
			}
		}), 
	}, 
}) 

const initialValues = {
    name: '',
    warranty: 0,
    description: '',
    avatarUrl: '',
    price: 0,
    categoryId: '',
    storeId: ''
}

export function CreateProductDialog(props) {
    const { categories, storeId } = props
     console.log('CreateProductDialog - storeId', storeId)
    const navigate = useNavigate()
    const { state } = useLocation() 
    //const store = state.store 
    
    const [open, setOpen] = useState(false)
    const [values, setValues] = useState(initialValues)
    //const {loading, errorCategories, data} = useQuery(GET_CATEGORIES)
    //let cat = data?.categories ?? []
    //const [categories, setCategories] = useState(cat)
     

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
        console.log('values', values)
    }

    const handleInputMUIHasBug = e => {
        //if (e.target.value.match(/[^0-9]/)) {
           // e.preventDefault()
           // const { name, value } = e.target 
           // setValues({ ...values, [name]: value  })  
        //}
            e.preventDefault()
            const { name, value } = e.target 
            setValues({ ...values, [name]: parseInt(value) }) 
            console.log('values', values)
    }

    const [submit, { error, product }] = useMutation(ADD_PRODUCT, { 
        variables: { name: values.name,  warranty: values.warranty,  description: values.description, 
            avatarUrl: values.avatarUrl, price: values.price,  categoryId: values.categoryId, storeId: storeId },
        onCompleted:  () => {
            setOpen(false) 
            navigate("/home")
            //window.location.reload(false)

        }
    })

    return (
        <> 
            <ThemeProvider theme={theme}>
                <Box>
                    <Button color="CatColor" variant="outlined" startIcon={<AddTwoToneIcon sx={{ fontSize: 40, fontWeight: 800 }} color="#281157"/>}
                        style={{ borderRadius: '9px', fontSize: 12, marginBottom: 8, maxWidth: "107px", 
                                maxHeight: "39px", minWidth: "106px", minHeight: "37px" }} 
                        onClick={handleClickOpen}
                    > 
                        Product
                    </Button>
                </Box>
            </ThemeProvider>

            <Dialog open={open} onClose={handleClose} sx={{"& .MuiDialog-paper": { borderRadius: "15px" }}}>
                <DialogTitle> </DialogTitle> 
                <DialogContent>
                    <Typography variant="h4" sx={{color:" #281157", marginBottom: "12px", fontWeight: "800"}}>
                        New Product 
                    </Typography>  
                    <Typography variant="h6" sx={{color:" #281157", marginBottom: "12px" }}>
                        storeId: {storeId}
                    </Typography>   
                    <form onSubmit={submit}> 
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
                                    value={values.name} 
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
                                    value={values.categoryId}
                                    getOptionLabel={e => e.name}
                                    //getOptionValue={e => e.id}
                                    //options={cat}
                                    //onInputChange={handleInputChange}
                                    onChange={handleInputChange}
                                >
                                    {categories && categories.length > 0 ? categories?.map((c, idx) => (
                                            <MenuItem 
                                                key={idx} 
                                                value={c.id}
                                                //style={getStyles(name, personName, theme)}
                                            >
                                                {c.name}
                                            </MenuItem> 
                                        ))
                                    :
                                    ""
                                    }
                                </Select> 
                            </Grid>
                             
                            <Grid container item xs={8.4} sm={5.5} md={5.5} lg={5.8} mb={2} mt={2}  
                                display="flex"
                                direction="column"
                            >
                                <TextField  //MUI TextField HAS BUG
                                    type="number" 
                                    //inputProps={{ inputMode: 'numeric' }}
                                    variant="outlined" 
                                    placeholder='Price'
                                    name="price"
                                    label="Price"
                                    value={values.price}
                                    InputProps={{ style: { fontSize: 12, borderRadius: 9 }}}
                                    onChange={handleInputMUIHasBug} 
                                />
                            </Grid>
                            <Grid container item xs={8.4} sm={5.5} md={5.5} lg={5.8} mb={2} mt={2} ml={2}
                                display="flex"
                                direction="column"
                            >
                                <TextField  //MUI TextField HAS BUG
                                    type="number" 
                                    //inputProps={{ inputMode: 'numeric' }}  
                                    variant="outlined"
                                    placeholder='Warranty'
                                    name="warranty"
                                    label="Warranty"
                                    value={values.warranty}
                                    InputProps={{ style: { fontSize: 12, borderRadius: 9  } }}
                                    onChange={handleInputMUIHasBug} 
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
                                    value={values.avatarUrl}
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
                                    OutputProps={{ sx: { borderRadius: 22  } }} 
                                    minRows={12}
                                    maxRows={10}
                                    maxLength={1000}
                                    type="text" 
                                    name="description"
                                    value={values.description} 
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid> 
                    </form> 
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
                                    style={{ borderRadius: '9px', height: "43px" }} 
                                    onClick={submit}
                                > 
                                    SUBMIT
                                </Button>
                            </Box>
                            <Box ml={2}>
                                <Button type="submit" color="CatColor" size="medium" variant="outlined"
                                    style={{ borderRadius: '9px', height: "43px" }} 
                                    onClick={handleClose}
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