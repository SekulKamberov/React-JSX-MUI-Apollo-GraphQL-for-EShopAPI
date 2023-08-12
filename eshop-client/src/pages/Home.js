import { useContext } from 'react'
import { Link, useLocation , Outlet } from 'react-router-dom'

import { Grid, Box, Typography, Avatar, Button } from '@mui/material'

//https://react-icons.github.io/react-icons/search?q=login
import { BsHouse, BsPeople, BsBoxArrowInRight, BsBoxArrowRight } from 'react-icons/bs'
 
import { AuthContext } from '../AuthContext'
import { CreateStoreDialog } from "../components/Store/CreateStoreDialog"
 
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

const avatarStyle = { 
    marginTop: "8px",
	border: "2px ridge #281157",
	boxShadow: "0px 6px 40px 6px #281157",
	width: 330, height: 330
}

const Home = () => { 
    const { isAuth } = useContext(AuthContext)
    const { userData } = useContext(AuthContext)  
    const location = useLocation()
    let display = location.pathname !== "/home" 
 
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
            <Grid container item xs={12} sm={12} md={12} lg={12}  
                alignItems="center"
                justifyContent="center"    
                display="flex" 
                direction="row"      
            > 
                <Grid container item xs={10} sm={8} md={6} lg={6} 
                    alignItems="center"
                    justifyContent="center"    
                    display="flex" 
                    direction="row"      
                >    
                    {isAuth && 
                        <> 
                            <Grid container item xs={12} sm={12} md={12} lg={12} 
                                alignItems="center"
                                justifyContent="center"    
                                display="flex" 
                                direction="column"      
                            > 
                                <Typography style={{ fontSize: 31, fontWeight: 700, color: "#281157", marginBottom: "18px" }}>
                                    Hello, {userData.gender === "male" ? "Mr." : "Ms."} {userData.lastName}
                                </Typography>
                            </Grid>
                            {userData.isAdmin === true  &&  
                                <Grid container item xs={12} sm={12} md={12} lg={12} 
                                    alignItems="center"
                                    justifyContent="center"    
                                    display="flex" 
                                    direction="column"      
                                > 
                                    <Typography style={{ fontSize: 21, fontWeight: 800, color: "#281157", marginBottom: "1px"}}>
                                        ADMIN
                                    </Typography>  
                                </Grid>
                            }
                            <Avatar src={userData.avatar} sx={avatarStyle} alt={`${userData.firstName} profile image`} />
                        </>
                    }    
                        <Grid container item xs={12} sm={12} md={12} lg={12} mt={4}  
                            alignItems="center"
                            justifyContent="center"  
                            display="flex" 
                            direction="row"   
                        > 
                            {display &&
                                <ThemeProvider theme={theme}> 
                                    <Box mr={1}>
                                        <Button color="CatColor" variant="outlined" component={Link} to="/home"  
                                            style={{ borderRadius: '9px', border: "2px solid #281157", fontWeight: 700,  
                                            fontSize: 17, maxWidth: "125px", maxHeight: "41px", minWidth: "114px", 
                                            minHeight: "40px", marginBottom: 8 
                                        }}>
                                            Stores
                                        </Button>
                                    </Box> 
                                </ThemeProvider>
                            }
                             
                            {isAuth && userData.isAdmin === true  &&  
                                <Box>
                                    <CreateStoreDialog />
                                </Box>
                            } 
                            <ThemeProvider theme={theme}> 
                                <Box ml={1}>
                                    <Button color="CatColor" variant="outlined" component={Link} to="/profile"  
                                        style={{ borderRadius: '9px',  border: "2px solid #281157", fontWeight: 700, fontSize: 17, 
                                            maxWidth: "125px", maxHeight: "41px", minWidth: "114px", minHeight: "40px", marginBottom: 8 
                                        }}
                                    >
                                        Profile
                                    </Button>
                                </Box> 
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
