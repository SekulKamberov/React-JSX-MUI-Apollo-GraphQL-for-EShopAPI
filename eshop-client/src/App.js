import {  lazy } from 'react'  
import { Routes, Route, Outlet } from 'react-router-dom' 

import { Grid } from '@mui/material'   

import NavBar from '../src/components/NavBar'  
import { Logout } from '../src/pages/Logout'    
import Stores from '../src/pages/Stores'  
import Cart from '../src/pages/Cart'   
import { Store } from '../src/pages/Store'    
import { Product } from '../src/pages/Product'    
import { RequireAuth } from './components/RequireAuth'   

const Home = lazy(() => import('../src/pages/Home')) 

function App() {
  return (
    <Grid container item xs={12} sm={12} md={12} lg={12} mt={1}     
        alignItems="center"
        justifyContent="center"    
        display="flex" 
        direction="row"         
    > 
        <Grid item xs={10} sm={8} md={6} lg={6}> 
            <NavBar />
        </Grid>

        <Grid container item xs={12} sm={12} md={12} lg={12} mt={3}     
            alignItems="center"
            justifyContent="center"    
            display="flex" 
            direction="row"         
        > 
            <Routes>  
                <Route path='/logout' element={ <RequireAuth> <Logout /> </RequireAuth> } />

                <Route path="/home" element={<Home />} >
                    <Route path="/home" element={<Stores />} />   

                    <Route path="/home/store" element={
                        <RequireAuth>
                            <Store />
                        </RequireAuth> 
                    } />   
                    <Route path="/home/product" element={
                        <RequireAuth>
                            <Product />
                        </RequireAuth> 
                    } /> 
                </Route> 

                <Route path='/cart' element={
                    <RequireAuth>
                    <Cart />
                    </RequireAuth>
                    } 
                />
            </Routes>
        </Grid>

        <Grid> 
            <Outlet />  
        </Grid>

    </Grid>
  )
}

export default App
