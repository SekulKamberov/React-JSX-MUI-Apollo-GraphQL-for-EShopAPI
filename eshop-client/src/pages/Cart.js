import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { getCartFromSessionStorage } from '../utils/session'

import { Grid, Typography, Button  } from '@mui/material'  
import { createTheme, ThemeProvider } from '@mui/material/styles'  

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { useMutation } from '@apollo/client'
import { ADD_CART } from '../gql/mutations/cart'

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

const Cart = () => {
  const sessionValues = getCartFromSessionStorage() || [] 
  const [values, setValues] = useState(sessionValues)
  const [cost, setCost] = useState(sessionValues.reduce((t, c) => {return t + c.price * c.cartQuantity}, 0))
 
  const navigate = useNavigate()  

    const saveSession = (item, action) => {
        var current = sessionStorage.getItem(item.name)
        if (!current) {  current = [] }  
        current = JSON.parse(current)  
        action ? current.cartQuantity += 1 :  current.cartQuantity -= 1  
        sessionStorage.setItem(item.name, JSON.stringify(current)) 
    }

    const deleteSession = (item) => {
        var current = sessionStorage.getItem(item.name)
        if (!current) {  current = [] }  
        else {
            sessionStorage.removeItem(item.name ) 
        } 
    }

    const handePlus = (item) => { 
        setValues([...values].map(object => {
            if(object === item) {
              return {
                ...object,
                cartQuantity: object.cartQuantity + 1,  
              }
            }
            else return object 
        })) 
        setCost(cost + item.price)
        saveSession(item, true)
    } 

    const handeMinus = (item) => {
        setValues([...values].map(object => {
            if(object === item && item.cartQuantity >= 1) {
              return {
                ...object,
                cartQuantity: object.cartQuantity - 1,  
              }
            }
            else return object 
        })) 
        setCost(cost - item.price)
        saveSession(item, false)
    } 

    const deleteHandler = (item) => {
        setValues([...values].filter(p => p.id !== item.id)) 
        setCost(cost - (item.price * item.cartQuantity))
        deleteSession(item)
    }
 
    const [submit, { error, data }] = useMutation(ADD_CART, { 
        variables: { email: values.email, password: values.password, firstName: values.firstName, 
            lastName: values.lastName, gender: values.gender, avatar: values.avatar },
        onCompleted:  () => { 
            navigate("/home")
        }
    }) 

  return (
    <Grid container xs={12} sm={12} md={12} lg={6}  
        alignItems="center"
        justifyContent="center"  
        display="flex" 
        direction="row"   
    > 
        <Grid container item xs={12} sm={12} md={12} lg={12} mt={3}
            alignItems="center"
            justifyContent="center"  
            display="flex" 
            direction="row"
        >
            <Typography sx={{ fontSize: 57, fontWeight: 800, color: "#281157" }}>Cart</Typography>  
        </Grid> 

        <Grid container item mt={7}  
            alignItems="flex-start"
            justifyContent="flex-start"  
            display="flex" 
            direction="row"   
        >     
            {values.length > 0 && values.map((item, idx) => (
                <Grid container item xs={12} sm={12} md={12} lg={12} 
                    alignItems="flex-start"
                    justifyContent="flex-start"  
                    display="flex" 
                    direction="row"   
                >
                    <Grid container item xs={8} sm={8} md={8} lg={8} mb={10} 
                        alignItems="flex-start"
                        justifyContent="flex-start"  
                        display="flex" 
                        direction="column"   
                    >
                        <Grid container item xs={8} sm={10} md={10} lg={8}  
                            alignItems="flex-start"
                            justifyContent="flex-start"  
                            display="flex" 
                            direction="row"   
                        >
                            <spam style={{ fontSize: 17, fontWeight: 600, color: "#281157", marginRight: "6px" }}>
                                ID: 
                            </spam> 
                            {item.id} 
                        </Grid>
                        <Grid container item xs={8} sm={10} md={10} lg={8}   
                            alignItems="flex-start"
                            justifyContent="flex-start"  
                            display="flex" 
                            direction="row"   
                        >
                            <spam style={{ fontSize: 17, fontWeight: 600, color: "#281157", marginRight: "6px" }}>
                                Name:
                            </spam>
                            {item.name} 
                        </Grid>
                        <Grid container item xs={8} sm={10} md={10} lg={8}   
                            alignItems="flex-start"
                            justifyContent="flex-start"  
                            display="flex" 
                            direction="row"   
                        >
                            <img src={item.avatarUrl} style={{paddingTop: "7px", borderRadius: 12, 
                                align: "flex-start", width: "300px", height: "170px" }} 
                            /> 
                        </Grid>
                        <Grid container item xs={8} sm={10} md={10} lg={8} mt={0.5}    
                            alignItems="flex-start"
                            justifyContent="flex-start"  
                            display="flex" 
                            direction="row"   
                        >
                            <spam style={{ fontSize: 17, fontWeight: 600, color: "#281157", marginRight: "6px" }}>
                                Description: 
                            </spam>
                            {item.description}  
                        </Grid> 
                    </Grid> 

                    <Grid container item xs={2} sm={2} md={2} lg={2}   
                        alignItems="center"
                        justifyContent="flex-end"  
                        display="flex" 
                        direction="column"   
                    > 
                        <Typography style={{ fontSize: 21, fontWeight: 800, color: "#281157" }}>
                            {item.price * item.cartQuantity} EU
                        </Typography> 
                        <Typography style={{ paddingTop: 12, fontSize: 21, fontWeight: 800, color: "#281157" }}>
                            {item.cartQuantity}  
                        </Typography> 
                    </Grid> 
                    <Grid container item xs={1} sm={1} md={1} lg={1} ml={1} 
                        alignItems="flex-end"
                        justifyContent="flex-end"  
                        display="flex" 
                        direction="column"   
                    > 
                        <ThemeProvider theme={theme}>  
                            <Button color="CatColor" variant="outlined"  
                                sx={{ borderRadius: '9px', marginBottom: "12px", fontWeight: 800,  
                                    height: "50px", width: "50px"}} 
                                onClick={() => handePlus(item)}
                            >
                                <AddIcon />
                            </Button>
                                    
                            <Button color="CatColor" variant="outlined"  
                                sx={{ borderRadius: '9px', fontWeight: 800,   
                                height: "50px", width: "50px", marginBottom: "12px" }} 
                                onClick={() => handeMinus(item)}
                            >
                                <RemoveIcon />
                            </Button> 

                            <Button color="CatColor" variant="outlined"  
                                sx={{ borderRadius: '9px', fontWeight: 800, 
                                height: "50px", width: "50px" }} 
                                onClick={() => deleteHandler(item)} 
                            >
                                x
                            </Button> 
                        </ThemeProvider>
                    </Grid> 
                </Grid>
                ))  
            }  
        </Grid>
        {cost ? (  
            <> 
            <Grid container item xs={12} sm={12} md={12} lg={12} ml={1} 
                alignItems="center"
                justifyContent="center"  
                display="flex" 
                direction="column"   
            > 
                <Typography sx={{ fontSize: 39, color: "#281157", fontWeight: 800 }}>
                    { cost + " Euros"}  
                </Typography>
            </Grid>
            <Grid container item xs={1} sm={1} md={1} lg={1} mt={3} mb={11}    
                alignItems="flex-end"
                justifyContent="flex-end"  
                display="flex" 
                direction="column"   
            > 
                <ThemeProvider theme={theme}>  
                    <Button color="CatColor" variant="outlined" size="large"
                        sx={{ borderRadius: '9px', fontWeight: 800 }} 
                        onClick={() => submit}
                    >
                        Order 
                    </Button> 
                </ThemeProvider>
            </Grid>
            </>
            )
            :
            <Typography sx={{ fontSize: 39, color: "#281157", fontWeight: 800 }}>
                Empty Cart 
            </Typography>
        }
       
    </Grid>
  )
}

export default Cart
