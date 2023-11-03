import express from 'express';

import { getCitiesByState, getTopCities } from '../controllers/cities.js';

const router = express.Router();
router.get('/topCities', getTopCities)
router.get('/c/:id/s/:sid', getCitiesByState)
export default router;
