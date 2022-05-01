
import { Link } from "react-router-dom";
import React from "react";
import Login from '../Login';
import Today from './date';

let todayInfo = Today();
const date = todayInfo[0];

function Header(props){
        return (
        <header>
                <section id='header-container'>
                        <h4>{date}</h4>
                        <h3>Hello {props.username}</h3>
                        <a>Logout</a>
                </section>
        </header>)
}

export default Header;