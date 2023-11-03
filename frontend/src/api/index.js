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