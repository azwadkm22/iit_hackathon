import mongoose from 'mongoose';
import fetch from 'node-fetch';

const country = 'BD';
const apiUrl = 'https://api.worldbank.org/v2/country/'+ country +'/indicator/NY.GDP.MKTP.KD.ZG?format=json';

const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
