import express from "express";
import { handleMomoEvents } from '../webhooks/momo.js';

const router = express.Router();

router.post('/momo', handleMomoEvents);

export default router;