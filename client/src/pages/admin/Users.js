import React from 'react'
import { Layout } from '../../component/layout/Layout'
import Adminmenu from '../../component/layout/Adminmenu'

const Users = () => {
  return (
    <Layout title={"DashBoard - All Users"}>
        <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
          </div>
        </div>
        </div>
    </Layout>
  )
}

export default Users