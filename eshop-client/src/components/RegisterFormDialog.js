import React, { useState } from 'react'  
import { Link, useNavigate } from 'react-router-dom'

import { REGISTER_USER } from '../gql/mutations/auth'
import { useMutation } from '@apollo/client'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import useForm from '../utils/useForm'

import { MdOutlineAppRegistration } from "react-icons/md"
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

export function RegisterFormDialog() {
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

    const [submit, { error, data }] = useMutation(REGISTER_USER, { 
        variables: { email: values.email, password: values.password, firstName: values.firstName, 
            lastName: values.lastName, gender: values.gender, avatar: values.avatar },
        onCompleted:  () => {
            setOpen(false)
            navigate("/home")
        }
    })

    return (
        <>
            <Link to='/register' ml={4} onClick={handleClickOpen}>  
                { <MdOutlineAppRegistration size="45" title='SignUp'/>  }  
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
                                SignUp
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
                                        placeholder='Email'
                                        name="email"
                                        label="Email"
                                        value={values.email}
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
                                        placeholder='Password'
                                        name="password"
                                        label="Password"
                                        value={values.password}
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
                                        placeholder='First Name'
                                        name="firstName"
                                        label="First Name"
                                        value={values.firstName}
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
                                        placeholder='Last Name'
                                        name="lastName"
                                        label="Last Name"
                                        value={values.lastName}
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
                                        placeholder='Gender'
                                        name="gender"
                                        label="Gender"
                                        value={values.gender}
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
                                        placeholder='Avatar'
                                        name="avatar"
                                        label="Avatar"
                                        value={values.avatar}
                                        InputProps={{ style: { fontSize: 12, borderRadius: 9  } }}
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
