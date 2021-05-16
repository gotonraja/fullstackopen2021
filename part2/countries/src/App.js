import React, { useEffect, useState } from 'react'
import Countries from './components/Country'
import Filter from './components/Filter'
import axios from 'axios'
import './index.css' 

const App = () => {
  const [newSearchTerm, setNewSearchTerm] = useState('')
  const [countries, setCountries] = useState([])
  const [selected, setShow] = useState({country:[], show:false})

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
   },[])

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

  const showSelected = (country) => {
    console.log(`Time to show ${country.name} ${selected.country.name}`)
  
    //Check if user wants to see new country
    if (country.name !== selected.country.name ) {
      console.log('here')
      const newShow = {...selected, country:country, show:true}
      setShow(newShow)
    }
    else
    {
      //Set show to false if user wants to hide the selected country
      const newShow = {...selected, show:!selected.show}
      setShow(newShow)
    }
  }

  // For setshow to false if the User searches a new term
  if ( (newSearchTerm === '') && selected.show === true) {
    const newShow = {...selected , show:false}
    setShow(newShow)
  }

  return (
    <div>
      <Filter
      text='Find Countries  '
      searchTerm={newSearchTerm}
      handleSearch={(event) => setNewSearchTerm(event.target.value)}/>
      <Countries countries={filteredCountries} showSelected={showSelected} selected={selected}/>
    </div>
  )
}

export default App;
