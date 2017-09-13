import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import AddPost from './components/AddPost';
import { Navbar } from './components/Navbar'
import PostPage from './components/Posts/PostPage';


class App extends Component {
  render() {
    return (
        <div>
          <PostPage />
        </div>
    );
  }
}

export default App;
