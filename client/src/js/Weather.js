import React from 'react'
import Today from './date';
import DetectLocation from './weatherAPI';

//Call weather API

function Weather(){
    //Get user location
    /*
    function GeoObject(){
        navigator.geolocation.getCurrentPosition(userPosition);
    }

    function userPosition(location){
        let position = location.coords;
        let lat = position.latitude;
        let lot = position.longitude;
        //Display location
        DetectLocation(lat, lot);
    }

    let todayInfo = Today();
    const time = todayInfo[1];*/
    
    //GeoObject();
    return(   
        <div className="weather_container">
        <p id="Location">Pittsboro</p> 
        <p id="temperature">20C</p>
        <p id="weather-decrs">Sunny</p>
        </div>
    )
}

export default Weather;
