import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {isEmpty} from "lodash";


const Countries=({handleCountryChange})=>{
  return(
  <form>
    find countries<input onChange={handleCountryChange}></input>
  </form>
  )
}
const ShowWeather=({country,weather})=>{
  if(isEmpty(weather)) return null
  return(
    <div>
      <h2>Weather in {country.capital}</h2>
      <p><b>temperature: </b>{weather.current.temperature} Celcius</p>
      <img src={weather.current.weather_icons[0]} alt='fail to load icons' width='100' height='100'/>
      <p><b>wind:</b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
  )
}
const ShowCountry=({country})=>{
  const [weather, setWeather]=useState({})
  useEffect(()=>{
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then(response=>{
        if(response.data.current) setWeather(response.data)
      })
  },[country])  
  if (isEmpty(country)) return null
  return(
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <div>
        <ul>
        {country.languages.map(language=><li key={language.name}>{language.name}</li>)}
        </ul>
      </div>
      <img src={country.flag} alt="fail to load flag" width="200" height="200"/>
      <ShowWeather country={country} weather={weather}/>
    </div>
  )
}

const QueryCountries=({allCountries,inputCountry,setCountry})=>{
  
  if (allCountries.length===0) return null
  const results=allCountries.filter(country=>country.name.match(new RegExp(inputCountry,'i')))
  if(results.length>10){
    return(<div>Too many matches, specify another filter</div>)
  }
  else if (results.length>1){
    return (
      <div>
          {results.map(result=>{
            return(
             <div key={result.name}>
             {result.name}
             <button  onClick={()=>setCountry(result)}>show</button>
             </div>
             )})
          }
      </div>
    )
  }
  else if(results.length===1){
    return (
      <ShowCountry country={results[0]}/>
    )
  }
  else return <div>Cannot find any country</div>
}


const App=()=>{
  const [allCountries,setAllCountries]=useState([])
  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response=>{
        setAllCountries(response.data)
      })
  },[])

  const [inputCountry,setInputCountry]=useState('')
  const [country,setCountry]=useState({})
  const handleCountryChange=(event)=>{
    setInputCountry(event.target.value)
    setCountry({})}

  
  return(  
    <div>
      <Countries handleCountryChange={handleCountryChange} />
      <QueryCountries allCountries={allCountries} inputCountry={inputCountry} setCountry={setCountry} />
      <ShowCountry country={country}/>
    </div>
    
  )
}

ReactDOM.render(<App />,document.getElementById('root'));


