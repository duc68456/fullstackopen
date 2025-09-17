import LanguageList from './LanguageList.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'

const BasicData = ({country}) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    // console.log(country.languages)
    // console.log(Object.values(country.languages))
    const countryCode = country.cca2
    const city = country.capital
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)
    const [temperature, setTemperature] = useState(null)
    const [icon, setIcon] = useState(null)
    const [description, setDescription] = useState(null)
    // const capitalLocation = 
    // axios.get(apiUrl)
    //     .then(response =>   {
    //         console.log(response.data)
    //         setLat(response.data[0].lat)
    //         setLon(response.data[0].lon)
    //     }
    //     )
    //     .then(response =>    {
    //         console.log(lat)
    //         console.log(lon)}
    //     )

    useEffect(() => {
        const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&appid=${apiKey}`

        axios.get(apiUrl)
            .then(response => {
                setLat(response.data[0].lat)
                setLon(response.data[0].lon)
            })
    }, [city, countryCode])

    useEffect(() => {
        if (lat && lon) {
        const dataApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        
        axios.get(dataApiUrl)
            .then(response => {
                console.log(response.data)
                setTemperature(response.data.main.temp)
                setIcon(response.data.weather[0].icon)
                setDescription(response.data.weather[0].description)
            })
        }
    }, [lat, lon])
    // console.log(capitalLocation)
    // const capitalLocation = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital},{country code}&limit={limit}&appid={API key}`)

    return (
    <>
        <h1> {country.name.common} </h1>
        <div> {`Capital ${city}`} </div>
        <div> {`Area ${country.area}`} </div>
        <h2>Languages</h2>
        <LanguageList languages = {Object.values(country.languages)} />
        <img src = {country.flags.png} alt = {country.flags.alt} />
        <h2> {`Weather in ${country.capital}`} </h2>
        {/* <CountryLine> {`Temperature {} Celcius`} </CountryLine> */}
        <img 
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
        alt={`${description}`} 
        />
        <div> {`Temperature ${temperature} Celcius`} </div>
    </>
    )
}

export default BasicData