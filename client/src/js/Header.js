
import { Link } from "react-router-dom";
import React from "react";
import Today from './date';

let todayInfo = Today();
const date = todayInfo[0];

function Header(){
        return (
        <header>
                <section id='header-container'>
                        <h4>{date}</h4>
                        <h3>Hello username</h3>
                        <h5>Log Out</h5>
                </section>
        </header>)
}

export default Header;