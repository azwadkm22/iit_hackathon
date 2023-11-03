import fetch from 'node-fetch';

const country = 'BD';
const apiUrl = 'https://api.worldbank.org/v2/countries/'+ country +'/indicators/SP.POP.GROW?format=json';
const apiUrlForCache = 'https://api.worldbank.org/v2/countries/'+ country +'/indicators/SP.POP.GROW?format=json&per_page=1';

export const getPopulationGrowthByCountry = async(req, res)=>{
  try {
      console.log("kabbo bhai er code")
      const country = req.params.id
      const response = await axios.get(`https://api.worldbank.org/v2/country/${country}/indicator/SP.POP.GROW?format=json`);
      console.log(response.data)
      res.status(200).json(response.data)
      
  } catch (error) {
      res.status(404).json({message:error.message});
  }
}

const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch data:', response.statusText);
      return null; // Return a default value or handle the error accordingly
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Return a default value or handle the error accordingly
  }
};

const scrapeData = async () => {
  const data = await fetchData();
  const extractedData = [];

  if (data) {
    data[1].forEach(entry => {
      const extractedEntry = {
        date: entry.date,
        value: entry.value
      };
      extractedData.push(extractedEntry);
    });
  }

  return extractedData;
};

// Using async/await to handle asynchronous behavior
const getDataAndLog = async () => {
  const extractedData = await scrapeData();
  console.log(extractedData);
};

const fetchMetaData = async () => {
  try {
    const response = await fetch(apiUrlForCache);
    if (response.ok) {
      const data = await response.json();
      const lastUpdated = data[0].lastupdated;
      console.log('Last Updated:', lastUpdated);
    } else {
      console.error('Failed to fetch metadata:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }
};
