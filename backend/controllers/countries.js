import axios from 'axios';
const API_KEY = '4de6f5d8-a62d-49aa-bbb7-9ebc42c6491e'
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
function calculateAQI(pm25, pm10, co, so2, no2, o3) {
  const pollutants = [
    { name: "PM2.5", value: pm25 },
    { name: "PM10", value: pm10 },
    { name: "CO", value: co },
    { name: "SO2", value: so2 },
    { name: "NO2", value: no2 },
    { name: "O3", value: o3 },
  ];

  const breakpoints = [
    { bp: 0, ihi: 50, ilo: 0 },
    { bp: 12.1, ihi: 100, ilo: 51 },
    { bp: 35.5, ihi: 150, ilo: 101 },
    { bp: 55.5, ihi: 200, ilo: 151 },
    { bp: 150.5, ihi: 300, ilo: 201 },
    { bp: 250.5, ihi: 400, ilo: 301 },
    { bp: 350.5, ihi: 500, ilo: 401 },
  ];

  const aqiValues = pollutants.map((pollutant) => {
    const { name, value } = pollutant;
    const { bp, ihi, ilo } = breakpoints.find((b) => b.bp <= value);

    const aqi =
      ((ihi - ilo) / (breakpoints[breakpoints.length - 1].bp - bp)) *
        (value - bp) +
      ilo;

    return { name, aqi };
  });

  const aqi = Math.max(...aqiValues.map((v) => v.aqi));

  return aqi;
}
export const getAirDataOfCountry = async(req, res) =>{
    try {
        const country = req.params.id
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=15f2d8078f8148e9a1b91810222503&q=${country}&days=0&aqi=yes&alerts=no`)
        console.log(response.data.current.air_quality)
        
        // const aqi = await axios.get(`http://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key={{YOUR_API_KEY}}`)
        const data = response.data.current.air_quality;
        console.log(data)
        // pm25, pm10, co, so2, no2, o3
        const aqi = calculateAQI(data.pm2_5, data.pm10, data.co, data.so2, data.no2, data.o3)
        console.log(`TOTAL AQI IS ${aqi}`)
        const final_data = {
            'aqi' : aqi,
            'pm2_5' : data.pm2_5,
            'pm10' : data.pm10,
            'co' : data.co,
            'so2' : data.so2,
            'no2' : data.no2,
            'o3' : data.o3
        }
        res.status(200).json(final_data)
        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}