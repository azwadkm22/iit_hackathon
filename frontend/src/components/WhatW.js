import {React, useEffect, useState} from 'react'
import * as api from '../api/index.js';
import countryNameFromISO from '../constants.js'
import { useSelector, useDispatch } from 'react-redux';
function WhatW(){

    const [data, setData] = useState(null);
    const [gdp, setGDP] = useState({})
    const [aqi, setAQI] = useState({})
    const [mulDhon, setMulDhon] = useState({})
    const [mulGDP, setMulGDP] = useState({})
    const [states, setStates] = useState(null)
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
        console.log(countries)
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
    return(
        <div>
            <h1>App data</h1>
        </div>
    );
}
export default WhatW;