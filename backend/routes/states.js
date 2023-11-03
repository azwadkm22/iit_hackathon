import express from 'express';
import { getStatesByCountry } from '../controllers/states.js';

const router = express.Router();
router.get('/s/:id', getStatesByCountry)
export default router;