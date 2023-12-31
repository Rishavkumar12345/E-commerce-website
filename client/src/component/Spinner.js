import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

//{path="login"}
const Spinner = ({path="login"}) => {

    const[count,setcount]=useState(5);
    const navigate=useNavigate();
    const location=useLocation();

    useEffect(()=>{
        const interval=setInterval(()=>{
            setcount((prevalue)=>--prevalue)
        },1000)

        //`/${path}`
        count===0 && navigate(`/${path}`,{
            state:location.pathname,
        })
        return ()=>clearInterval(interval)
    },[count,navigate,location,path])

  return (
    <>
        <div className="d-flex flex-column justify-content-center align-items-center"  style={{height:"100vh"}}>
            <h1 className='Text-center'>Redirect to you in {count} second</h1>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    </>
  )
}

export default Spinner