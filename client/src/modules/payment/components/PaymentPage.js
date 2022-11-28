import React, { useState, useContext } from 'react'
import Cart from './Cart'
import CustomerInformation from './CustomerInformation';
import PaymentPopup from "../../popup/PaymentPopup";
import { Link } from "react-router-dom";
import CartContent from '../../store/cart-content';
const PaymentPage = () => {
  const cartContext = useContext(CartContent);
  const [isOpenModal, setOpenModal] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [price, setPrice] = useState(0);
  const onClose = () => {
    setOpenModal(false);
  };
  const handleOnMakeOrder = (orderId, isOpen) => {
    setPrice(cartContext.totalAmount);
    setOrderId(orderId);
    setOpenModal(isOpen);
  }
  return (
    <div>
      <PaymentPopup orderPrice={price} orderId={orderId} onClose={onClose} isOpenModal={isOpenModal} />
      <div className="max-w-7xl px-10 py-14 mx-auto py-6 sm:px-6 lg:px-8">
        <div className="text-right">
          <Link to="/">
            <a className="text-xs underline cursor-pointer">Back</a>
          </Link>
        </div>
        <div className="mt-2 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <CustomerInformation onMakeOrder={handleOnMakeOrder} />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Cart />
          </div>
        </div>
      </div>
    </div>

  );
}
export default PaymentPage