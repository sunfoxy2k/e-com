import * as MODEL from '../models/modelExport.js';
import { FEAddress, IS_PRODUCTION } from '../config.js';

export async function loginAndGetSessionID(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await MODEL.UserService.getUserByNameAndPassword(username, password);
    if (user) {
      const sessionID = (await MODEL.SessionService.createNewSession(user._id))._id;

      if (IS_PRODUCTION)
        res.cookie('sessionId', sessionID, { maxAge: 86400000, sameSite: "None", secure: true });//in miliseconds
      else
        res.cookie('sessionId', sessionID, { maxAge: 86400000 });//in miliseconds

      return res.status(200).send({ sessionId: sessionID, Name: user.Name, Role: user.Role });
    }
    else {
      return res.status(404).send('Wrong username or password');
    }
  } catch (e) {
    return next(e);
  }
}

export async function logout(req, res) {
  try {
    let sID = req.cookies.sessionId;
    MODEL.SessionService.deleteSession(sID);
    if (IS_PRODUCTION) {
      res.clearCookie('sessionId', { sameSite: "None", secure: true });
    }
    else {
      res.clearCookie('sessionId');
    }
    return res.status(200).send("LOG OUT OK, sid:" + sID);
  } catch (err) {
    return next(err)
  }
}