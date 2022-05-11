import '../App.css';
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Today from './date';

let AddMood = (props) =>{

    /*  <div id='content-container'>
            <section id ="mood-section">
            <h3>How do you feel today?</h3>
            <div id="mood-container">
                <div id ="good" onClick = {this.changeMoodGood}>
                    <img src="media/good.svg" alt ='Good Mood'></img>
                    <button className = "userMood" >Good</button>
                </div>
                <div id ="neutral">
                <img src="media/neutral.svg" onClick={this.changeMoodNeutral} alt ='neural Mood'></img>
                    <button  className = "userMood" >Neutral</button>
                </div>
                <div  id ="bad">
                <img src="media/sad.svg" onClick={this.changeMoodBad} alt ='sad Mood'></img>
                    <button className = "userMood" >Horrible</button>
                </div>
            </div>
            </section>
        <section id="symtomps">
            <form onSubmit = {this.HandleSymptoms}>
                <label>Got any symptoms?</label><br/>
                <textarea placeholder='If there are any concerns you can add them here...'></textarea>
                <input type="submit" value = "Add symptoms"></input>
            </form>
            <p>{this.state.symptoms}</p>
        </section>
        </div>*/
    return(

      <div>Mood is good!</div>

    )
}

export default AddMood;