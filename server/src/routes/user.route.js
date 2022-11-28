import * as UController from '../controller/user.controller.js';
import express from "express";
const router = express.Router();

router.post('/register', UController.registerNewUser);
router.post('/cart', UController.addItemToCart);
router.put('/cart', UController.editCart);
router.put('/cart/quantity/one', UController.reduceOneItemFromCart);
router.delete('/cart/product', UController.removeProductFromCart);
router.get('/cart/totalprice',UController.getCartTotalPrice);

export default router;