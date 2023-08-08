import {  lazy } from 'react'  
import { Routes, Route, Outlet } from 'react-router-dom' 

import { Grid } from '@mui/material'   

import NavBar from '../src/components/NavBar' 
import { Unauthenticated } from '../src/components/Unauthenticated' 
 
import { RegisterFormDialog } from '../src/components/RegisterFormDialog' 
import { LoginFormDialog } from '../src/components/LoginFormDialog'
import { Logout } from '../src/pages/Logout'    
import Stores from '../src/pages/Stores'   

import { RequireAuth } from '../src/components/RequireAuth'  

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
              <Route path='/logout' element={
                <RequireAuth>
                  <Logout />
                </RequireAuth>
              } 
              />

              <Route path="/home" element={<Home />} >
                  <Route path="/home" element={<Stores />} />      
              </Route>
          </Routes>
      </Grid>

      <Grid> 
          <Outlet />  
      </Grid>

    </Grid>
  )
}

export default App
