import React, { Component } from 'react';
import {Navbar} from './Navbar'

class AddPost extends Component {


    render(){

        return (
            <div>
                <Navbar />
                <div className="card bg-light mb-3">
                <div className="card-header bg-dark text-white">Add Post</div>
                <form onSubmit={(e) => this.onSubmitPost(e)}>
                  <input 
                    className="form-control col-4"
                    name="title"
                    id="title"
                    placeholder="Title"
                    required
                  />
                  <br />

                  <input
                    className="form-control col-4"
                    name="author"
                    id="author"
                    type="text"
                    placeholder="Author"
                    required
                  />
                  <br />

                  <select className="this" width={150} />


                </form>
              </div>
          </div>
        )
    }
}

export default AddPost;