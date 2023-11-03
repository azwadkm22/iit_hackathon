import express from 'express';
import { getGdpGrowth } from '../controllers/gdpGrowth.js';


const router = express.Router();
router.get('/c/:id', getGdpGrowth)
export default router;