import { Layout } from '../component/layout/Layout'
import React from 'react'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth'
//import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const[cart,setcart]=useCart();
    const[auth,setauth]=useAuth();
    //const navigate=useNavigate();

    const removecartitem=(pid)=>{
        try {
            let mycart=[...cart];
            let index=mycart.findIndex(item=> item._id===pid);
            mycart.splice(index,1);
            setcart(mycart);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Layout>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='text-center bg-light'>
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className='text-center'>
                        {cart?.length>0 ? `You have ${cart?.length} item in your cart ${auth?.token? "":", please login to checkout"}`:"Your Cart is Empty"}
                    </h4>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-7'>
                    {cart?.map((p)=>(
                        <div className='row mb-2 p-3 card flex-row'>
                            <div className='col-md-4'>
                                <img
                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-img/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    width={'100px'}
                                    height={'150px'}
                                />
                            </div>
                            <div className='col-md-8'>
                                <h4>{p.name}</h4>
                                <p>{p.description.substring(0,30)}</p>
                                <h4>Price: {p.price}</h4>
                                <button className='btn btn-danger' onClick={()=>removecartitem(p._id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    
                </div>
                <div className='col-md-3'>checkout | Payment</div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage