import React, { useState } from 'react' 

import { useMutation } from '@apollo/client'
import { ADDSTORE } from '../../gql/mutations/stores'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
 
import { Grid, Box, Typography, Button, TextField, TextareaAutosize } from '@mui/material' 
import { createTheme, ThemeProvider } from '@mui/material/styles' 
const { palette } = createTheme();
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
    phoneNumber: '',
    description: '',
    avatarUrl: '',
    address: ''
} 

export function CreateStoreDialog() {
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

    const [submit, { error, data }] = useMutation(ADDSTORE, { 
        variables: { name: values.name, address: values.address, phoneNumber: values.phoneNumber, 
                        description: values.description, avatarUrl: values.avatarUrl },
        onCompleted:  () => {
            setOpen(false)
            window.location.reload(false)
        }
    })



    return (
        <> 
            <ThemeProvider theme={theme}>
                <Box>
                    <Button color="CatColor" variant="outlined"
                        style={{ borderRadius: '9px', fontSize: 16, marginBottom: 8, maxWidth: "143px", 
                                maxHeight: "41px", minWidth: "142px", minHeight: "40px" }} 
                        onClick={handleClickOpen}
                    > 
                        New Store
                    </Button>
                </Box>
            </ThemeProvider>

            <Dialog open={open} onClose={handleClose} sx={{"& .MuiDialog-paper": { borderRadius: "15px" }}}>
                <DialogTitle> </DialogTitle>

                <DialogContent>
                    <Typography variant="h4" sx={{color:" #281157", marginBottom: "12px", fontWeight: "500"}}>
                        New Store 
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
                                <TextField
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
                            <Grid container item xs={8.4} sm={5.5} md={5.5} lg={5.8} mb={2} mt={2}  
                                display="flex"
                                direction="column"
                            >
                                <TextField
                                    type="text" 
                                    variant="outlined" 
                                    placeholder='Address'
                                    name="address"
                                    label="Address"
                                    value={values.address}
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
                                    placeholder='Phone Number'
                                    name="phoneNumber"
                                    label="Phone Number"
                                    value={values.phoneNumber}
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
                                    onClick={handleClickOpen}
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
