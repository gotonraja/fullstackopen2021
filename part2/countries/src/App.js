import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Filter = ({ text, searchTerm, handleSearch }) => {
  return (
    <form>
    <div>
        {text}
        <input
        type="text"
        value={searchTerm}
        onChange={handleSearch} required />
    </div>
  </form>
  )
}

const Button = ({ id, handleClick, text}) => {
  console.log('button clicked')
  return (
    <button id={id} onClick={handleClick}>
      {text}
    </button>
  )
}

const ShowCountry = ({ country }) => {
  console.log(country)
  return (
    <div>
      <h1> {country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Languages</p>
      <ul>
      {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt='Country flag'></img>
    </div>
  )
}

const handShowCountry = (country) => {
  console.log("Clicked?" + country.name)
}

const Country = ({ country }) => {
  console.log('Country ..')
  console.log(country)

  const handleClick = () => {
    console.log('Show ', country.name)
  }

  return (
    <div>
      <p>{country.name}</p>
      <button id={country.name} onClick={handleClick}>
        Show
      </button>
    </div>
  )
}

const Countries = ({ countries }) => {
  const numOfCountries = countries.length

  if (numOfCountries > 1 && numOfCountries < 10 ) {
    return (
      <div>
      {countries.map(country =>
        <Country key={country.name} country={country}/>)}
      </div>
    )
  }
  else if ( numOfCountries === 1) {
    return (
      <div>
        <ShowCountry country={countries[0]}/>
      </div>
    )
  }
  else if (numOfCountries > 10) {
    console.log('Got ', numOfCountries)
    return (
      <div>
        <p> Too many matches, specify another filter </p>
      </div>
    )
  }
  else
  {
    return (
      <div></div>
    )
  }
}

const App = () => {
  const [newSearchTerm, setNewSearchTerm] = useState('')
  const [countries, setCountries] = useState([])
  const [show, setShow] = useState(false)

  const handleSearchTermChange = (event) => {
    setNewSearchTerm(event.target.value)
  }

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all' )
      .then(response => {
        console.log('promise fullfiled')
        setCountries(response.data)
      })
  }

  useEffect( hook, [])

  const filteredCountries = countries.filter(country =>{
      if (newSearchTerm !== '') {
        return (country.name.toLowerCase().indexOf(newSearchTerm.toLowerCase()) !== -1 )
      }
      else
      {
        return null
      }
    } 
  )


  
  return (
    <div>
      <Filter
      text='Find Countries  '
      searchTerm={newSearchTerm}
      handleSearch={handleSearchTermChange}/>
      <Countries countries={filteredCountries}/>
    </div>
  );
}

export default App;
