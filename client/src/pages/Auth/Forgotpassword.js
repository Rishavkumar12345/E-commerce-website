import React,{useState} from 'react'
import { Layout } from '../../component/layout/Layout'
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../../style/Authstyle.css'

const Forgotpassword = () => {

    const[email,setemail]=useState("");
    const[newpassword,setnewpassword]=useState("");
    const[answer,setanswer]=useState("");

    const navigate=useNavigate();

    //form function
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/user/forgot-password`,{email,newpassword,answer});
            if(res && res.data.success){
                toast.success(res.data && res.data.message)
                navigate( "/login");
            }else{
                toast.error(res.data.message);
            }
        }catch(error){
            console.log(error)
            toast.error("something went wrong")
        }
    }

  return (
    <Layout title={"Forgot-password - Ecommerce App"}>
      <div className='form-container'>
            
            <form onSubmit={handlesubmit}>
                <h1>Reset Password</h1>
                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} className="form-control" id="exampleInputEmail1"  required/>
                    
                </div>
                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Your Favourite Sport</label>
                    <input type="text" value={answer} onChange={(e)=>setanswer(e.target.value)} className="form-control" id="exampleInputAnwer"  required/>
                    
                </div>
                <div className="mb-2">
                    <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                    <input type="password" value={newpassword} onChange={(e)=>setnewpassword(e.target.value)} className="form-control" id="exampleInputPassword1" required/>
                </div>
                                
                <button type="submit" className="btn btn-primary">Reset</button>
            </form>

        </div>
    </Layout>
  )
}

export default Forgotpassword