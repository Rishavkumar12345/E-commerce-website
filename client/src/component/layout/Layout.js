import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Helmet} from "react-helmet";
import  { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = ({children,title,description,keyword,author}) => {
  return (
    <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          
          <meta name="description" content={description} />
          <meta name="keywords" content={keyword} />
          <meta name="author" content={author} />
          
        </Helmet>
        <Header/>
        <main style={{minHeight:"72.45vh"}}>
            <Toaster/>
            {children}
        </main>
        <Footer/>
    </div>
  )
};

Layout.defaultProps={
  title:"Ecommerce App",
  description:"Mern-Stack project",
  keyword:"react,mern,node,mongodb",
  author:"Rishav"
}
