import React from 'react'

const Button = ({ id, handleClick, text}) => {
  return (
    <button id={id} onClick={handleClick}>
      {text}
    </button>
  )
}
  
const ShowCountry = ({ country }) => {
  return (
    <div>
      <h1> {country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Languages</p>
      <ul>
      {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img className='flag' src={country.flag} alt='Country flag'></img>
    </div>
  )
}

const Country = ({ country, showSelected }) => {
  return (
    <div>
      <p>{country.name}</p>
      <Button id={country.name} text='Show' handleClick={() => showSelected(country)}/>
    </div>
  )
}

const Countries = ({ countries, showSelected, selected }) => {
  const numOfCountries = countries.length

  if (numOfCountries > 1 && numOfCountries < 10 ) {
    return (
      <div>
      {countries.map(country =>
        <Country key={country.name} country={country} showSelected={showSelected} selected={selected}/>)}
      {selected.show && <ShowCountry country={selected.country}/>}
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

export default Countries