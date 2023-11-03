import mongoose from 'mongoose';
import fetch from 'node-fetch';
import axios from 'axios';
const API_KEY = '15f2d8078f8148e9a1b91810222503'
export const getCityAirData = async(req,res)=>{
    try {
        console.log('yaa ree bai')
        const city = req.params.id
        console.log(city)
        
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=0&aqi=yes&alerts=no`);
        console.log('ki korbo')
        console.log(response)
        res.status(200).json(response.data)
        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}