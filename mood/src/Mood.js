//set up class
import React, { createElement } from 'react';
import ReactDOM from 'react-dom';

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
        moodDiv.innerHTML = "<p>My mood is " + this.state.mood + "</p>";
        //display mood picture
        if(this.state.mood == "good"){
           moodDiv.style.backgroundImage = 'url(media/good.svg)';
        }
        else if(this.state.mood == "neutral"){
            moodDiv.style.backgroundImage = 'url(media/good.svg)';
        }
        else{
            moodDiv.style.backgroundImage = 'url(media/good.svg)';
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
                <section id ="mood-section">
                <h3>Hello User, <br/> How do you feel today?</h3>
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
            </div>
        )
    }
}

export default Mood;