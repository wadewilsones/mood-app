import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Mood from './Mood';
import SignUp from './Sign-Up';
import Login from './Login';

let root = document.getElementById('root');

ReactDOM.render( <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="login" element={<Login />} />
      <Route path="signUp" element={<SignUp />} />
    </Routes>
  </BrowserRouter>, root);

