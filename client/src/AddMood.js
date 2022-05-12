import './App.css';
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Header from './js/Header';


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
        
      <div id='addModd-container'>
        <Header location = '/testMood' />
        <section id='moodHolder'>
            <h3>Today I feel: </h3>
            <div class = 'mood-options'>
                <img src = 'media/happy.svg' alt ='happy' />
                <h4>Happy</h4>
            </div>
            <div class = 'mood-options'>
                <img src = 'media/joyful-2.svg' alt ='happy' />
                <h4>Joyful</h4>
            </div>
            <div class = 'mood-options'>
                <img src = 'media/Peaceful.svg' alt ='happy' />
                <h4>Peaceful</h4>
            </div>
            <div class = 'mood-options'>
                <img src = 'media/lovely.svg' alt ='happy' />
                <h4>Loving</h4>
            </div>
            <div class = 'mood-options'>
                <img src = 'media/stressed.svg' alt ='happy' />
                <h4>Stressed</h4>
            </div>
            <div class = 'mood-options'>
                <img src = 'media/upset.svg' alt ='happy' />
                <h4>Sad</h4>
            </div>
            <div class = 'mood-options'>
                <img src = 'media/angry.svg' alt ='happy' />
                <h4>Angry</h4>
            </div>
            <div class = 'mood-options'>
                <img src = 'media/frustrated.svg' alt ='happy' />
                <h4>Frustrated</h4>
            </div>
            <div class = 'mood-options'>
                <img src = 'media/grumpy.svg' alt ='happy' />
                <h4>Grumpy</h4>
            </div>

        </section>
        <section id = "symptoms">
            <h3>Is there anything else you want to mention?</h3>
            <textarea placeholder='Type here..'></textarea>
        </section>
        <button>Confirm</button>
      </div>
      

    )
}

export default AddMood;