import React from 'react'
import Usermenu from '../../component/layout/Usermenu'
import { Layout } from '../../component/layout/Layout'



const Order = () => {
  return ( 
    <Layout title={"DashBoard - Order"}>
        <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-9">
            <h1>All Order</h1>
          </div>
        </div>
        </div>
    </Layout>
  )
}

export default Order