import React, { useState } from 'react'  
import { Link, useNavigate } from 'react-router-dom'

import { LOGIN_USER } from '../gql/mutations/auth'
import { useMutation } from '@apollo/client'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import useForm from '../utils/useForm'

import { FiLogIn } from "react-icons/fi"
import { Grid, Box, TextField, Typography, TextareaAutosize, Button } from '@mui/material'
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
	email: "",
	password: "",
	firstName: "",
	lastName: "",
	gender: "",
	avatar: ""
}

const initialErrors = {
	email: "",
	password: "",
	firstName: "",
	lasttName: "",
	gender: "",
	avatar: ""
}

export function LoginFormDialog() {
    const [open, setOpen] = useState(false) 
    const {values, setValues, errors, setErrors} = useForm(initialValues, initialErrors)

    const navigate = useNavigate()

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

    const [submit, { error, data }] = useMutation(LOGIN_USER, { 
        variables: { email: values.email, password: values.password},
        onCompleted:  () => {
            setOpen(false)
            navigate("/home")
        }
    })

    return (
        <>
            <Link to='/login' ml={4} onClick={handleClickOpen}>  
                { <FiLogIn size="45" title='SignIn'/>  }  
            </Link>   

            <Dialog open={open} onClose={handleClose}
                sx={{  
                    "& .MuiDialog-paper": {
                    borderRadius: "15px",
                    },
                }}
            > 
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
                            <Typography variant="h4" sx={{color:" #281157", marginBottom: "12px", fontWeight: "500"}}>
                                SignIn
                            </Typography> 
                        </DialogContentText> 

                        <form onSubmit={submit} >
                            <Grid container item mt={1}  
                                alignItems="center"
                                justifyContent="center"    
                                display="flex"  
                                direction="column"   
                            > 
                                <TextField
                                    fullWidth 
                                    type="email"
                                    label="Email Address" 
                                    name="email" 
                                    value={values.email}
                                    onChange={handleInputChange} 
                                    
                                />

                                <TextField
                                    fullWidth 
                                    type="password"
                                    label="Password Address" 
                                    name="password" 
                                    value={values.password}
                                    onChange={handleInputChange} 
                                />
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
                            <Box >
                                <Button type="submit" color="CatColor" size="medium" variant="outlined" 
                                    sx={{ borderRadius: '9px', height: "43px" }} onClick={submit}>
                                    SUBMIT
                                </Button>
                            </Box>   

                            <Box ml={2}>
                                <Button color="CatColor" size="medium" variant="outlined" 
                                    sx={{ borderRadius: '9px', height: "43px" }} onClick={handleClose}>
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
