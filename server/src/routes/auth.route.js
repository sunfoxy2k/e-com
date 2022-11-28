import express from "express";
import * as AController from '../controller/auth.controller.js';
import * as SController from '../controller/session.controller.js';

const router = express.Router();

// router.get('/login', (req, res) => {
//     res.send('login page doesn\'t support GET request');
// });

router.post('/login', AController.loginAndGetSessionID);

router.get('/logout', AController.logout);

router.get('/', SController.checkSessionAlive);

export default router;