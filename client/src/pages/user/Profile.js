import React from 'react'
import Usermenu from '../../component/layout/Usermenu'
import { Layout } from '../../component/layout/Layout'


const Profile = () => {
  return (
    <Layout title={"DashBoard - Profile"}>
        <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-9">
            <h1>Profile</h1>
          </div>
        </div>
        </div>
    </Layout>
  )
}

export default Profile