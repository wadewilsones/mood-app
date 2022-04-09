import './App.css';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Mood from './Mood';
import {
  BrowserRouter, Routes, Route 
} from "react-router-dom";
import SignUp from './Sign-Up';
import Login from './Login';


class App extends React.Component {

  render(){
    return (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/login"  element={<Login />}  />
      <Route path="/sign-up" element={<SignUp/>} />
    </Routes>

  </BrowserRouter>
     
    );
  }
}

export default App;


