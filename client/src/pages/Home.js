import React, { useEffect, useState } from 'react'
import { Layout } from '../component/layout/Layout'
//import { useAuth } from '../context/auth'
//import toast from 'react-hot-toast'
import axios from 'axios'
import {Checkbox,Radio} from 'antd'
import { Price } from '../component/Routes/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/Cart'
import toast from 'react-hot-toast'

const Home = () => {
  const[cart,setcart]=useCart();
  const [products,setproducts]=useState([]);
  const [categories,setcategories]=useState([]);
  const [checked,setchecked]=useState([]);
  const [radio,setradio]=useState([]);
  const [total,settotal]=useState(0);
  const [page,setpage]=useState(1);
  const [loading,setloading]=useState(false);
  const navigate=useNavigate();

  //get all category
  const getallcategory=async()=>{
    try{      
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getall-category`)     
      if(data?.success){
        setcategories(data?.category);
      }
      
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getallcategory();
    gettotal();
  },[])
  

  //get all product
  const getallproduct=async(req,res)=>{
    try{
      setloading(true);
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setloading(false);
      setproducts(data.product)
    }catch(error){
      setloading(false);
      console.log(error);
    }
  }

  //get total count
  const gettotal=async()=>{
    try{
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
      settotal(data?.total)
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    if(page===1)return
    loadMore();
  },[page]);

  //load more
  const loadMore=async()=>{
    try{
      setloading(true);
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setloading(false);
      setproducts([...products,...data?.product])
    }catch(error){
      setloading(false);
      console.log(error);
    }
  }  

  //filter by category
  const handlefilter=(value,id)=>{
    let all=[...checked];
    if(value){
      all.push(id)
    }else{
      all=all.filter((c)=>c!==id)
    }
    setchecked(all);
  };

  useEffect(()=>{
    if(!checked.length || !radio.length){
      getallproduct();
    }  
  },[checked.length,radio.length])

  useEffect(() => {
    if (checked.length || radio.length) {
      filterproduct();
    }
  }, [checked, radio]);

  //get filter
  const filterproduct=async()=>{
    try{
      const {data}= await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filter`,{checked,radio});
      setproducts(data?.product)
    }catch(error){
      console.log(error)
    }
  }

  

  return (
    <Layout title={"All Product - Best offers"}>
        <div className='row mt-3'>
          <div className='col-md-2'>
            <h4 className='text-center'>Filter By Category</h4>
            <div className='d-flex flex-column'>
              {categories?.map((c)=>(
                <Checkbox key={c._id} onChange={(e)=>handlefilter(e.target.checked,c._id)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>

            {/*price filter*/}
            <h4 className='text-center mt-4'>Filter By Price</h4>
            <div className='d-flex flex-column'>
              <Radio.Group onChange={(e)=>setradio(e.target.value)}>
                {Price?.map((p)=>(
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                  
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column mt-3">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
          </div>
          <div className='col-md-9'>
            {/*{JSON.stringify(checked,null,4)}*/}
            <h1 className='text-center'>All Product</h1>
            <div className='d-flex flex-wrap'>
                  {products?.map((p) => (
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
                                <button className='btn btn-primary ms-1' onClick={()=>navigate(`product/${p.slug}`)}>More Details</button>
                                <button className='btn btn-secondary ms-1' onClick={()=>{setcart([...cart,p]);toast.success("item added successfully")}}>ADD TO CART</button>
                            </div>
                        </div>
                    
                  ))}
            </div>
            <div className='m-2 p-3'>
              {products && products.length<total && (
                <button className='btn btn-warning' onClick={(e)=>{e.preventDefault();setpage(page+1)}}>
                  {loading ? "Loading..." : "LoadMore"}
                </button>
              )}
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Home