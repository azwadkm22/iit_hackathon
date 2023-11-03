import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req
});


export const getCountries = () => API.get('/countries/');
export const getTopCities = () => API.get('/cities/topCities/')
export const getStatesByCountry = (country) => API.get(`/states/s/${country}`)
export const getCitiesByState = (country, state) => API.get(`/cities/c/${country}/s/${state}`)
export const getCityAirData = (city) => API.get(`/air/c/${city}`)
export const getAllCities = () => API.get('/cities/')


export const getGDPByCountry = (country) => API.get(`/totalgdp/c/${country}`)
export const getPopulationByCountry = (country) => API.get(`/totalpopulation/c/${country}`)
export const getPopulationGrowthByCountry = (country) => API.get(`/populationgrowth/c/${country}`)
export const getGdpPerCapitaByCountry = (country) => API.get(`/gdppercapita/c/${country}`)
export const getGdpGrowthByCountry = (country) => API.get(`/gdpgrowth/c/${country}`)
export const getAirDataOfCountry = (country) => API.get(`/countries/c/${country}`)