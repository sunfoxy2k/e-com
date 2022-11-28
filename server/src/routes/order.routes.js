import * as OController from '../controller/order.controller.js';
import express from "express";
const router = express.Router();

router.get('/', OController.orderGetAll);
router.get('/user', OController.orderForAUser);
router.post('/', OController.orderCreateNew);
router.put('/user/payment', OController.getCheckoutUrl);
router.put('/admin/status', OController.setOrderStatus);

export default router;