import React from 'react'
import {Navbar} from "./Navbar";

class NotFound extends React.Component
{
  render() {
    return (
      <div className="container-fluid" style={{padding:0}}>
        <Navbar/>
        <div className="container">
          <div className="row margin-top-10">
            <div className="col-md-12">
              <h3 className="text-center">you just 404'd me</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default NotFound