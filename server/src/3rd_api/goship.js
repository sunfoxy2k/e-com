import axios from 'axios';
import { goshipUrl, goshipToken } from '../config.js';

const parcel = {
  cod: 0,
  width: 10,
  height: 10,
  length: 10,
  weight: 100,
}

const address_from = {
  district: 701000,
  city: 700000,
};

export const requestFees = async (cityId, districtId) => {
  const goshipReply = await axios.post(`${goshipUrl}/rates`, {
    shipment: {
      address_from,
      address_to: {
        district: districtId,
        city: cityId,
      },
      parcel
    }
  },{
    headers: {
      "Content-type": "application/json",
      "Authorization": goshipToken,
    }
  });
  return goshipReply.data;
}