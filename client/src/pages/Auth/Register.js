import React,{useState} from 'react'
import { Layout } from '../../component/layout/Layout'
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../../style/Authstyle.css'

const Register = () => {

    const[name,setname]=useState("");
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const[phone,setphone]=useState("");
    const[address,setaddress]=useState("");
    const[answer,setanswer]=useState("");
    const navigate=useNavigate();

    //form function
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/user/register`,{name,email,password,phone,address,answer});
            if(res && res.data.success){
                toast.success(res.data && res.data.message)
                navigate("/login");
            }else{
                toast.error(res.data.message);
            }
        }catch(error){
            console.log(error)
            toast.error("something went wrong")
        }
    }

  return (
    <Layout title={"Register - Ecommerce App"}>
        <div className='form-container'>
            
            <form onSubmit={handlesubmit}>
                <h1>Register Page</h1>
                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" value={name} onChange={(e)=>setname(e.target.value)} className="form-control" id="exampleInputName"  required/>
                    
                </div>
                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} className="form-control" id="exampleInputEmail1"  required/>
                    
                </div>
                <div className="mb-1">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} className="form-control" id="exampleInputPassword1" required/>
                </div>
                <div className="mb-1">
                    <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
                    <input type="text" value={phone} onChange={(e)=>setphone(e.target.value)} className="form-control" id="exampleInputPhone" required/>
                </div>
                <div className="mb-2">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input type="text" value={address} onChange={(e)=>setaddress(e.target.value)} className="form-control" id="exampleInputAddress" required/>
                </div>
                <div className="mb-2">
                    <label htmlFor="exampleInputPassword1" className="form-label">Which is your favourite sport?</label>
                    <input type="text" value={answer} onChange={(e)=>setanswer(e.target.value)} className="form-control" id="exampleInputAnswer" required/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    </Layout>
  )
}

export default Register