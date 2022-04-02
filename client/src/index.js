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

ReactDOM.render( <App />, root);