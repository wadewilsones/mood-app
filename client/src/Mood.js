//set up class
import React from 'react';
import Header from './js/Header';
import WeekMood from './js/WeekMood';
import AddMood from './AddMood';
import Weather from './js/Weather';
import { Link }  from "react-router-dom";

//import Weather from './js/Weather';


class Mood extends React.Component{
  
    _isMounted = false;

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
        this._isMounted = true;
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
            if(databaseDate[0] == sessionDate[0]){
                this.setState({
                    mood: data[data.length - 1].mood_descr,
                    symptoms:data[data.length - 1].symptoms
                })
            }
              
            })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }
    

    render() {
        return(
            <div id='moodContainer'>
                    <div>
                        <Header username = {this.state.username} location = '/' />

                        <section id = 'weatherSection'>
                            <h3>Today’s weather</h3>
                            <Weather />
                        </section>

                        <section id = "checkinSection">
                            <h3>These are your last check-ins</h3>
                            <WeekMood mood = {this.state.mood}/>
                        </section>

                        <section id='moodEdit'>
                        <h3> {this.state.mood? this.state.mood : "No entries for today"}</h3>
                        </section>

                        <section id='ChangeMoodSection'>
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