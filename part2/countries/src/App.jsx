import { useState, useEffect } from 'react'
import axios from 'axios'
// import CountryList from './components/countryList.jsx'
import CountryList from './components/CountryList.jsx'
import BasicData from './components/BasicData.jsx'

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const [searchCountry, setSearchCountry] = useState('')

  const [countries, setCountries] = useState([])

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase()
    .includes(searchCountry.toLowerCase()))

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  useEffect(() => {
  axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleChange = (event) => {
    setSelectedCountry(null)
    setSearchCountry(event.target.value)
  }

  // console.log(countries)
  // console.log(filteredCountries)

  // console.log(selectedCountry)

  // if(selectedCountry) {
  //   return <BasicData country = {selectedCountry} />
  // }

  return (
    <>
      <form>
        <label>
          find countries
          <input value = {searchCountry} onChange = {handleChange} />
        </label>
      </form>
      {selectedCountry && <BasicData country = {selectedCountry} />}
      {!selectedCountry && filteredCountries.length === 1 && <BasicData country = {filteredCountries[0]}/>}
      {!selectedCountry && filteredCountries.length > 1 && searchCountry && <CountryList onShowCountry = {handleShowCountry} countries = {filteredCountries} />}
    </>
  )
}

export default App
