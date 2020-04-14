import React, { useEffect, useState } from 'react'
import axios from 'axios';

const CountryOne = ({ country }) => {

    const [weather, setWeather] = useState([]);

    const URL = 'http://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '85c27ce2ebe43b2405f5e7be5329b499';

    useEffect(() => {
        axios.get(`${URL}?q=${country.capital}&appid=${process.env.REACT_API_KEY}&units=metric`)
            .then(response => setWeather(response.data));
    }, [country.capital]);

    return (
        <div>
            <h2>{country.name}</h2>
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Population:</strong> {country.population}</p>
            <h2>Languages</h2>
            {country.languages.map(lang => (<p key={lang.iso639_1}>{lang.name}</p>))}
            <img src={country.flag} alt={`Flag of ${country.name}`} width="300" height="200" />
            <h2>Weather in {country.capital}</h2>

            <Weather weather={weather} />

        </div>
    )
}

const Weather = ({ weather }) => {
    if (Object.keys(weather).length) {
        console.log(weather['main']['temp']);
        return (
            <>
                <p><strong>Temperature: </strong>{weather.main.temp}°C and feels like {weather.main.feels_like}°C</p>
                <p><strong>Description: </strong> {weather.weather[0].description}</p>
                <p><strong>Wind: </strong> {weather.wind.speed} speed</p>
            </>
        );
    }

    return (
        <h3>Loading weather data...</h3>
    )
}

export default CountryOne;
