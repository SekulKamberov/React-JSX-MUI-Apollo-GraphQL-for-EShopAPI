import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { useQuery } from '@apollo/client' 
import { GET_STORES } from '../../src/gql/queries/stores' 
import { AuthContext } from '../AuthContext'

import { format } from 'date-fns'

import { Grid as LoaderGrid} from  'react-loader-spinner'
import { Grid, Typography, Box } from '@mui/material'  

const Stores = () => {
    const navigate = useNavigate()
    const {loading, error, data} = useQuery(GET_STORES)
    const { userData } = useContext(AuthContext)  

    if(loading) 
    return <Grid container item xs={12} sm={12} md={12} lg={12} mt={6}    
                alignItems="center"
                justifyContent="center"    
                display="flex" 
                direction="row"      
            > 
                <LoaderGrid
                    height="400"
                    width="400"
                    color="#281157"
                    radius="12.5"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </Grid>

    if(error) 
    return <Grid container item xs={12} sm={12} md={12} lg={12} mt={1}    
                alignItems="center"
                justifyContent="center"    
                display="flex" 
                direction="row"      
            > 
                <Typography variant="h2" style={{color: "#281157", fontWeight: "700"}}>Error</Typography>
            </Grid>
 
    return(
        <Grid container item xs={12} sm={12} md={12} lg={12} mt={6}  
            alignItems="center"
            justifyContent="center"    
            display="flex" 
            direction="row"      
        >  
            <Typography sx={{ color: "#281157", fontSize: 31, fontWeight: 800}}>
                {userData.firstName} {userData.lastName} Stores
            </Typography>
            <Grid container item xs={9} sm={12} md={12} lg={11} mt={4}     
                alignItems="center"
                justifyContent="center"    
                display="flex" 
                direction="row"      
            >  
                {data.stores.length > 0 ? data.stores.map((item, idx) => ( 
                    <Grid container item xs={12} sm={5} md={4} lg={3} key={idx} m={1}   
                        direction="row"
                        alignItems="center"
                        justifyContent="center"    
                        display="flex"  
                        style={{ borderRadius: '12px' }} 
                    >
                        <Box style={{border: "none", color: "#281157", fontSize: 14, fontSize: 19, fontWeight: 700}} 
                            onClick={() => navigate('/home/store', { state: {store: item} })}
                        >
                            <Typography sx={{border: "none", fontSize: 14, fontSize: 19, fontWeight: 700}}>
                                {item.name}
                            </Typography>
                            <Typography sx={{border: "none", fontSize: 14, fontWeight: 500, marginTop: 0.5}}>
                                <b>ID:</b> {item.id}
                            </Typography>
                            <Typography sx={{border: "none", fontSize: 12,  paddingBottom: "8px" }}>
                                <b>Created:</b> {format(new Date(item.createdAt), "dd/MM/yyyy")}
                            </Typography> 

                            <img style={{borderRadius: 9, align: "flex-start", width: "300px", height: "170px", 
                                paddingBottom: "3px"}} src={item.avatarUrl}  /> 

                            <Typography sx={{width: "300px", fontSize: "12px", color: "#281157"}}>
                                {item.description.slice(0, 140)} 
                            </Typography>  
                        </Box>
                    </Grid>
                ))
                :
                "No Stores"
                }
            </Grid>
        </Grid>
    )
}

export default Stores
