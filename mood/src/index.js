import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './Header';

let root = document.getElementById('root');
let header = document.getElementById('header-main');

ReactDOM.render(<App/>, root);
ReactDOM.render(<Header/>, root);
