import express from 'express';
import { getAirDataOfCountry, getCountries } from '../controllers/countries.js';
const router = express.Router();

router.get('/', getCountries);
router.get('/c/:id', getAirDataOfCountry);

export default router;