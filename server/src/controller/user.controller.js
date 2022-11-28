import * as MODEL from '../models/modelExport.js';
import { FEAddress, IS_PRODUCTION } from '../config.js';


export async function registerNewUser(req, res) {
  try {
    const { username, password, firstname, lastname, email, phone } = req.body;
    const user = await MODEL.UserService.createNewUser(username, password, firstname, lastname, email, phone);
    if (user) {
      return res.status(200).send(user);
    }
  } catch (err) {
    return next(err)
  }

}

export async function addItemToCart(req, res) {
  var sID = req.cookies.sessionId;
  const user = await MODEL.SessionService.getUserBySessionID(sID);
  if (user) {
    const { pid } = req.body;
    const productFromPID = await MODEL.ProductService.getProductByID(pid)
    if (!productFromPID) {
      res.status(200).send("No product with such pid exist");
      return;
    }

    let cartContent = user.CartContent;
    const pIndex = cartContent.findIndex((ele) => ele.ProductId == pid)
    if (pIndex == -1) {//product not in cart
      cartContent.push({ ProductId: pid, Quantity: 1 });
    }
    else {
      cartContent[pIndex].Quantity += 1;
    }
    const returnValue = await MODEL.UserService.editCart(user.id, cartContent);
    if (returnValue) {
      res.status(200).send("OK");
      return;
    }
    else {
      res.status(200).send("Failed");
      return;
    }
  }
  else {
    MODEL.SessionService.deleteSession(sID); //might have problem
    if (IS_PRODUCTION) {
      res.clearCookie('sessionId', { sameSite: "None", secure: true });
    }
    else {
      res.clearCookie('sessionId');
    }
    res.status(200).send("Invalid session");
  }
}

export async function editCart(req, res) {
  var sID = req.cookies.sessionId;
  const user = await MODEL.SessionService.getUserBySessionID(sID);
  if (user) {
    const { cartContent } = req.body;
    const returnValue = await MODEL.UserService.editCart(user.id, cartContent);
    if (returnValue) {
      res.status(200).send("OK");
      return;
    }
    else {
      res.status(200).send("Failed");
      return;
    }
  }
  else {
    MODEL.SessionService.deleteSession(sID); //might have problem
    if (IS_PRODUCTION) {
      res.clearCookie('sessionId', { sameSite: "None", secure: true });
    }
    else {
      res.clearCookie('sessionId');
    }
    res.status(200).send("Invalid session");
  }
}

export async function reduceOneItemFromCart(req, res) {
  var sID = req.cookies.sessionId;
  const user = await MODEL.SessionService.getUserBySessionID(sID);
  if (user) {
    const { pid } = req.body;
    let cartContent = user.CartContent;
    const pIndex = cartContent.findIndex((ele) => ele.ProductId == pid)
    if (pIndex == -1) {//product not in cart
      res.status(200).send("No product with such pid exist");
      return;
    }
    else {
      if (cartContent[pIndex].Quantity < 2) {
        res.status(200).send("Quantity must be greater than zero");
        return;
      }
      cartContent[pIndex].Quantity -= 1;
    }
    const returnValue = await MODEL.UserService.editCart(user.id, cartContent);
    if (returnValue) {
      res.status(200).send("OK");
      return;
    }
    else {
      res.status(200).send("Failed");
      return;
    }
  }
  else {
    MODEL.SessionService.deleteSession(sID); //might have problem
    if (IS_PRODUCTION) {
      res.clearCookie('sessionId', { sameSite: "None", secure: true });
    }
    else {
      res.clearCookie('sessionId');
    }
    res.status(200).send("Invalid session");
  }
}

export async function removeProductFromCart(req, res) {
  let sID = req.cookies.sessionId;
  const user = await MODEL.SessionService.getUserBySessionID(sID);
  if (user) {
    const { pid } = req.query;
    let cartContent = user.CartContent;
    const pIndex = cartContent.findIndex((ele) => ele.ProductId == pid)
    if (pIndex == -1) {//product not in cart
      res.status(200).send("No product with such pid exist");
      return;
    }
    else {
      cartContent.splice(pIndex, 1);
    }
    const returnValue = await MODEL.UserService.editCart(user.id, cartContent);
    if (returnValue) {
      res.status(200).send("OK");
      return;
    }
    else {
      res.status(200).send("Failed");
      return;
    }
  }
  else {
    MODEL.SessionService.deleteSession(sID); //might have problem
    if (IS_PRODUCTION) {
      res.clearCookie('sessionId', { sameSite: "None", secure: true });
    }
    else {
      res.clearCookie('sessionId');
    }
    res.status(200).send("Invalid session");
  }
}

export async function getCartTotalPrice(req, res) {
  let sID = req.cookies.sessionId;
  const user = await MODEL.SessionService.getUserBySessionID(sID);
  if (!user) {
    MODEL.SessionService.deleteSession(sID); //might have problem
    if (IS_PRODUCTION) {
      res.clearCookie('sessionId', { sameSite: "None", secure: true });
    }
    else {
      res.clearCookie('sessionId');
    }
    res.status(200).send("Invalid session");
    return;
  }
  let sum = await user.CartContent.reduce(async (acc, ele) => {
    const p = await MODEL.ProductService.getProductByID(ele.ProductId);
    const price = p ? p.Price : 0;
    return (await acc) + (price * ele.Quantity);
  }, 0);


  res.status(200).send(sum.toString());//cant send a number by itself
}