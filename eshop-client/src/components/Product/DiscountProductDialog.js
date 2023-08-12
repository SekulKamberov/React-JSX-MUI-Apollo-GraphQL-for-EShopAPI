

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

export function DiscountProductDialog(props) {
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
                style={{ borderRadius: '9px', border: "1px solid #e8e1eb", fontSize: 12, maxWidth: "91px", maxHeight: "39px", 
                minWidth: "90px", minHeight: "37px", marginBottom: 8, fontWeight: 400 }}>Discount</Button>
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
                 
            </Grid>
        </DialogContent>
        <DialogActions>  
            <Grid container item xs={12} sm={12} md={6} lg={12} mb={3}
                alignItems="center"
                justifyContent="center"
                display="flex"
                direction="row"   
            > 
                  
            </Grid>
        </DialogActions>
    </Dialog>
    </>
  )
} 
