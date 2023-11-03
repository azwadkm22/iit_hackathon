import express from 'express';
import { getCityAirData } from '../controllers/air.js';

const router = express.Router();

router.get('/c/:id',getCityAirData)

export default router;