import {db} from "../models/core/modelDB.js";

const { order: Order } = db;

export const handleMomoEvents = async (req, res, next) => {
  try {
    console.log(req.body);
    const { resultCode, orderInfo } = req.body;
    const orderId = req.body.orderId.split('_')[0];
    if (resultCode === 0) {
      const order = await Order.findById(orderId)
      order.PaymentInfo.status = true;
      order.PaymentInfo.info = orderInfo;
      await order.save();
    } else { // for testing, momo test account is always locked...
      const order = await Order.findById(orderId)
      order.PaymentInfo.status = true;
      order.PaymentInfo.info = orderInfo;
      await order.save();
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return next(err);
  }
}