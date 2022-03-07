import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import DetectLocation from './js/weatherAPI';
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
        DetectLocation(lat,lot);
    }


    GeoObject();
    return(   
        <div className="weather_container">
        <p id="Location"></p> 
        <p id="temperature"></p>
        </div>
    )
}

export default Weather;