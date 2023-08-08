import { useContext } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'

import { Grid, Box, Typography, Avatar } from '@mui/material'

//https://react-icons.github.io/react-icons/search?q=login
import { BsHouse, BsPeople, BsBoxArrowInRight, BsBoxArrowRight } from 'react-icons/bs'

import { createTheme, ThemeProvider } from '@mui/material/styles' 

import { AuthContext } from '../AuthContext'

const avatarStyle = { 
    marginTop: "8px",
	border: "2px ridge #281157",
	boxShadow: "0px 6px 40px 6px #281157",
	width: 330, height: 330
}

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

const Home = () => { 
    const { isAuth } = useContext(AuthContext)
    const { userData } = useContext(AuthContext) 
    console.log('isAuth', isAuth)
    console.log('userData', userData)
    const navigate = useNavigate()  
 
  return ( 
    <Grid container item xs={12} sm={12} md={12} lg={12} 
        alignItems="center"
        justifyContent="center"    
        display="flex" 
        direction="row"      
    >   
        {!isAuth && 
            <Grid container item xs={12} sm={12} md={12} lg={12} mt={3}
                alignItems="center"
                justifyContent="center"    
                display="flex" 
                direction="row"      
            > 
                <Typography variant="h4" sx={{color:" #281157", marginBottom: "12px", fontWeight: "500"}}>
                    Sign in 
                </Typography>
            </Grid>
        }  

        {isAuth && 
            <Grid container item xs={10} sm={8} md={6} lg={6} mt={1}
                alignItems="center"
                justifyContent="center"    
                display="flex" 
                direction="row"      
            > 
                <Grid container item xs={10} sm={8} md={6} lg={6} mt={3}
                    alignItems="center"
                    justifyContent="center"    
                    display="flex" 
                    direction="row"      
                > 
                    <Typography style={{ fontSize: 31, fontWeight: 700, color: "#281157", marginBottom: "3px" }}>
                        Hello, {userData.gender === "male" ? "Mr." : "Ms."} {userData.lastName}
                    </Typography>

                    <Avatar src={userData.avatar} sx={avatarStyle} alt={`${userData.firstName} profile image`} />

                    <Grid container item xs={12} sm={12} md={12} lg={9} mt={4}  
						alignItems="center"
						justifyContent="center"  
						display="flex" 
						direction="row"   
					>
                        <ThemeProvider theme={theme}> 
                            <Box></Box>
                        </ThemeProvider>
                    </Grid>
                </Grid>
            </Grid>
        } 
        <Outlet /> 
    </Grid>
  )
}

export default Home
