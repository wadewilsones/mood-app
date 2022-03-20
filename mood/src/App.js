import './App.css';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Mood from './Mood';
import SignUp from './Sign-Up';
import Login from './Login';


class App extends React.Component {
  render(){
    return (
      <div>
          <Mood/>
        </div>
    );
  }
}

export default App;


