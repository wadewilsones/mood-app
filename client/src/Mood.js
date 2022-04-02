//set up class
import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import Header from './js/Header';
import Weather from './js/Weather';
import { SendData } from './Sign-Up';

class Mood extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {mood:''};
        this.changeMoodGood = this.changeMoodGood.bind(this);
        this.changeMoodNeutral = this.changeMoodNeutral.bind(this);
        this.changeMoodBad = this.changeMoodBad.bind(this);     
    }

    displayMood(){
        let moodDiv = document.getElementById('mood');
        moodDiv.style.display = "block";
        moodDiv.innerHTML = "<p>My mood is " + this.state.mood + "!</p>";

        //display mood picture
        let moodPic = document.createElement('img');
        if(this.state.mood == "good"){
            //Prepare pic;
            moodPic.src = 'media/good.svg';
            moodPic.setAttribute("class", "moodPicClass"); 
           moodDiv.appendChild(moodPic); 
        
        }
        else if(this.state.mood == "neutral"){
            moodPic.src = 'media/neutral.svg';
            moodPic.setAttribute("class", "moodPicClass"); 
           moodDiv.appendChild(moodPic); 
        }
        else{
            moodPic.src = 'media/sad.svg';
            moodPic.setAttribute("class", "moodPicClass"); 
           moodDiv.appendChild(moodPic); 
        }
        

        let closeButn = document.createElement('button');
        closeButn.innerText = "Hide";
        closeButn.setAttribute("class", "closeTabBtn")
        moodDiv.appendChild(closeButn);

        closeButn.addEventListener('click', CloseTab);

        function CloseTab(){
            moodDiv.style.display = "none";
        }


    }

    changeMoodGood(){
        this.setState({mood:"good"}, () => {
            this.displayMood();
            console.log(this.state.mood);
        })
    }


    changeMoodNeutral(){
        this.setState({mood:"neutral"}, () => {
            console.log(this.state.mood);
            this.displayMood();
        })
    }

    changeMoodBad(){
        this.setState({mood:"bad"}, () => {
            console.log(this.state.mood);
            this.displayMood();
        })
    }
    
    render() {
        return(
            <div>
                <Header/>
                <div id='content-container'>
                    <section id ="mood-section">
                    <h3>How do you feel today?</h3>
                    <div id="mood-container">
                        <div id ="good">
                            <button className = "userMood" onClick = {this.changeMoodGood}>Good</button>
                        </div>
                        <div id ="neutral">
                            <button  className = "userMood" onClick={this.changeMoodNeutral}>Neutral</button>
                        </div>
                        <div  id ="bad">
                            <button className = "userMood" onClick={this.changeMoodBad} >Bad</button>
                        </div>
                    </div>
                    <div id="mood"></div>
                    </section>
                <Weather/>
                </div>
            </div>
        )
    }
}

export default Mood;