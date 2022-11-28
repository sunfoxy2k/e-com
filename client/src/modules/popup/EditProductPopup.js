import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Sushi from './assets/sushiIcon.png';
import InputText from '../common/components/InputText';
import * as api from '../../utils/api/index.js';
const initData = {
  name: "",
  stock: "",
  price: "",
  ingredients: "",
  quantity: "",
};
const EditProductPopup = (props) => {
  const [data, setData] = useState(initData);
    const onClose = async () => {
      const res = await api.ProductService.editProduct(props.id,data.name,data.price,data.quantity,data.ingredients,data.stock,data.image);
      props.onProductUpdate();
      props.onClose();
    }
    const onChange = (name, value) => {
      setData({
        ...data,
        [name]: value,
      });
    };

    useEffect(async ()=> {
      const res = await api.ProductService.getProduct(props.id)
      setData(res)
    },[])

  return (
    <Transition.Root show={props.isOpenModal} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={props.onClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mb-4 flex justify-center">
                  <img className="w-14" src={Sushi} alt = "sushi"/>
                </div>
                <div>
                  <div className="mt-2">
                    <InputText
                      label="Product name"
                      name="name"
                      value={data.name}
                      onChange={onChange}
                      autoComplete="off"
                      
                    />
                  </div>
                  <div className="mt-2">
                    <InputText
                      label="Stock"
                      name="stock"
                      type="number"
                      value={data.stock}
                      onChange={onChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="mt-2">
                    <InputText
                      label="Ingredients"
                      name="ingredients"
                      value={data.ingredients}
                      onChange={onChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="mt-2">
                    <InputText
                      label="Price"
                      name="price"
                      type="number"
                      value={data.price}
                      onChange={onChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="mt-2">
                    <InputText
                      label="Image"
                      name="image"
                      value={data.image}
                      onChange={onChange}
                      autoComplete="off"
                    />
                  </div>
                  {/* {!(id > 0) ? ( */}
                    <div className="mt-2">
                      <InputText
                        label="Quantities"
                        name="quantity"
                        type="number"
                        value={data.quantity}
                        onChange={onChange}
                      
                      />
                    </div>
                  {/* ) : (
                    ""
                  )} */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={onClose}
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default React.memo(EditProductPopup);