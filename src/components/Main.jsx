import React, { useEffect, useState } from 'react';
import '../styles/main.css';
import {SiUber} from 'react-icons/si';
import {RiTaxiLine} from 'react-icons/ri'
import {FaWalking, FaBusAlt, FaCar} from 'react-icons/fa'

function Main() {
  //User's IP
  const [ip, setIp] = useState("");

  //GeoAPI Info
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null)
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const geoApiKey = import.meta.env.VITE_GEO_API_KEY;
  const hereApiKey = import.meta.env.VITE_HERE_API_KEY;

  const [selectedCity, setSelectedCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [matches, setMatches] = useState([]);
  const [notice, setNotice] = useState("");
  const [results, setResults] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      'X-BLOBR-KEY': geoApiKey
    }
  }

  // Get user's IP address
  const getUsersIP = () => {
    fetch("https://api.ipify.org/?format=json")
      .then(response => {
        if (!response.ok) {
          throw new Error('Error getting your IP address!');
        }
        return response.json();
      })
      .then(data => {
        setIp(data.ip);
        setLoading(false);

        // Make the second API call using the obtained IP address
        return fetch(`https://apis.thatapicompany.com/geo-ip-api-community/locations/iplookup?ip=${data.ip}`, options);
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching data from Geo API');
        }
        return response.json();
      })
      .then(data => {
        setLat(data.point.lat)
        setLon(data.point.lon)
        setCity(data.locationInfo.city);
        setCountry(data.country.name);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsersIP();
  }, []);

  const handleCityTyping = async (e) => {
    const value = e.target.value;
    setSearchedCity(value)
    // Perform the fetch for the API call
    const response = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${value}&apiKey=${hereApiKey}`);

    // Check if the response is successful
    if (response.ok) {
      const data = await response.json();
      // Extract the items from the data and setMatches
      setMatches(data.items);
    } else {
      // Handle the case where the fetch fails
      setMatches([]); // Clear the suggestions
    }
  }

  const handleMatchSelection = (match) => {
    setSelectedCity(match);
    setMatches([]);

    // Getting destination's geocodes and doing the routing API call
    fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${match.address.label}&apiKey=${hereApiKey}`)
    .then(response => response.json())
    .then(data => fetch('https://intermodal.router.hereapi.com/v8/routes?apiKey=6CtvgYh-JhsXNrxpw1FAH3ArzYNyRyZbCA2696AtN9w&destination=52.40358749909618,13.058351363288239&origin=52.53105637575095,13.384944833815183'))
    /* .then(data => fetch(`https://intermodal.router.hereapi.com/v8/routes?apiKey=${hereApiKey}&destination=${data.items[0].position.lat},${data.items[0].position.lng}&origin=${lat},${lon}`)) */
    .then(res2 => res2.json())
    .then(data2 => {
      console.log(data2)
      if (data2.notices) {
        setNotice(data2.notices[0].title)
      } 
      setResults(data2.routes[0].sections)
    })
    .catch(error => console.error('Error fetching geocode data from your chosen city.', error))

  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className='main'>
      <h1>Find your next adventure</h1>
      <p>Type your destination and we'll show you how you'll get there. </p>
      <br />
      <span>
        I wanna go to &nbsp;
        <input type='text' placeholder='Enter a city name' value={searchedCity} onChange={handleCityTyping}></input>
      </span>
      
      {/* Display search suggestions */}
      {matches.length > 0 && (
        <div className="search-suggestions">
          {matches.map((match) => (
            <div key={match.id} onClick={() => handleMatchSelection(match)}>
              {match.title} {/* Display the match title or any other relevant data */}
            </div>
          ))}
        </div>
      )}
      {/* ... End of search suggestions */}
      <br/>
      (You're currently in {city}, {country}) 

      {notice && (
        <div className='main-notice'><p>{notice}</p></div>
      )}

      {results.length > 0 && (
        results.map(result => 
        <div key={result.id} className='main-result-card'>
           {/* Mode of transportation */}
           <div>
              {/* Conditionally render icons based on result.type */}
              {result.type === 'rented' && <SiUber className='mode-icon' />}
              {result.type === 'vehicle' && <FaCar className='mode-icon' />}
              {result.type === 'transit' && <FaBusAlt className='mode-icon' />}
              {result.type === 'taxi' && <RiTaxiLine className='mode-icon' />}
              {result.type === 'pedestrian' && <FaWalking className='mode-icon' />}
          </div>

          <p>{result.type.charAt(0).toUpperCase()+result.type.substring(1)} </p>
          <p>{result.transport.mode.charAt(0).toUpperCase()+result.transport.mode.substring(1)}</p>
          
          <p>{(result.type) === 'rented' || result.type === 'transit'  ? (<a href={result.agency.website}>{result.agency.name}</a>):null}</p>
          
          <p>Departure: {result.departure.time}</p>
          <p>Arrival: {result.arrival.time}</p>
          <p>Place: {result.arrival.place.name || 'You arrived!'}</p>
        </div>)
      )} 

    </main>
  );
}

export default Main;
