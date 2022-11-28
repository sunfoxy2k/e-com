import React, { useState, useContext} from 'react';
import InputText from '../../common/components/InputText';
import TextEditor from '../../common/components/TextEditor';
import { OrderService } from '../../../utils/api';
import CartContent from '../../store/cart-content.js'
const initData = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  note: "",
};
const CustomerInformation = (props) => {
  const cartContext = useContext(CartContent);
  const [data, setData] = useState(initData);
  const onChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const onSendOrderClick = async (e) => {
    try {
      e.preventDefault();
      const orderContent = { itemList: cartContext.items, TotalPrice: -1 }
      const res = await OrderService.createNewOrder(
        orderContent,
        data.name,
        data.recipientName,
        data.address,
        data.phone,
      );
      localStorage.removeItem('cart');
      props.onMakeOrder(res._id, true);
    } catch (err) {
      alert('create order failed');
      console.log(err.message);
    }
  }
  return (
    <form onSubmit={onSendOrderClick} className="pr-8 border-r-2">
      <h2 className="text-lg font-semibold">CUSTOMER INFORMATION</h2>
      <p>You're making an order from Team1.</p>
      <InputText onChange={onChange} name="name" label="NAME" type="text" required={true} />
      <InputText onChange={onChange} name="recipientName" label="RECIPIENT NAME" type="text" required={true} />
      <InputText onChange={onChange} name="phone" label="PHONE NUMBER" type="number" required={true} />
      <div className="mt-6">
        <button className={`w-full bg-white py-2 pl-2 pr-3 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 hover:bg-gray-900 hover:text-white sm:text-md `}>
          SEND
        </button>
      </div>
    </form>

  );
}
export default  React.memo(CustomerInformation)