import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../../src/AuthContext'

export const Unauthenticated = ({ children }) => {
    const { isAuth } = useContext(AuthContext)
    if (isAuth) {
        return <Navigate to='/' />
    }
    return children
}
