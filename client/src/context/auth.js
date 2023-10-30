import axios from "axios";
import { useState,useEffect,useContext,createContext } from "react";

const Authcontext=createContext();

const AuthProvider=({children})=>{
    const [auth,setauth]=useState({
        user:null,
        token:""
    });

    //default axios
    axios.defaults.headers.common["Authorization"]=auth?.token

    useEffect(()=>{
        const data=localStorage.getItem('auth');
        if(data){
            const parsedata=JSON.parse(data);
            setauth({
                ...auth,
                user:parsedata.user,
                token:parsedata.token,
            });
        }
        //eslint-disable-next-line
    },[])

    return(
        <Authcontext.Provider value={[auth,setauth]}>
            {children}
        </Authcontext.Provider>
    )
}

//custom hook
const useAuth=()=>useContext(Authcontext)

export {useAuth,AuthProvider}