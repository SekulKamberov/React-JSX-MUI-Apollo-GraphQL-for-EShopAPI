import React, { useState } from 'react' 

import { useMutation } from '@apollo/client'
import { ADD_CATEGORY } from '../../gql/mutations/category'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent' 
import DialogTitle from '@mui/material/DialogTitle'

//import useForm from '../../utils/useForm'

import { Grid, Box, Typography, Button, TextField } from '@mui/material' 
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
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
    name: '' 
}

export function CreateCategoryDialog() {
    const [open, setOpen] = useState(false)
    const [values, setValues] = useState(initialValues)

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

    const [submit, { error, data }] = useMutation(ADD_CATEGORY, { 
        variables: { name: values.name},
        onCompleted:  () => {
            setOpen(false)
            window.location.reload(false)
        }
    })

    return (
        <> 
            <ThemeProvider theme={theme}>
                <Box>
                    <Button color="CatColor" variant="outlined" startIcon={<AddTwoToneIcon sx={{ fontSize: 40, fontWeight: 800 }} color="#281157"/>}
                        style={{ borderRadius: '9px', fontSize: 12, marginBottom: 8, maxWidth: "115px", 
                                maxHeight: "39px", minWidth: "109px", minHeight: "37px" }} 
                        onClick={handleClickOpen}
                    > 
                        Category
                    </Button>
                </Box>
            </ThemeProvider>

            <Dialog open={open} onClose={handleClose} sx={{"& .MuiDialog-paper": { borderRadius: "15px" }}}>
                <DialogTitle> </DialogTitle>

                <DialogContent>
                    <Typography variant="h4" sx={{color:" #281157", marginBottom: "12px", fontWeight: "500"}}>
                        New Category 
                    </Typography>  
                    <form onSubmit={submit}> 
                        <Grid container item xs={12} sm={12} md={12} lg={12} mt={5}  
                            display="flex"
                            direction="row"
                            alignItems="center"
                            justifyContent="center"   
                        >
                            <Grid container item xs={10.5} sm={10.5} md={10.5} lg={10.5} mb={2}    
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
