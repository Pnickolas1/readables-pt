import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import AddPost from './components/AddPost';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the jungle</h2>
        </div>
        <div>
          <AddPost />
        </div>
      </div>
    );
  }
}

export default App;
