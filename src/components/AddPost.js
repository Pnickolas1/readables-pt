import React, { Component } from 'react';

class AddPost extends Component {


    render(){

        return (
            <div>
              <div className="card-header">Add Post</div>
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

                <select className="this" />


              </form>
            </div>
        )
    }
}

export default AddPost;