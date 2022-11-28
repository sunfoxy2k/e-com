import React, { useState, useEffect } from 'react';
import * as api from '../../../utils/api/index.js';
import shippingCar from '../assets/shippingCar.png'
import phone from '../assets/phone.png'
import ItemDropdown from "./ItemDropdown"
import openBox from '../assets/open-box.png'
import closeBox from '../assets/close-box.png'
import { renderDateTime } from "../../common/components/renderDateTime"

const ListOrders = () => {
  const [orders,setOrders] = useState([]);

  useEffect(async () => {
    const res = await api.OrderService.getAllOrder();
    setOrders(res);
  },[]);

  return (
    <div>
      {orders.map(item => {
        return (
          <div className="mt-10 shadow-md" style={{ paddingBottom: "30px" }}>
            <div className="grid grid-cols-2 gap-4 py-3">
              <div className="grid grid-cols-5 gap-10 border-r-2 border-gray-900">
                <div className="col-span-2 m-auto">
                  {item.OrderStatus === "Delivering" ? 
                    <img src={shippingCar}/>
                    :
                    <div>
                        {item.OrderStatus === "Packaging" ?
                        <img style= {{height: "160px"}} src={closeBox}/> :  <img style= {{height: "160px"}} src={openBox}/>
                        }
                    </div>
                  }
                </div>

                <div className="col-span-3" style={{ fontFamily: "Alata" }}>
                  <div className="leading-10">
                    <p>Order ID: {item._id}</p>
                    <p>Order date: {renderDateTime(item.OrderDate)}</p>
                    {item.PaymentInfo.status === false ? 
                      <div/>
                      :
                      <p>Delivery address: {item.PaymentInfo.info}</p>
                    }
                    <div className="flex">
                      <p className="mr-4">Delivery status:</p>
                      <ItemDropdown id={item._id} status={item.OrderStatus} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-10">
                <div className="col-span-3 leading-10" style={{ fontFamily: "Alata" }}>
                  <p>Customer Name: {item.CustomerName}</p>
                  <p>Recipient Name: {item.RecipientName}</p>
                  <p>Contact Number: (+84) {item.ContactNumber}</p>
                  {!item.PaymentInfo.status? ''
                    :
                    <p>Delivery fee: {item.PaymentInfo.deliveryFee}</p>
                  }
                </div>
                <div className="col-span-2">
                  <a href={`tel: ${item.ContactNumber}`}>
                    <img className = "mt-14 ml-10" style={{ maxWidth: "50px", paddingBottom: "20px" }} src={phone} alt = "phone"/>
                  </a>
                  <p>Price: {Intl.NumberFormat().format(item.OrderContent.TotalPrice)} VND</p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default ListOrders;