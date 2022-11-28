import * as PController from '../controller/product.controller.js';
import express from "express";
const router = express.Router();

router.get('/', PController.productGetEnabled);
router.get('/id', PController.productByID);
router.get('/name', PController.productSearch);
router.post('/', PController.productAddNew);
router.put('/', PController.productEdit);
router.put('/disable', PController.disableProduct);

export default router;