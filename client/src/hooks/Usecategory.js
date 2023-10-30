import {useState,useEffect} from 'react'
import axios from 'axios'

export default function Usecategory(){
    const [categories,setcategories]=useState([]);

    //get category
    const getcategories=async()=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getall-category`);
            setcategories(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        getcategories();
    },[])
    return categories;
}