import express from 'express';
import { getTotalPopulationByCountry } from '../controllers/totalPopulation.js';


const router = express.Router();
router.get('/c/:id', getTotalPopulationByCountry)
export default router;