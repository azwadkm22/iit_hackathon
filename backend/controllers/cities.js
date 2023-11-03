import axios from 'axios';
const API_KEY = '3ce03e42-3c1a-4c2b-9a53-d96c44bfe9bd'

export const getTopCities = async(req, res) =>{
    try {
        // console.log('aicche ni re ono chacchu')
        const response = await axios.get(`http://api.airvisual.com/v2/city_ranking?key=${API_KEY}`)
        
        console.log(response)
        res.status(200).json(response.data)
        
    } catch (error) {
        res.status(404).json({message:error.message});

    }
}

export const getCitiesByState = async(req, res) =>{
    try {
        console.log('aicche ni chacchu ya re bai kita')
        // console.log(req.params.sid)
        const country = req.params.id

        
        const state = req.params.sid
        console.log(country);
        console.log(state)
        
        const response = await axios.get(`http://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=${API_KEY}`)
        
        console.log(response)
        res.status(200).json(response.data)
        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}