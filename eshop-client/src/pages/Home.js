import { useContext } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'

import { Grid, Typography } from '@mui/material'

//https://react-icons.github.io/react-icons/search?q=login
import { BsHouse, BsPeople, BsBoxArrowInRight, BsBoxArrowRight } from 'react-icons/bs'

import { createTheme, ThemeProvider } from '@mui/material/styles' 

import { AuthContext } from '../AuthContext'

const Home = () => {
    console.log('AuthContext', AuthContext)
    const { isAuth } = useContext(AuthContext)
    const { userData } = useContext(AuthContext)
         
    const navigate = useNavigate()  



  return ( 
    <Grid container item xs={12} sm={12} md={12} lg={12} 
        alignItems="center"
        justifyContent="center"    
        display="flex" 
        direction="row"      
    >   
        {isAuth && userData.isAdmin === true  &&
            <Grid container item xs={10} sm={8} md={6} lg={6} mt={1}
                alignItems="center"
                justifyContent="center"    
                display="flex" 
                direction="row"      
            > 

            </Grid>
        }  
    </Grid>
  )
}

export default Home
