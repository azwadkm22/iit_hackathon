// BaseMap.js
import React, { useRef, useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import countryData from '../geo_json_data/countries.json';
import { getAQIColor, getBivariateColor } from './MapColoringUtils.js';
import FloatingInfo from './FloatingInfo';
import FloatingCard from './FloatingCard';
import * as api from '../api/index.js';
import countryNameFromISO from '../constants.js'

const BaseMap = () => {
  const mapRef = useRef(null);
  const [clickedCountry, setClickedCountry] = useState(null);
  const [infoShowing, setInfoShowing] = useState(false);

  const [data, setData] = useState(null);
    const [gdp, setGDP] = useState({})
    const [aqi, setAQI] = useState({})
    const [mulDhon, setMulDhon] = useState({})
    const [mulGDP, setMulGDP] = useState({})
    const [states, setStates] = useState(null)
    const [aqiInfo, setAQIInfo] = useState(null)
    const fetchData = async () =>{
        const storedData = localStorage.getItem('countriesList');
        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            const response = await api.getCountries();
            setData(response);
            localStorage.setItem('countriesList', JSON.stringify(response));
        }

        const reversedCountryNameFromISO = Object.fromEntries(
            Object.entries(countryNameFromISO).map(([key, value]) => [value, key])
        );
        // console.log(reversedCountryNameFromISO)
        const x = localStorage.getItem("countriesList");
        const countries = JSON.parse(x).data
        // console.log(countries)
        for(let i = 0; i < countries.length; i++){
            const someData = localStorage.getItem('countryData_' + countries[i].country)
            const gdpData = localStorage.getItem('countryGDP_'+ countries[i].country)
            console.log(countries[i].country)
            if(gdpData){
                const burr = {... mulGDP}
                burr[countries[i].country] = gdpData;
                setMulGDP(burr)
            }
            else{
                console.log(countries[i].country)
                const response  = await api.getGDPByCountry(reversedCountryNameFromISO[countries[i].country])
                const burr = {... mulGDP}
                burr[countries[i].country] = response
                setMulGDP(burr)
                localStorage.setItem('countryGDP_' + countries[i].country, JSON.stringify(response));

            }
            if(someData){
                const curr = {...mulDhon}
                curr[countries[i].country] = someData;
                setMulDhon(curr)
            }
            else{
                console.log(countries[i].country)
                const response = await api.getAirDataOfCountry(countries[i].country);
                // setData(response);
                const curr = {...mulDhon}
                curr[countries[i].country] = response
                setMulDhon(curr)
                localStorage.setItem('countryData_' + countries[i].country, JSON.stringify(response));

            }
        }
        const y = localStorage.getItem('countryGDP_Bangladesh')
        const z = JSON.parse(y)        
        console.log(z.data[1][0].value)



        //     api.getAirDataOfCountry(x[i].country)
        //     api.getGDPByCountry()
        // }
        
        // console.log(x)


    }
    useEffect(()=>{
    fetchData()
    },[])

  const returnAQI = (country) => {
    let aqi = localStorage.getItem('countryData_'+country)

     const aqiJSON = JSON.parse(aqi)   

    if (aqiJSON === null) 
    {
      return [0, 0]
    }
    else {
      aqi = aqiJSON.data.aqi
    }


    return aqi
  }



const findAQILevel = (aqiValue) => {
  if (aqiValue < 51)
  {
    return 0;
  } 
  else if (aqiValue <101)
  {
    return 1;
  }
  else if (aqiValue <151)
  {
    return 2;
  }
  else if (aqiValue <201)
  {
    return 3;
  }
  else if (aqiValue <301)
  {
    return 4;
  }
  else if (aqiValue >300)
  {
    return 5;
  }
}

const findAQIColor = (variable1Level) => {

  let var1Color  = 'grey';
  if (variable1Level == 0 ) {
        var1Color = '#9cd84e';
    }
    else if (variable1Level == 1 ) {
        var1Color = '#facf39';
    }
    else if (variable1Level == 2 ) {
        var1Color = '#f99049';
    }
    else if (variable1Level == 3 ) {
        var1Color = '#f65e5f';
    }
    else if (variable1Level == 4 ) {
        var1Color = '#a070b6';
    }
    else if (variable1Level == 5 ) {
        var1Color = '#a06a7b';
    }

    return var1Color;
}


  const returnAQIandGDP = (country) => {
    let aqi = localStorage.getItem('countryData_'+country)
    let gdp = localStorage.getItem('countryGDP_'+country)


    // console.log(aqi) 
    const aqiJSON = JSON.parse(aqi)   

    if (aqiJSON === null) 
    {
      return [0, 0]
    }
    else {
      aqi = aqiJSON.data.aqi
    }

    // aqi = aqiJSON.aqi

   




    const gdpVal = JSON.parse(gdp)

    if (gdp === null)
    {
      return [aqi, 0]
    }        
    else {
       gdp = gdpVal.data[1][0].value;
    }
    //  console.log(aqi,gdp)
   
    return [aqi, gdp]
  }



//   const getColor = require('./MapColoringUtils.js');

//   let hoveredCountry;

  
  const findCountryRelatedInfo = (countryName) => {
    setInfoShowing(true)
  }



  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    mapRef.current.setView([lat, lng], 8); // Adjust the zoom level as needed
  };

  const onCountryMouseOver = (e) => {
    setInfoShowing(false)
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

    let countryName = e.target.feature.properties.ADMIN;
    e.target.setStyle({
        fillOpacity: 1, // Restore the default fill color
      weight: 1, // Restore the default border
    });
    setClickedCountry(countryName)

    // console.log(countryName)
    findCountryRelatedInfo(clickedCountry)

    let aqiValue = returnAQI(clickedCountry)

    setAQIInfo(aqiValue)

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
    <div>
    <FloatingCard />
    <FloatingInfo aqiValue={aqiInfo}/>
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

        // color = getAQIColor(feature.properties.ADMIN)


        // returnAQIandGDP(feature.properties.ADMIN)

        let aqiValue = returnAQI(feature.properties.ADMIN)

        let aqiLevel = findAQILevel(aqiValue)

        color = findAQIColor(aqiLevel)


        // color = getBivariateColor(feature.properties.ADMIN)

        if (color === undefined) {
            color = '#EEFFEE'
        }

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
    
    </div>
  );
};

export default BaseMap;
