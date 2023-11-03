import axios from 'axios';
const API_KEY = '4de6f5d8-a62d-49aa-bbb7-9ebc42c6491e'


export const getStatesByCountry = async(req,res)=>{
    try {
        const country = req.params.id
        console.log(req.params)
        const response = await axios.get(`http://api.airvisual.com/v2/states?country=${country}&key=${API_KEY}`);
        console.log(response.data.data)
        res.status(200).json(response.data.data)
        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}