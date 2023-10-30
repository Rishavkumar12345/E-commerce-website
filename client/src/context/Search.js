
import { useState,useContext,createContext } from "react";

const Searchcontext=createContext();

const SearchProvider=({children})=>{
    const [auth,setauth]=useState({
        keyword:"",
        results:[],
    });

    return(
        <Searchcontext.Provider value={[auth,setauth]}>
            {children}
        </Searchcontext.Provider>
    )
}

//custom hook
const useSearch=()=>useContext(Searchcontext)

export {useSearch,SearchProvider}