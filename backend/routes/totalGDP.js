import express from 'express';
import { getGDPByCountry } from '../controllers/totalGDP.js';


const router = express.Router();
router.get('/c/:id', getGDPByCountry)
export default router;