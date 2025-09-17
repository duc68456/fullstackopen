// import CountryLine from './CountryLine.jsx'
// const CountryList = ( {countries, onShowCountry} ) => {
//     const handleShowCountry = (country) => {
//         onShowCountry(country)
//     }
    
//     return (
//         countries.length > 10 ?
//         <div>Too many</div> :
//         <>
//             {countries.map(country => 
//                 <CountryLine onShowCountry = {() => handleShowCountry} key = {country.cca3} country = {country} />
//             )}
//         </>
//     )
// }

// export default CountryList

import CountryLine from './CountryLine.jsx'

const CountryList = ({ countries, onShowCountry }) => {
    return (
        countries.length > 10 ?
        <div>Too many matches, specify another filter</div> :
        <>
            {countries.map(country => 
                <CountryLine 
                    key={country.cca3} 
                    country={country} 
                    onShowCountry={onShowCountry}  
                />
            )}
        </>
    )
}

export default CountryList