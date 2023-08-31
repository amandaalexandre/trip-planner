import React, { useEffect, useState } from 'react';
import '../styles/main.css';

function Main() {
  const [ip, setIp] = useState("");
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null)
  const [currency, setCurrency] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const geoApiKey = import.meta.env.VITE_GEO_API_KEY;
  const [destinationCity, setDestinationCity] = useState("");
  const [mode, setMode] = useState("");


  const options = {
    method: 'GET',
    headers: {
      'X-BLOBR-KEY': geoApiKey
    }
  }

/*   const handleButtonClick = () => {
    setLoading(true);

  } */

  useEffect(() => {
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
          setCity(data.locationInfo.city);
          setCountry(data.country.name);
          setCurrency(data.country.currency.symbol)
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    };

    getUsersIP();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className='main'>
      <h1>Find your next adventure</h1>
      <p>Type your transportation + hotel budget estimate and we'll give you a list of possible traveling options. </p>
      <br />
      <span>
        I wanna go to {currency} &nbsp;
        <input type='text' placeholder='Type a city' value={destinationCity} onChange={e => setBudget(e.target.value)}></input>
      </span>
      <br />

      <span>by &nbsp;
        <select name="mode_transportation" id="mode" value={mode} onChange={e=> setMode(e.target.value)}>
          <option value="car">Car</option>
          <option value="pedestrian">Foot</option>
          <option value="scooter">Scooter</option>
          <option value="taxi">Taxi</option>
          <option value="bus">Bus</option>
          <option value="privateBus">Private Bus</option>
        </select>
      </span>

      <br />
      <button>Show me how!</button>
      <br/>
      (You're currently in {city}, {country}) 
    </main>
  );
}

export default Main;
