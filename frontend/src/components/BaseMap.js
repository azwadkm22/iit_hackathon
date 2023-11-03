// BaseMap.js
import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import countryData from '../geo_json_data/countries.json';

const BaseMap = () => {
  const mapRef = useRef(null);

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    mapRef.current.setView([lat, lng], 8); // Adjust the zoom level as needed
  };

  const onCountryMouseOver = (e) => {
    e.target.setStyle({
      fillColor: 'blue', // Change the fill color when hovered
      weight: 2, // Add a border when hovered
    });
  };

  const onCountryMouseOut = (e) => {
    e.target.setStyle({
      fillColor: 'gray', // Restore the default fill color
      weight: .5, // Restore the default border
    });
  };

  const onCountryClicked = (e) => {
    e.target.setStyle({
      fillColor: 'red', // Restore the default fill color
      weight: 1, // Restore the default border
    });
    // console.log(e)
  };



  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    console.log(countryName)
    layer.bindPopup(countryName)
    layer.on({
        // click: this.onCountryClick,
        mouseover: onCountryMouseOver,
        mouseout: onCountryMouseOut,
        click: onCountryClicked,
    })
  }

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={8}
      style={{ width: '100%', height: '800px' }}
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
      <GeoJSON
        data={countryData}
        style={() => ({
          fillColor: 'gray', // Initial fill color
          weight: 1, // Initial border weight
          color: 'black', // Border color
        })}
        // onEachFeature={(feature, layer) => {
        //   layer.on({
        //     mouseover: onCountryMouseOver, // Hover effect
        //     mouseout: onCountryMouseOut, // Restore default style
        //     click: onCountryClicked,
        //   });
        // }}

        onEachFeature={onEachCountry}
      />

      
    </MapContainer>
  );
};

export default BaseMap;
