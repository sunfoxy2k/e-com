import * as MODEL from '../models/modelExport.js';
import crypto from 'crypto';
import axios from 'axios';
import { requestFees } from '../3rd_api/goship.js';

import {
  FEAddress,
  IS_PRODUCTION,
  partnerCode,
  accessKey,
  secretkey,
  redirectUrl,
  ipnUrl,
  requestType,
  extraData,
} from '../config.js';

export async function orderGetAll(req, res, next) {
  let sID = req.cookies.sessionId;
  const isAdmin = await MODEL.SessionService.isAdminSession(sID);
  if (isAdmin) {
    const data = await MODEL.OrderService.getAllOrder();
    res.status(200).send(data);
  }
  else {
    res.status(200).send("Not Authorized");
  }
}

export async function orderForAUser(req, res, next) {
  try {
    let sID = req.cookies.sessionId;
    const user = await MODEL.SessionService.getUserBySessionID(sID);
    const data = await MODEL.OrderService.getOrderByUserId(user.id);
    res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
}

export async function orderCreateNew(req, res, next) {
  try {
    let sID = req.cookies.sessionId;
    let cID = "";
    let { OrderContent, CustomerName, RecipientName, Address, ContactNumber } = req.body;
    if (sID) {
      const user = await MODEL.SessionService.getUserBySessionID(sID);
      if (!user) {
        MODEL.SessionService.deleteSession(sID); //might have problem
        if (IS_PRODUCTION) {
          res.clearCookie('sessionId', { sameSite: "None", secure: true });
        }
        else {
          res.clearCookie('sessionId');
        }
        return res.status(403).send("Invalid session");
      }
      else {
        cID = user.id;
        CustomerName = user.Firstname + " " + user.Lastname;
      }
    }

    if (!OrderContent) {
      return res.status(400).send("OrderContent must not be null");
    }

    let data = await MODEL.OrderService.createNewOrder(OrderContent, cID, CustomerName, RecipientName, Address, ContactNumber);
    if (data) {
      return res.status(200).json(data);
    }
    else {
      return res.status(404).send("Failed");
    }
  } catch (err) {
    return next(err);
  }
}

export async function getCheckoutUrl(req, res, next) {
  try {
    let sID = req.cookies.sessionId;
    let { orderId, paymentInfo, cityId, districtId } = req.body;
  
    const user = await MODEL.SessionService.getUserBySessionID(sID);
    if (!user) {//currently only support registered customer
      MODEL.SessionService.deleteSession(sID); //might have problem
      if (IS_PRODUCTION) {
        res.clearCookie('sessionId', { sameSite: "None", secure: true });
      }
      else {
        res.clearCookie('sessionId');
      }
      return res.status(401).send("Invalid session");
    }
  
    const order = await MODEL.OrderService.getOrderByID(orderId)
    if (!order) {
      return res.status(404).send("No order with such id exist");
    }
  
    if (order.ClientId != user.id) {
      res.status(403).send("This order is not yours"); //this is for testing only, when in production, we should replace this with above message
      return;
    }

    const fees = await requestFees(cityId, districtId);
    const deliveryFee = fees.data[0].total_fee;
  
    const amount = order.OrderContent.TotalPrice + deliveryFee;
    const momoOrderId = `${orderId}_${new Date().getTime()}`;
    const requestId = partnerCode + new Date().getTime();
    const orderInfo = paymentInfo;
    const rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + momoOrderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
    const signature = crypto.createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex');
    const requestBody = {
      partnerCode : partnerCode,
      accessKey : accessKey,
      requestId : requestId,
      amount,
      orderId: momoOrderId,
      orderInfo,
      redirectUrl : redirectUrl,
      ipnUrl : ipnUrl,
      extraData : extraData,
      requestType : requestType,
      signature : signature,
      lang: 'vi'
    };
    const momoReply = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody,{
      headers: {
        "Content-type": "application/json"
      }
    });
    order.PaymentInfo.info = paymentInfo;
    order.PaymentInfo.deliveryFee = deliveryFee;
    order.save();
    res.status(200).json(momoReply.data);
  } catch (err) {
    try {
      console.log(err.response.data);
    } catch (err) {
      console.log();
    }
    return next(err);
  }
}

const statusEnum = ["Processing", "Packaging", "Delivering", "Complete"];
function isInteger(value) {
  return /^\d+$/.test(value);
}
export async function setOrderStatus(req, res) {
  let sID = req.cookies.sessionId;
  let { orderId, status } = req.body;

  const isAdmin = await MODEL.SessionService.isAdminSession(sID);
  if (!isAdmin) {
    res.status(200).send("Not Authorized");
    return;
  }
  const order = await MODEL.OrderService.getOrderByID(orderId)
  if (!order) {
    res.status(200).send("No order with such id exist");
    return;
  }

  if (!isInteger(status)) {
    res.status(200).send("Status must be an integer from 0-3");
    return;
  }

  const statusint = parseInt(status);
  if (!(0 <= statusint <= 3)) {
    res.status(200).send("Status must be an integer from 0-3");
    return;
  }

  order.OrderStatus = statusEnum[statusint];

  let result = null;
  try {
    result = await order.save();//no service need
  }
  catch (e) {
    console.log(error);
  }

  if (result) {
    res.status(200).send("OK");
    return;
  }
  else {
    res.status(200).send("Failed");
    return;
  }
}


async function bankTranferAPI(paymentInfo) {
  console.log("Processing payment: " + paymentInfo)
  let r = Math.random();
  console.log(r);
  if (r < 0.8) return true; //80% to accept payment
  return false;
}