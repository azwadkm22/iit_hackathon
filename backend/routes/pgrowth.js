import express from 'express';
import { getPopulationGrowthByCountry } from '../controllers/pgrowth.js';


const router = express.Router();
router.get('/c/:id', getPopulationGrowthByCountry)
export default router;