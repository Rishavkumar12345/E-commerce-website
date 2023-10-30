import React,{useState,useEffect} from 'react'
import { Layout } from '../../component/layout/Layout'
import Adminmenu from '../../component/layout/Adminmenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import Categoryform from '../../component/Form/Categoryform'
import {Modal} from 'antd'

const Createcategory = () => {
  const[categories,setcategories]=useState([]);
  const[name,setname]=useState("");
  const[visible,setvisible]=useState(false);
  const[selected,setselected]=useState(null);
  const [updatename,setupdatename]=useState("");

  //handle form
  const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
      const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name,})
      if(data.success){
        toast.success(`${name} is created`);
        getallcategory();
      }else{
        toast.error(data.message);
      }
    }catch(error){
      console.log(error);
      toast.error('something went wrong in input form')
    }
  }

  //get all category
  const getallcategory=async()=>{
    try{
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getall-category`)
      if(data?.success){
        setcategories(data?.category);
      }
      
    }catch(error){
      console.log(error);
      toast.error("something went wrong in getting category")
    }
  }

  useEffect(()=>{
    getallcategory();
  },[])

  //update category
  const handleupdate=async(e)=>{
    e.preventDefault();
    try{
      const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updatename})
      if(data.success){
        toast.success(`${updatename} is updated`)
        setselected(null);
        setupdatename("");
        setvisible(false);
        getallcategory();
      }else{
        toast.error(data.message);
      }
    }catch(error){
      console.log(error);
      toast.error("something went wrong")
    }
  }

  //delete category
  const handledelete=async(id)=>{
    
    try{
      const {data}=await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`)
      if(data.success){
        toast.success(`category is deleted`)
        getallcategory();
      }else{
        toast.error(data.message);
      }
    }catch(error){
      console.log(error);
      toast.error("something went wrong")
    }
  }

  return (
    <Layout title={"DashBoard - Create Category"}>
        <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className='p-3 w-50'>
              <Categoryform handlesubmit={handlesubmit} value={name} setvalue={setname}/>
            </div>

            <div className='w-75'>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2" onClick={()=>{setvisible(true);setupdatename(c.name);setselected(c)}}>Edit</button>
                          <button className="btn btn-danger ms-2" onClick={()=>{handledelete(c._id)}}>Delete</button>
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>

            </div>
            <Modal onCancel={()=>setvisible(false)} footer={null} visible={visible}>
              <Categoryform value={updatename} setvalue={setupdatename} handlesubmit={handleupdate}/>
            </Modal>
          </div>
        </div>
        </div>
    </Layout>
  )
}

export default Createcategory