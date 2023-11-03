import axios from 'axios';
const API_KEY = '4de6f5d8-a62d-49aa-bbb7-9ebc42c6491e'

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
export const getAllCities = async(req, res) =>{
    try {
        // console.log('not a routing issue')
        
        //Api call to get all countries 
        //Api call to get all states 
        //Api call to get all cities 
        console.log('here')
        const response = await axios.get(`http://api.airvisual.com/v2/countries?key=${API_KEY}`);
        const data = response.data.data
        // console.log(data)
        for(let i = 0; i< data.length; i++){
            try {
                const newResponse = await axios.get(`http://api.airvisual.com/v2/states?country=${data[i].country}&key=${API_KEY}`);
                const newData = newResponse.data.data
                for (let j = 0; j < newData.length; j++){
                    try {
                        const newNewResponse = await axios.get(`http://api.airvisual.com/v2/cities?state=${newData[j].state}&country=${data[i].country}&key=${API_KEY}`)
                        console.log(newNewResponse.data.data)
                    } catch (error) {
                        console.log('ekhane')
                    }
            }

            } catch (error) {
                res.status(404).json({message:error.message});
            }
            
            console.log(newData)
            // console.log(newData)
            // for (let j = 0; j < newData.length; j++){
            //     const newNewResponse = await axios.get(`http://api.airvisual.com/v2/cities?state=${newData[j].state}&country=${data[i].country}&key=${API_KEY}`)
            //     console.log(newNewResponse.data.data)
            // }
            // console.log(newData)
        }
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