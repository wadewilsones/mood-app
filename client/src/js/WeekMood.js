import '../App.css';
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Today from './date';
import { set } from 'express/lib/application';


let todayInfo = Today();
let formateMonth = todayInfo[3];

let  WeekMood = (props) =>{

    let mood = props.mood;

    let [ weekMood, setWeekMood ] = useState(
        {
            0: {
                date:todayInfo[2].threeDaysAgo,
                mood:''
            },
            1: {
                date:todayInfo[2].twoDaysAgo,
                mood:''
            },
            2: {
                date:todayInfo[2].yersterday,
                mood:''
            }
        }
    )


    //Display week's moods

    useEffect(() => {
        fetch("/usersFeeling", {
            method:"GET",
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        })
        .then (response => response.json())
        .then(data => {

            for(let i = 0; i < Object.keys(weekMood).length; i++){
                //Check each week day for concurrence
                for(let index = 0; index < data.length; index++){
                    let frontDate = weekMood[i].date.toLocaleDateString('en-CA').split('T');
                    let dateToCompare = data[index].mood_date.split('T');
                    if(dateToCompare[0] == frontDate[0]){
                        setWeekMood(
                            (prevState) => ({...prevState, 
                                [i]:{ 
                                    ...prevState[i],
                                    mood:data[index].mood_descr}
                               
                            } )
                            
                        )
                
                    }
                }
            }


        })
        

    },[])

   let formatDates = (rowDate) => {
        rowDate = formateMonth(rowDate.getMonth() + 1) +  ' ' + rowDate.getDate();
        return rowDate;
    }


    return(
        <section id='mood-days'>

                <div className='days-div'>
                    {formatDates(weekMood[0].date)}<br/>
                    <img alt ='mood' src = {weekMood[2].mood === 'good' ? "media/good.svg" 
                    : weekMood[2].mood === 'bad' ? "media/sad.svg"
                    : "media/neutral.svg"  }></img>
                </div>

                <div className='days-div'>
                {formatDates(weekMood[1].date)}<br/>
                    <img alt ='mood' src = {weekMood[1].mood === 'good' ? "media/good.svg" 
                    : weekMood[1].mood === 'bad' ? "media/sad.svg"
                    : "media/neutral.svg" } ></img>

                </div>
                <div className='days-div'>
                    {formatDates(weekMood[2].date)}<br/>
                    <img alt ='mood' src = {weekMood[0].mood === 'good' ? "media/good.svg" 
                    :weekMood[0].mood === 'bad' ? "media/sad.svg"
                    : "media/neutral.svg" }></img>
                </div>

                <div className='days-div'>Today<br/>
                <img src = {mood === 'good' ? "media/good.svg" 
                 : mood === 'bad' ? "media/sad.svg"
                 : "media/neutral.svg" } alt = 'mood'></img>
                </div>
            </section>
    )
}

export default WeekMood;