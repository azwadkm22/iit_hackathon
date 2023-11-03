import React from "react";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";

const RankingsPage = () => {
  const [cities, setCities] = React.useState([]);


  const dummyCities = [
    {
      name: "London",
      country: "United Kingdom",
      ranking: 1,
      AQIScore: 50,
    },
    {
      name: "New York City",
      country: "United States",
      ranking: 2,
      AQIScore: 50,
    },
    {
      name: "Paris",
      country: "France",
      ranking: 3,
      AQIScore: 50,
    },
    {
      name: "Tokyo",
      country: "Japan",
      ranking: 4,
      AQIScore: 50,
    },
    {
      name: "Sydney",
      country: "Australia",
      ranking: 5,
      AQIScore: 50,
    },
  ];

  React.useEffect(() => {
    setCities(dummyCities);
  }, []);

  return (
    <div>
      <h1>Rankings of Cities</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ranking</TableCell>
              <TableCell>City, Country</TableCell>
              <TableCell>AQI Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cities.map((city, index) => (
              <TableRow key={index}>
                <TableCell>{city.ranking}</TableCell>
                <TableCell>{(city.name + ", " + city.country)}</TableCell>
                <TableCell>{city.AQIScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RankingsPage;
