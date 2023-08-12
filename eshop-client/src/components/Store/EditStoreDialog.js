import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_STORE } from '../../gql/mutations/stores'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import useForm from '../../utils/useForm'
import { Grid, Box, Typography, TextField, Button, TextareaAutosize } from '@mui/material' 

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
 
export function EditStoreDialog(props) {
    const { item, categories } = props
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
    }
 
    const [submit, { error, data }] = useMutation(EDIT_STORE, { 
        variables: { id: item.id, name: item.name, address: item.address, 
            phoneNumber: item.phoneNumber, description: item.description, avatarUrl: item.avatarUrl },
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
                minWidth: "70px", minHeight: "37px", marginBottom: 8 }}>Edit</Button>
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
                            <Grid container item xs={8.4} sm={5} md={5} lg={5} mb={2}    
                                display="flex"
                                direction="column"   
                            >  
                                <TextField   
                                    type="text" 
                                    variant="outlined"
                                    placeholder='Name'
                                    name="name"
                                    label="Name"
                                    value={item.name}
                                    InputProps={{ style: { fontSize: 12, borderRadius: 9  } }}
                                    onChange={handleInputChange} 
                                />  
                            </Grid>

                            <Grid container item xs={8.4} sm={5} md={5} lg={5} mb={2} ml={2}
                                display="flex"
                                direction="column"   
                            >   
                                <TextField   
                                    type="text" 
                                    variant="outlined"
                                    placeholder='Avatar Url'
                                    name="avatarUrl"
                                    label="Avatar Url"
                                    value={item.avatarUrl}
                                    InputProps={{ style: { fontSize: 12, borderRadius: 9  } }}
                                    onChange={handleInputChange} 
                                /> 
                            </Grid> 
 
                            <Grid container item xs={8.4} sm={5} md={5} lg={5} mb={2}  
                                display="flex"
                                direction="column"   
                            >  
                                <TextField   
                                    type="text" 
                                    variant="outlined" 
                                    placeholder='Address'
                                    name="address"
                                    label="Address"
                                    value={item.address}
                                    InputProps={{ style: { fontSize: 12, borderRadius: 9  } }}
                                    onChange={handleInputChange} 
                                />  
                            </Grid>
                             
                            <Grid container item xs={8.4} sm={5} md={5} lg={5} mb={2} ml={2} 
                                display="flex"
                                direction="column"   
                            >  
                                <TextField   
                                    type="text" 
                                    variant="outlined"
                                    placeholder='Phone Number'
                                    name="phoneNumber"
                                    label="Phone Number"
                                    value={item.phoneNumber}
                                    InputProps={{ style: { fontSize: 12, borderRadius: 9  } }}
                                    onChange={handleInputChange} 
                                />  
                            </Grid>   

                            <Grid container item xs={8.4} sm={12} md={12} lg={12} 
                                alignItems="center"
                                justifyContent="flex-start" 
                                display="flex"
                                direction="column"   
                            >  
                                <TextareaAutosize     
                                    aria-label="description"
                                    style={{ width: 456, height: 170, borderRadius: 15, padding: 10 }}   
                                    minRows={12}
                                    maxRows={10}
                                    maxLength={1000} 
                                    type="text" 
                                    name="description"
                                    value={item.description} 
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
