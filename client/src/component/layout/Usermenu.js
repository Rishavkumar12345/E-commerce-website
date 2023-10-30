import React from 'react'
import { NavLink } from 'react-router-dom'

const Usermenu = () => {
  return (
    <div>
        <div className="list-group dashboard-menu">
          <h4>User Panel</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/order"
            className="list-group-item list-group-item-action"
          >
            Order
          </NavLink>
          
        </div>
    </div>
  )
}

export default Usermenu