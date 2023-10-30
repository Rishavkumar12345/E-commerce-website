import React,{useState,useEffect} from 'react'
import { Layout } from '../component/layout/Layout'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Productdetail = () => {
    const [product,setproduct]=useState({});
    const [relatedproduct,setrelatedproduct]=useState([]);
    const params=useParams();

    //initalp detail
    useEffect(()=>{
        if(params?.slug)getproduct()
    },[params?.slug])

    //get product
    const getproduct=async()=>{
        try{
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`)
            setproduct(data?.product);
            getrelatedproduct(data?.product._id,data?.product.category._id)
        }catch(error){
            console.log(error);
        }
    }

    //get similar product
    const getrelatedproduct=async(pid,cid)=>{
        try{
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
            setrelatedproduct(data?.products);
        }catch(error){
            console.log(error);
        }
    }

  return (
    <Layout title={"More Details"}>
        <div className='row container mt-2'>
            <div className='col-md-6'>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-img/${product._id}`} className='card-img-top' alt={product.name} height="400px" width={"200px"}/>
            </div>
            <div className='col-md-6'>
                <h1 className='text-center'>Product Details</h1>
                <h6>Name: {product.name}</h6>
                <h6>Description: {product.description}</h6>
                <h6>Price: {product.price}</h6>
                <h6>Category: {product.category?.name}</h6>
                <button className='btn btn-secondary ms-1'>ADD TO CART</button>
            </div>
        </div>
        <hr/>
        <div className='row container similar-products'>
            <h1>Similar Product</h1>
            {relatedproduct.length <1 && (<p className='text-center'>No similar Product found</p>)}
            <div className='d-flex flex-wrap'>
                  {relatedproduct?.map((p) => (
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
                                <button className='btn btn-secondary ms-1'>ADD To CART</button>
                            </div>
                        </div>
                    
                  ))}
            </div>
        </div>
    </Layout>
  )
}

export default Productdetail