import '../App.css';
import React, { useState, useEffect } from "react";
import Today from '../js/date';
import '../style/WeeklyMoodStyle.css'

let todayInfo = Today();
let formateMonth = todayInfo[3];

const  WeekMood = () => {

    let [ weekMood, setWeekMood ] = useState(
        {
            0: {
                date:todayInfo[2].sixDaysAgo,
                mood:''
            },
            1: {
                date:todayInfo[2].fiveDaysAgo,
                mood:''
            },
            2:{
                date:todayInfo[2].fourDaysAgo,
                mood:''
            },
            3:{
                date:todayInfo[2].threeDaysAgo,
                mood:''
            },
            4:{
                date:todayInfo[2].twoDaysAgo,
                mood:''
            },
            5:{
                date:todayInfo[2].yersterday,
                mood:''
            }
        }
    )
    let [mood, setTodayMood] = useState(null);

    //Display week's moods

    useEffect(() => {
        fetch("http://localhost:3000/api/weekData", {
            method:"GET",
            headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then (response => response.json())
        .then(data => {
            console.log(data.length)
            for(let i = 0; i < Object.keys(weekMood).length; i++){
                //Check each week day for concurrence
                for(let index = 0; index < data.length; index++){

                    let frontDate = weekMood[i].date.toLocaleDateString('en-CA').split('T');
                    let dateToCompare = data[index].mood_date.split('T');

                    console.log(frontDate[0] + " " + dateToCompare[0]);

                    if(dateToCompare[0] === frontDate[0]){
                        console.log('MATCH');
                        console.log(data[index].mood_id);
                        setWeekMood(
                            (prevState) => ({...prevState, 
                                [i]:{ 
                                    ...prevState[i],
                                    mood:data[index].mood_id}
                               
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

    let noData = "No entry";

    return(
        <section className='weekMainContainer'>
                <h3>Your weekly data</h3>
                <div id='mood-days'>
                    <div className='days-div'>
                        {formatDates(weekMood[0].date)}<br/>
                        <p>{weekMood[0].mood? weekMood[0].mood : noData}</p>
                    </div>

                    <div className='days-div'>
                    {formatDates(weekMood[1].date)}<br/>
                    <p>{weekMood[1].mood? weekMood[1].mood : noData}</p>

                    </div>
                    <div className='days-div'>
                        {formatDates(weekMood[2].date)}<br/>
                        <p>{weekMood[2].mood? weekMood[2].mood : noData}</p>
                    </div>
                    <div className='days-div'>
                        {formatDates(weekMood[3].date)}<br/>
                        <p>{weekMood[3].mood? weekMood[3].mood : noData}</p>
                    </div>
                    <div className='days-div'>
                        {formatDates(weekMood[4].date)}<br/>
                        <p>{weekMood[4].mood? weekMood[4].mood : noData}</p>
                    </div>
                    <div className='days-div'>
                        {formatDates(weekMood[5].date)}<br/>
                        <p>{weekMood[5].mood? weekMood[5].mood : noData}</p>
                    </div>

                    <div className='days-div'>Today<br/>
                    <p>{mood? mood: 'No entry'}</p>
                    </div>
                </div>
                
            </section>
    )
}

export default WeekMood;