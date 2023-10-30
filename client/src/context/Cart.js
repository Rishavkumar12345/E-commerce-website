
import { useState,useContext,createContext } from "react";

const Cartcontext=createContext();

const CartProvider=({children})=>{
    const [cart,setcart]=useState([]);

    return(
        <Cartcontext.Provider value={[cart,setcart]}>
            {children}
        </Cartcontext.Provider>
    )
}

//custom hook
const useCart=()=>useContext(Cartcontext)

export {useCart,CartProvider}