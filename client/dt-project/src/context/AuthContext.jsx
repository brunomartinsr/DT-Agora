import {createContext, useContext, useState, useEffect} from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)

    useEffect(() => {
        const token = sessionStorage.getItem("google_token")
        if(token){
            setUser({ token }) //também pegar infos como nome, experiencia, conta email e etc
        }
    }, [])

    const logout = () => {
        sessionStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, setUser, logout}}>
            {children}
        </AuthContext.Provider>         
    )
}
