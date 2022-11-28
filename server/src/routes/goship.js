import express from "express";
import { getCities, getDistrict, getWards, getFee } from "../controller/goship.js";

const router = express.Router();

router.get('/cities', getCities);
router.get('/:cityId/districts', getDistrict);
router.get('/:districtId/wards', getWards);
router.get('/fee/:cityId/:districtId', getFee);

export default router;