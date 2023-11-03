import axios from 'axios';

export const getCountries = async(req,res)=>{
    try {
        const countries = axios.get('https://jsonplaceholder.typicode.com/users').then(
                (response)=>{
                    console.log(response);
                }
            ).catch(
                (function(error){
                    console.log(error); 
                })
            ).finally(
                function(){
                    console.log('this will always run')
                }
            );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
