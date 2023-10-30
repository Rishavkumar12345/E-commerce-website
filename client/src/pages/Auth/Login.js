import React,{useState} from 'react'
import { Layout } from '../../component/layout/Layout'
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';
import '../../style/Authstyle.css'
import { useAuth } from '../../context/auth';

const Login = () => {

    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const[auth,setauth]=useAuth();

    const navigate=useNavigate();
    const location=useLocation();

    //form function
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/user/login`,{email,password});
            if(res && res.data.success){
                toast.success(res.data && res.data.message)
                setauth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token,
                })
                localStorage.setItem('auth',JSON.stringify(res.data));
                navigate(location.state || "/");
            }else{
                toast.error(res.data.message);
            }
        }catch(error){
            console.log(error)
            toast.error("something went wrong")
        }
    }

  return (
    <Layout title={"Login - Ecommerce App"}>
        <div className='form-container'>
            
            <form onSubmit={handlesubmit}>
                <h1>Login Page</h1>
                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} className="form-control" id="exampleInputEmail1"  required/>
                    
                </div>
                <div className="mb-2">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} className="form-control" id="exampleInputPassword1" required/>
                </div>
                <div className="mb-3">
                <button type="submit" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
                </div>
                
                
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>
    </Layout>
  )
}

export default Login