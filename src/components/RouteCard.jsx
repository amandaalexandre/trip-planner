import React from 'react'
import {SiUber} from 'react-icons/si';
import {RiTaxiLine} from 'react-icons/ri'
import {FaWalking, FaCar, FaBusAlt, FaCarAlt} from 'react-icons/fa'
import '../styles/card.css'

function RouteCard(props) {

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };

    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(undefined, options);
  }

  return (
    <div key={props.id} className='main-result-card'>
      {/* Mode of transportation */}
      <div className='card-layout'>   

          {/* Title */}
          <h2>{props.type.charAt(0).toUpperCase()+props.type.substring(1)} 
          <br/>
          {props.transport.mode != 'pedestrian' ? props.transport.mode.charAt(0).toUpperCase()+props.transport.mode.substring(1) : ""}</h2>
          
          <div className='mode-icon-container'>
            {/* Conditionally render icons based on result.type */}
            {props.type === 'rented' && <FaCarAlt className='mode-icon' />}
            {props.type === 'vehicle' && <FaCar className='mode-icon' />}
            {props.type === 'taxi' && <RiTaxiLine className='mode-icon' />}
            {props.type === 'transit' && <FaBusAlt className='mode-icon' />}
            {props.type === 'pedestrian' && <FaWalking className='mode-icon' />}
          </div>

          <p className='card-agency'>
              {(props.type === 'rented' || props.type === 'transit') ? (
                <span>
                  {props.agency.name} <br />
                  <a href={props.agency.website}>Buy ticket</a>
                </span>
              ) : null}
          </p>
          
          <p className='card-details'>Departure:</p><p> {formatDateTime(props.departure.time)}</p>
          <p className='card-details'>Arrival: </p><p>{formatDateTime(props.arrival.time)}</p>
          <p className='card-details'>Place of arrival: </p><p>{props.arrival.place.name || 'You arrived!'}</p>
        </div>
        </div>
  )
}

export default RouteCard