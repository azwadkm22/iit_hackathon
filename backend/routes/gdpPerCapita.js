import express from 'express';
import { getGdpPerCapitaByCountry } from '../controllers/gdpPerCapita.js';


const router = express.Router();
router.get('/c/:id', getGdpPerCapitaByCountry)
export default router;