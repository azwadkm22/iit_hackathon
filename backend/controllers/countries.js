import axios from 'axios';
const API_KEY = '3ce03e42-3c1a-4c2b-9a53-d96c44bfe9bd'
export const getCountries = async(req,res)=>{
    try {
        const response = await axios.get(`http://api.airvisual.com/v2/countries?key=${API_KEY}`);
        console.log(response.data.data)
        res.status(200).json(response.data.data)
        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const getStatesOfCountry = async(req, res)=>{
    try {
        const country = req.body
        const response = await axios.get(`http://api.airvisual.com/v2/states?country=${country}&key=${API_KEY}`)
        console.log(response.data.data)
        res.status(200).json(response.data.data)
        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const getAirDataOfCountry = async(req, res) =>{
    try {
        const country = req.params.id
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=15f2d8078f8148e9a1b91810222503&q=${country}&days=0&aqi=yes&alerts=no`)
        console.log(response.data.current.air_quality)
        // const aqi = await axios.get(`http://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key={{YOUR_API_KEY}}`)
        res.status(200).json(response.data)
        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}