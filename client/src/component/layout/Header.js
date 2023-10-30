import React from 'react'
import {NavLink,Link} from "react-router-dom"
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import Usecategory from '../../hooks/Usecategory'
import { useCart } from '../../context/Cart'

const Header = () => {
  const[cart,setcart]=useCart();
  const[auth,setauth]=useAuth();
  const categories=Usecategory();
  const handlelogout=()=>{
    setauth({
      ...auth,user:null,token:""
    });
    localStorage.removeItem("auth")
    toast.success("Logout Successfully")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-black">
      <div className="container-fluid">
        <Link to="/"  className="navbar-brand">🛒 Ecommerce App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput/>
            <li className="nav-item">
              <NavLink to="/" className="nav-link" >Home</NavLink>
            </li>
            <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to={"/categories"} data-bs-toggle="dropdown">
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link className="dropdown-item" to={`/category/${c.slug}`}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul></li>
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" >Register</NavLink>
                </li> 
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">Login</NavLink>
                </li>
              </>
            ):(

              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {auth?.user?.name}
                </Link>
                <ul className="dropdown-menu">
                  <li><NavLink to={`/dashboard/${auth?.user?.role ==="admin"  ? "admin" :"user"}`} className="dropdown-item">Dashboard</NavLink></li>
                  <li><NavLink to="/login" onClick={handlelogout} className="dropdown-item">LogOut</NavLink></li>
                </ul>
              </li>
            )}  
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link" >Cart <span className='text-danger'>({cart?.length})</span></NavLink>
            </li>          
          </ul>
        </div>
      </div>
    </nav>

    </>
  )
}

export default Header