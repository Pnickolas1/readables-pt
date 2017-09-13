import React, { Component } from 'react';
import { Navbar } from '../Navbar';


class PostPage extends Component {
    

    render(){
      return (
            <div className="container-fluid">
                <Navbar />
                <p> this is a test </p>
            </div>
        )
    }
};

export default PostPage;