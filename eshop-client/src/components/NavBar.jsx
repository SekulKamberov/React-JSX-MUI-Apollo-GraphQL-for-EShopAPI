import { useContext } from 'react'
import { Link } from 'react-router-dom'
 
import { Grid } from '@mui/material' 
import { BsHouse, BsBoxArrowInRight, BsBoxArrowRight } from 'react-icons/bs' 
import { FiLogIn } from "react-icons/fi"

import { Typography } from '@mui/material' 

import { AuthContext } from '../AuthContext'

import { RegisterFormDialog } from '../components/RegisterFormDialog' 
import { LoginFormDialog } from '../components/LoginFormDialog' 

const NavBar = () => {
    const { isAuth } = useContext(AuthContext) 
	const { userData } = useContext(AuthContext)
    

  return (
    <Grid container item xs={12} sm={12} md={12} lg={12} mt={1}
        alignItems="center"
        justifyContent="center"    
        display="flex" 
        direction="row"      
    > 
        <Grid item>   
            <Link to='/'>
                <BsHouse size="45" title='Home'/>
            </Link>
        </Grid>  
  
        <Grid item ml={2}>{ !isAuth &&  <LoginFormDialog/> } </Grid>
        <Grid item ml={2}>{ !isAuth &&  <RegisterFormDialog/> } </Grid> 

        <Grid item ml={2}>    
            { isAuth && <Link to='/logout'> { <BsBoxArrowInRight title='Logout'/> } </Link> }
        </Grid>  

        {isAuth &&  
            <Grid container item xs={12} sm={12} md={12} lg={12} 
                alignItems="center"
                justifyContent="center"    
                display="flex" 
                direction="row"      
            >   
                { !userData.isAdmin && <Typography>Hello, {userData.firstName} {userData.lastName}</Typography> }
                {  userData.isAdmin && <Typography>Hello, {userData.firstName} You are Admin</Typography> }
            </Grid>  
        }

    </Grid>
  )
}

export default NavBar
