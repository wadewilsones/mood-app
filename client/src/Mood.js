//set up class
import React from 'react';
import Header from './js/Header';
import WeekMood from './js/WeekMood';
import Weather from './js/Weather';
import { Link }  from "react-router-dom";

//import Weather from './js/Weather';


class Mood extends React.Component{
  
    constructor(props){
        super(props);
        //Setting up state
        this.state = {
            mood:'',
            symptoms:'',
            date:new Date(),
            username: props.username,
            userId: props.userId
        };
        
    }
    
    
    componentDidMount(){// send to weekMoods
   
        fetch("/usersFeeling", {
            method:"GET",
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        })
        .then (response => response.json())
        .then(data => {
                //Compare today's date and DB dates
            let databaseDate = data[data.length - 1].mood_date.split('T');
            let sessionDate = this.state.date.toLocaleDateString('en-CA').split('T');
            if(databaseDate[0] === sessionDate[0]){
                this.setState({
                    mood: data[data.length - 1].mood_descr,
                    symptoms:data[data.length - 1].symptoms
                })
            }
              
            })
    }


    render() {
        return(
            <div id='moodContainer'>
                    <div id = 'Grid-holder-mood'>
                        <Header username = {this.state.username} location = '/' />

                        <section id = 'weatherSection'>
                            <h3>Today’s weather</h3>
                            <Weather />
                        </section>

                        <section id = "checkinSection">
                            <h3>These are your last check-ins</h3>
                            <WeekMood mood = {this.state.mood}/>
                        </section>

                        <section id='moodEdit' className = {this.state.mood? 'MoodEditOn' : 'MoodEditOff'}>
                        {this.state.mood? 
                            <div id='current-mood-container'>
                                <h3>Today I feel: </h3>
                                <div>
                                    <h2>{this.state.mood}</h2>
                                    <p>Notes: {this.state.symptoms}</p>
                                    <img src = {'/media/' + this.state.mood +'.svg'} alt = {this.state.mood + 'mood'}></img>
                                </div>
                              
                            </div> 
                            :  <h2>No entries for today</h2>}
                        </section>

                        <section id={this.state.mood? 'MoodOn' : 'ChangeMoodSection'}>
                            <div>
                                <Link to ="/addMood">+</Link>
                                <h4>{this.state.mood? 'Edit Mood' : 'Add mood'}</h4>
                            </div>
                        </section>

                        </div> 
            </div> 
        )
    }
}

export default Mood;