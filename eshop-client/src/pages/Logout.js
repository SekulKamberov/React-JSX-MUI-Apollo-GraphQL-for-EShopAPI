import { useContext, useEffect } from 'react'
import { AuthContext } from '../AuthContext'
import { Grid, Button } from '@mui/material'   

export const Logout = () => {
    const { removeAuth } = useContext(AuthContext) 
    useEffect(() => {removeAuth()}, [removeAuth]) 
    return (
        <Grid item mt={1}
            alignItems="center"
            justifyContent="center"    
            display="flex"     
        >
            <Button onClick={removeAuth}>Log Out</Button>
        </Grid>
    ) 
}