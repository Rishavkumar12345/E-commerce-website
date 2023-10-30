import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import Privateroute from "./component/Routes/Private";
import Forgotpassword from "./pages/Auth/Forgotpassword";
import Adminroute from "./component/Routes/Adminroute";
import Admindashboard from "./pages/admin/Admindashboard";
import Createcategory from "./pages/admin/Createcategory";
import Createproduct from "./pages/admin/Createproduct";
import Users from "./pages/admin/Users";
import Profile from "./pages/user/Profile";
import Order from "./pages/user/Order";
import Product from "./pages/admin/Product";
import Updateproduct from "./pages/admin/Updateproduct";
import Search from "./pages/Search";
import Productdetail from "./pages/Productdetail";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/category/:slug" element={<CategoryProduct/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/product/:slug" element={<Productdetail/>}/>
        <Route path='/dashboard' element={<Privateroute/>}>
          <Route path="user" element={<Dashboard/>}/>
          <Route path="user/profile" element={<Profile/>}/>
          <Route path="user/order" element={<Order/>}/>
        </Route>
        <Route path='/dashboard' element={<Adminroute/>}>
          <Route path="admin" element={<Admindashboard/>}/>
          <Route path="admin/create-category" element={<Createcategory/>}/>
          <Route path="admin/create-product" element={<Createproduct/>}/>
          <Route path="admin/product/:slug" element={<Updateproduct/>}/>
          <Route path="admin/product" element={<Product/>}/>
          <Route path="admin/users" element={<Users/>}/>
        </Route>
        
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<Forgotpassword/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/policy" element={<Policy/>}/>
        <Route path="*" element={<Pagenotfound/>}/>
      </Routes>
    </>
  );
}

export default App;
