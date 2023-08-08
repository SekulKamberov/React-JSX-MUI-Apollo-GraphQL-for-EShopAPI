import { createContext, useState } from 'react'  
import jwtDecode from 'jwt-decode'

import { saveSession, recoverSession, deleteSession, 
    storeUserDataOnSessionStorage, recoverUserDataFromSessionStorage, 
    deleteUserDataFromSessionStorage} from './utils/session'

export const AuthContext = createContext()  

const Provider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(() => {
		return recoverSession('token') 
	})

    const [userData, setUserData] = useState(() => {
		return recoverUserDataFromSessionStorage() 
	})

    const value = {
        isAuth,
        userData,
        activateAuth: (data) => { 
            const decodedToken = jwtDecode(data.loginUser.tokenData.token) || {}  
            const userData = {
                isActive: true,
				isAdmin: decodedToken.role === "Admin" ? true : false,
				uuid: data.loginUser.id,
				email: data.loginUser.email,
				firstName: data.loginUser.firstName,
				lastName: data.loginUser.lastName,
				userName: data.loginUser.userName,
				gender: data.loginUser.gender,
				avatar: data.loginUser.avatar,
                data: data
            } 
            storeUserDataOnSessionStorage(userData)
            setUserData(userData)
            saveSession('decodedToken', decodedToken)
            saveSession('token', data.loginUser.tokenData.token)
            setIsAuth(true)
        },
        removeAuth: () => {
            setIsAuth(false) 
            setUserData({}) 
            deleteUserDataFromSessionStorage() 
            deleteSession() 
        }
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    ) 
}

export default { Provider, Consumer: AuthContext.Consumer }  
