import {React, useEffect, useState} from 'react'
import * as api from '../api/index.js';
import { useSelector, useDispatch } from 'react-redux';
function WhatW(){

    const [data, setData] = useState(null);
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

        
        const x = localStorage.getItem("countriesList");
        for(let i = 0; i < x.length; i++){
            api.getAirDataOfCountry(x[i].country)
        }
        
        console.log(x)


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