

import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_STORE } from '../../gql/mutations/stores'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { Grid, Box, Typography, Button } from '@mui/material' 
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

export function DeleteStoreDialog(props) {
    const { item } = props
    const [open, setOpen] = useState(false) 

    const handleClickOpen = () => {
        setOpen(true)
      }
  
      const handleClose = () => {
        setOpen(false)
      } 

    const handleInputChange = e => {
        e.preventDefault()   
    }
 
    const [submit, { error, data }] = useMutation(DELETE_STORE, { 
        variables: { id: item.id },
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
                style={{ borderRadius: '9px', fontSize: 12, maxWidth: "129px", maxHeight: "39px", 
                minWidth: "128px", minHeight: "37px", marginBottom: 8 }}>Delete Store</Button>
        </Box>
    </ThemeProvider>

    <Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-paper": { borderRadius: "15px" } }}> 
        <DialogTitle> </DialogTitle>
        <DialogContent>
            <Grid container item xs={12} sm={12} md={12} lg={12}   
                sx={{  height: '100%', width: "400px"}} 
                direction="row"
                alignItems="center"
                justifyContent="center"    
                display="flex"  
            > 
                <DialogContentText> 
                    <Typography variant="h4" sx={{color:" #281157", marginBottom: "20px", fontWeight: "500"}}>
                        Are you shure to Delete?  
                    </Typography>   
                    <Typography sx={{color:" #281157", fontSize: 31, fontWeight: 800 }}>
                        {item.name}
                    </Typography> 
                    <Typography align='right' sx={{color:" #281157", fontSize: 17, marginBottom: "4px" }}>
                        <b>ID: </b> {item.id}
                    </Typography> 
                </DialogContentText>  
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
                            sx={{ borderRadius: '9px', height: "40px" }} onClick={submit}>
                            YES
                        </Button>
                    </Box>   

                    <Box ml={2}>
                        <Button color="CatColor" size="medium" variant="outlined" 
                            sx={{ borderRadius: '9px', height: "40px" }} onClick={handleClose}>
                            NO
                        </Button>
                    </Box>  
                </ThemeProvider>  
            </Grid>
        </DialogActions>
    </Dialog>
    </>
  )
} 
