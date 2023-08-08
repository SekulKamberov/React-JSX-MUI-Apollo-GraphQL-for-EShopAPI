import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { AuthContext } from '../AuthContext'

export const RequireAuth = ({ children }) => {
    const { isAuth } = useContext(AuthContext)
    const location = useLocation()

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
}
