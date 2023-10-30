import React from 'react'
import { Layout } from '../../component/layout/Layout'
import Usermenu from '../../component/layout/Usermenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
  const [auth] =useAuth();
  return (
    <Layout title={"DashBoard - Ecommerce App"}>
        <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> user Name : {auth?.user?.name}</h3>
              <h3> user Email : {auth?.user?.email}</h3>
              <h3> user Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard