import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";
import "./Weather.css";

export default function WeatherApp() {

    let [weather, setWeather] = useState({
        city: "Delhi",
        feelslike: 34.36,
        humidity: 28,
        temp: 35.06,
        tempmax: 35.06,
        tempmin: 35.06,
        weather: "clear sky"
    });

    let updateWeather = (newInfo) => {
        setWeather(newInfo);
    }

    return(
        <div className="weather">
            <h1>Weather APP</h1>
            <SearchBox updateWeather={updateWeather}/>
            <InfoBox info={weather}/>
        </div>
    );
}