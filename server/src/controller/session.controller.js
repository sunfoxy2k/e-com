import * as MODEL from '../models/modelExport.js';
import { FEAddress, IS_PRODUCTION } from '../config.js';

export async function checkSessionAlive(req, res, next) {
  try {
    const sID = req.cookies.sessionId;
    const user = await MODEL.SessionService.getUserBySessionID(sID);
    if (user) {
      res.status(200).send({ Name: user.Name, Role: user.Role, sessionId: sID });
    }
    else {
      MODEL.SessionService.deleteSession(sID); //might have problem
      if (IS_PRODUCTION) {
        res.clearCookie('sessionId', { sameSite: "None", secure: true });
      } else {
        res.clearCookie('sessionId');
      }
      res.status(404).send('Session not found.');
    }
  } catch (e) {
    return next(e);
  }
}