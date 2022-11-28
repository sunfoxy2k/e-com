import axios from 'axios';
import { goshipUrl, goshipToken } from "../config.js";
import { requestFees } from '../3rd_api/goship.js';

export const getCities = async (req, res, next) => {
  try {
    const goshipReply = await axios.get(`${goshipUrl}/cities`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": goshipToken,
      }
    });
    res.status(200).json(goshipReply.data.data);
  } catch (err) {
    return next(err);
  }
}

export const getDistrict = async (req, res, next) => {
  try {
    const { params: { cityId } } = req;
    const goshipReply = await axios.get(`${goshipUrl}/cities/${cityId}/districts`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": goshipToken,
      }
    });
    res.status(200).json(goshipReply.data.data);
  } catch (err) {
    return next(err);
  }
}

export const getWards = async (req, res, next) => {
  try {
    const { params: { districtId } } = req;
    const goshipReply = await axios.get(`${goshipUrl}/districts/${districtId}/wards`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": goshipToken,
      }
    });
    res.status(200).json(goshipReply.data.data);
  } catch (err) {
    return next(err);
  }
}

export const getFee = async (req, res, next) => {
  try {
    const { params: { cityId, districtId } } = req;
    const fees = await requestFees(cityId, districtId);
    res.status(200).json(fees.data);
  } catch (err) {
    return next(err);
  }
}