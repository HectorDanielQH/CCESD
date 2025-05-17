import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registrarRequest, verifyTokenRequest, logoutRequest, profileRequest } from "../api/auth";
import Cookies from "js-cookie";


export const AuthContext = createContext();

export const useAuth =()=>{
    const context=useContext(AuthContext);
    if(!context){
        throw new Error("useAuth deberia estar dentro de un provider");
    }
    return context;
}

export const AuthProvider =({ children })=>{

    const [user, setUser]=useState(null);
    const [role, setRole]=useState('');
    const [isAuthenticated, setIsAuthenticated]=useState(false);
    const [errors, setErrors]=useState([]);

    const signup=async (user)=>{
        try{
            const res=await registrarRequest(user);
            setUser(res.data);
            setRole(res.data.rol);
            console.log(res.data);
            setIsAuthenticated(true);    
        }
        catch(error){
            setErrors(error.response.data);
        }
    }

    const actualizaruser=async(usuario)=>{
        try{
            const token = Cookies.get('token');
            const res= await profileRequest({_id : usuario}, token);
            setUser(res.data);
        }
        catch(error){
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message]);
        }
    }

    const singin=async (user)=>{
        try{
            const res=await loginRequest(user);
            setUser(res.data);
            setRole(res.data.rol);
            setIsAuthenticated(true); 

            console.log(res);
        }
        catch(error){
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message]);
        }
    }

    const logout=async (user)=>{
        try{
            const res=await logoutRequest(user);
            console.log(res.data);
            setIsAuthenticated(false);
        }
        catch(error){
            setErrors(error.response.data);
        }
    }


    useEffect(()=>{
        if(errors.length>0){
            const timer=setTimeout(()=>{
                setErrors([])
            },5000)

            return ()=>clearTimeout(timer)
        }
    },[errors])


    useEffect(()=>{
        async function checkLogin (){
            const cookies=Cookies.get();
            if(cookies.token){
                try{
                    const res=await verifyTokenRequest(cookies.token);
                    if(!res.data){
                        isAuthenticated(false);
                    }
                    setIsAuthenticated(true);
                    setUser(res.data);
                    setRole(res.data.rol);
                }
                catch(error){
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
        }
        checkLogin();
    },[]);
    return(
        <AuthContext.Provider value={{
            user,
            signup,
            singin,
            logout,
            actualizaruser,
            isAuthenticated,
            role,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}