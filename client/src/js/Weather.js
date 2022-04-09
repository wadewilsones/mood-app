import React, { createElement } from 'react'
import Today from './date';
import ReactDOM from 'react-dom';
import DetectLocation from './weatherAPI';

//Call weather API

function Weather(){
    //Get user location
    function GeoObject(){
        navigator.geolocation.getCurrentPosition(userPosition);
    }

    function userPosition(location){
        let position = location.coords;
        console.log("latitude:" + position.latitude)
        console.log("long:" + position.longitude)
        let lat = position.latitude;
        let lot = position.longitude;
        //Display location
        DetectLocation(lat, lot);
    }

    let todayInfo = Today();
    const time = todayInfo[1];
    
    GeoObject();
    return(   
        <div className="weather_container">
        <p id="Location"></p> 
        <p id="temperature"></p>
        <p id="weather-decrs"></p>
        <p id="time">{time}</p>
        </div>
    )
}

export default Weather;
