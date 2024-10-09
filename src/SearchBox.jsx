import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState } from 'react';

export default function SearchBox({updateWeather}) {
    const API_URL = "http://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "31009b8b0c2156620628aeb0dc818727"
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    let getWeatherInfo = async () => {
        try{
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            let result = {
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                tempmin: jsonResponse.main.temp_min,
                tempmax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelslike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            }
            console.log(result);
            return result;
        } catch(err){
            throw err;
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    }
    let handleSubmit = async (evt) => {
        try{
            evt.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo();
            updateWeather(newInfo);
            setError(false);
        } catch(err) {
            setError(true); 
        } 
    }
    return (
        <div className='searchBox'>
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="Search your city" variant="outlined" required value={city} onChange={handleChange} /> 
            <br></br>
            <br></br>
            <Button variant="contained" type='submit'>Search</Button>
            {error && <p style={{color:"red"}}>This city does not exist!</p>}
            </form>
        </div>
    );
}