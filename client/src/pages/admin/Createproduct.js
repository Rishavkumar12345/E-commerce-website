import React,{useState,useEffect} from 'react'
import { Layout } from '../../component/layout/Layout'
import Adminmenu from '../../component/layout/Adminmenu'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Select } from 'antd'
const {Option} =Select;




const Createproduct = () => {
  const [categories, setcategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");

  const navigate=useNavigate();

  //get all category
  const getallcategory=async()=>{
    try{
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getall-category`)
      if(data?.success){
        setcategories(data?.category);
      }else{
        toast.error(data?.message)
      }
      
    }catch(error){
      console.log(error);
      toast.error("something went wrong in getting category")
    }
  }

  useEffect(()=>{
    getallcategory();
  },[])

  //create product function
  const handleCreate=async(e)=>{
    e.preventDefault();
    try{
      const productdata=new FormData();
      productdata.append("name",name);
      productdata.append("description",description);
      productdata.append("price",price);
      productdata.append("quantity",quantity);
      productdata.append("photo",photo);
      productdata.append("category",category);


      const {data}=axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,productdata);
      if(data?.success){ 
        toast.error(data?.message)
      }else{
        toast.success("Product created successfully")
        navigate('/dashboard/admin/product')
      }
    }catch(error){
      console.log(error);
      toast.error("soneting went wrong");
    }
  }

  return (
    <Layout title={"DashBoard - Create Product"}>
        <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className='m-1 w-75'>
              <Select bordered={false} placeholder='Select a category' showSearch={true} size="larger" className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
                {categories?.map((c)=>(
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
              </Select>
              <div className='mb-3'>
                <label className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name : "Upload Photo"}
                  <input type='file' name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                </label>
              </div>
              <div className='mb-3'>
                {photo && (
                  <div className='text-center'>
                    <img src={URL.createObjectURL(photo)} alt="Product Photo" height={'200px'} className='img img-responsive'/>
                  </div>
                )}
              </div>
              <div className='mb-3'>
                  <input type='name' value={name} placeholder='write a product name' className='form-control' onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className='mb-3'>
                  <textarea type='text' value={description} placeholder='write a product description' className='form-control' onChange={(e)=>setDescription(e.target.value)}/>
              </div>
              <div className='mb-3'>
                  <input type='number' value={price} placeholder='write a price product' className='form-control' onChange={(e)=>setPrice(e.target.value)}/>
              </div>
              <div className='mb-3'>
                  <input type='number' value={quantity} placeholder='write a product quantity' className='form-control' onChange={(e)=>setQuantity(e.target.value)}/>
              </div>
              <div className="mb-3">
                <Select bordered={false} placeholder="Select Shipping " size="large" showSearch className="form-select mb-3" onChange={(value) => { setShipping(value)}}>
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
    </Layout>
  )
}

export default Createproduct