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
        this.username = props.username;
        this.changeMoodGood = this.changeMoodGood.bind(this);
        this.changeMoodNeutral = this.changeMoodNeutral.bind(this);
        this.changeMoodBad = this.changeMoodBad.bind(this);     
    }

    displayMood(){
        console.log('Mood is:' + this.state.mood);
    }

    changeMoodGood(){
        this.setState({mood:"good"}, () => {
            this.displayMood();
        })
    }


    changeMoodNeutral(){
        this.setState({mood:"neutral"}, () => {
            this.displayMood();
        })
    }

    changeMoodBad(){
        this.setState({mood:"bad"}, () => {
            this.displayMood();
        })
    }


    
    //training


    render() {
        return(
            <div>
            <Header username = {this.username}/>
            <section id='mood-days'>
                <div className='days-div'>
                <p>April 26</p>
                <img src="media/good.svg"></img>
                </div>
                <div className='days-div'>g</div>
                <div className='days-div'>g</div>
                <div className='days-div'>g</div>
            </section>
            <div className = {this.state.mood? "TodayMood" : "TodayMoodHidden"}>So, today you feel {this.state.mood}</div>
            <div id='content-container'>
                <section id ="mood-section">
                <h3>How do you feel today?</h3>
                <div id="mood-container">
                    <div id ="good" onClick = {this.changeMoodGood}>
                        <img src="media/good.svg"></img>
                        <button className = "userMood" >Good</button>
                    </div>
                    <div id ="neutral">
                    <img src="media/neutral.svg" onClick={this.changeMoodNeutral}></img>
                        <button  className = "userMood" >Neutral</button>
                    </div>
                    <div  id ="bad">
                    <img src="media/sad.svg" onClick={this.changeMoodBad} ></img>
                        <button className = "userMood" >Horrible</button>
                    </div>
                </div>
                </section>
            <section id="symtomps">
                <form>
                    <label>Got any symptoms?</label><br/>
                    <textarea placeholder='If there are any concerns you can add them here...'></textarea>
                    <input type="submit" value = "Add symptoms"></input>
                </form>
            </section>

            <Weather/>
            </div>
        </div>
        )
    }
}

export default Mood;