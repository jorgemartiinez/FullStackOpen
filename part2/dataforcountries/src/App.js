import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Countries from './components/Countries';
import axios from 'axios';
import CountryOne from './components/CountryOne';

function App() {

  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [search, setSearch] = useState('');
  const URL = 'https://restcountries.eu/rest/v2';

  useEffect(() => {
    axios.get(`${URL}/all`)
      .then((response) => {
        let countries = response.data;
        setCountries(countries);
      });
  }, []);


  const handleSearch = (e) => {
    const inputSearchValue = e.target.value;
    setSearch(inputSearchValue);
    const filteredCountries = countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()));
    setFilterCountries(filteredCountries);
    console.log(filteredCountries);
  }


  const checkFilterRender = () => {
    if (filterCountries.length > 10) {
      return (<p>Too many matches, specify another filter</p>);
    } else if (filterCountries.length < 10 && filterCountries.length > 1) {
      return (<Countries countries={filterCountries} />);
    } else {
      let [country] = filterCountries;
      return <CountryOne country={country} />
    }

  }

  return (
    <div className="App">
      <Search handleSearch={handleSearch} />
      {(filterCountries.length > 0) ? checkFilterRender() : ''}

    </div>
  );
}

export default App;
