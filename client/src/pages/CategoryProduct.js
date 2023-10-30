import React,{useEffect,useState} from 'react'
import { Layout } from '../component/layout/Layout'
import axios from 'axios'
import {useNavigate, useParams } from 'react-router-dom'

const CategoryProduct = () => {

    const navigate=useNavigate();
    const params=useParams();
    const[product,setproduct]=useState([]);
    const[category,setcategory]=useState([]);

    useEffect(()=>{
        if(params?.slug)getproductbycat();
    },[params?.slug]);

    const getproductbycat=async()=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
            setproduct(data?.products);
            setcategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Layout>
        <div className='container mt-3'>
            <h4 className='text-center'>category: {category?.name}</h4>
            <h6 className='text-center'>{product?.length} result found</h6>
            <div className='row'>
                <div className='d-flex flex-wrap'>
                    {product?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-img/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0,30)}</p>
                                    <p className="card-text">${p.price}</p>
                                    <button className='btn btn-primary ms-1' onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button className='btn btn-secondary ms-1'>ADD TO CART</button>
                                </div>
                            </div>
                        
                    ))}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct