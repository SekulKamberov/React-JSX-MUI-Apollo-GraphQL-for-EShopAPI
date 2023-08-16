import { useContext } from 'react'
import { Link } from 'react-router-dom'
 
import { Grid } from '@mui/material' 
import { BsHouse, BsBoxArrowInRight } from 'react-icons/bs'  
//import { FiLogIn } from "react-icons/fi" 
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
  
import { AuthContext } from '../AuthContext'

import { RegisterFormDialog } from '../components/RegisterFormDialog' 
import { LoginFormDialog } from '../components/LoginFormDialog' 

const NavBar = () => {
    const { isAuth } = useContext(AuthContext) 
	//const { userData } = useContext(AuthContext) 

  return (
    <Grid container item xs={12} sm={12} md={12} lg={12} mt={1}
        alignItems="center"
        justifyContent="center"    
        display="flex" 
        direction="row"      
    > 
        <Grid item>   
            <Link to='/home'>
                <BsHouse size="45" title='Home'/>
            </Link>
        </Grid>  
  
        <Grid item ml={2}>{ !isAuth &&  <LoginFormDialog/> }</Grid>
        <Grid item ml={2}>{ !isAuth &&  <RegisterFormDialog/> }</Grid> 

        {isAuth && 
            <Grid item ml={-3}>
                <Link to='/cart'>
                    {<ShoppingCartOutlinedIcon sx={{ fontSize: 45, color: "#281157" }} />} 
                </Link>
            </Grid>
        }
        <Grid item >    
            { isAuth && <Link to='/logout'> { <BsBoxArrowInRight size="45" title='Logout'/> } </Link> }
        </Grid>  

        {isAuth &&  
            <Grid container item xs={12} sm={12} md={12} lg={12} 
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

export default NavBar
