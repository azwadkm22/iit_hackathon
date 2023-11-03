// BaseMap.js
import React, { useRef, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import countryData from '../geo_json_data/countries.json';

const BaseMap = () => {
  const mapRef = useRef(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const getColor = require('./MapColoringUtils.js');

//   let hoveredCountry;

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    mapRef.current.setView([lat, lng], 8); // Adjust the zoom level as needed
  };

  const onCountryMouseOver = (e) => {

    // const countryName = e.target.feature.properties.ADMIN;

    e.target.setStyle({
    //   fillColor: 'blue', // Change the fill color when hovered
    fillOpacity: 0.6,
      weight: 2, // Add a border when hovered
    });
    // setHoveredCountry(countryName);

  };

  const onCountryMouseOut = (e) => {

    // let color = getColor(hoveredCountry)
    e.target.setStyle({
    //   fillColor: color, // Restore the default fill color
    fillOpacity: 0.4,
      weight: 1, // Restore the default border
    });


    // const countryName = e.target.feature.properties.ADMIN;
    // setHoveredCountry(countryName);
  };

  const onCountryClicked = (e) => {
    e.target.setStyle({
        fillOpacity: 0.8, // Restore the default fill color
      weight: 1, // Restore the default border
    });
    // setHoveredCountry("None");   
    // console.log(e)
  };



  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    // console.log(countryName)
    layer.bindPopup(countryName)
    layer.on({
        // click: this.onCountryClick,
        mouseover: onCountryMouseOver,
        mouseout: onCountryMouseOut,
        click: onCountryClicked,
    })
  }


//   const getColor = (countryName) => {
//     let color;
//     switch (countryName) {
//         case 'Bangladesh':
//           color = 'red';
//           break;
//         case 'Canada':
//           color = 'blue';
//           break;
//         case 'Mexico':
//           color = 'green';
//           break;
//         default:
//           color = 'gray';
//       }

//     return color;
//   } 
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={8}
      style={{ width: '100%', height: '1000px' }}
      ref={mapRef}
      onClick={handleClick}
      maxZoom={8} // Set the maximum zoom level (adjust as needed)
      minZoom={3}
      continuousWorld={false}
      maxBounds={[
        [90, -180], // Upper left limit (latitude, longitude)
        [-90, 180], // Lower right limit (latitude, longitude)
      ]}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        // url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {/* Add GeoJSON layer for country boundaries */}
      {/* <GeoJSON
        data={countryData}
        style={() => ({
          fillColor: 'gray', // Initial fill color
          weight: 1, // Initial border weight
          color: 'black', // Border color
        })}
        
        
        onEachFeature={onEachCountry}
      /> */}


    <GeoJSON
    data={countryData}
    style={(feature) => {
        let color;

        color = getColor(feature.properties.ADMIN)

        return {
        fillOpacity: 0.4,
        fillColor: color,
        weight: 1,
        color: 'black',
        };
    }}

    onEachFeature={onEachCountry}
    />
    {/* <div className="hovered-country-info">
    Hovered Country: {hoveredCountry || 'None'}
    </div> */}
      
    </MapContainer>
  );
};

export default BaseMap;
