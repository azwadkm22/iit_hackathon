import axios from 'axios';
const API_KEY = '3ce03e42-3c1a-4c2b-9a53-d96c44bfe9bd'
export const getCountries = async(req,res)=>{
    try {
        const response = await axios.get(`http://api.airvisual.com/v2/countries?key=${API_KEY}`);
        console.log(response)
        res.status(200).json(response.data)
        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const getStatesOfCountry = async(req, res)=>{
    try {
        const country = req.body
        const response = await axios.get(`http://api.airvisual.com/v2/states?country=${country}&key=${API_KEY}`)
        console.log(response)
        res.status(200).json(response.data)
        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}