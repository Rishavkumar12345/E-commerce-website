import React from 'react'
import { Layout } from '../component/layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>The customer can choose to cancel an order any time before it's dispatched. The order cannot be canceled once it’s out for delivery. However, the customer may choose to reject it at the doorstep.</p>
          <p>The time window for cancellation varies based on different categories and the order cannot be canceled once the specified time has passed.</p>
          <p>In some cases, the customer may not be allowed to cancel the order for free, post the specified time and a cancellation fee will be charged. The details about the time window mentioned on the product page or order confirmation page will be considered final.</p>
          <p>In case of any cancellation from the seller due to unforeseen circumstances, a full refund will be initiated for prepaid orders.</p>
          
        </div>
      </div>
    </Layout>
  )
}

export default Policy