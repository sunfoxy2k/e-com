import React, {useState} from 'react';
import AddProductPopup from "../../popup/AddProductPopup"

const AddProduct = (props) => {
    const [isOpenModal, setOpenModal] = useState(false);
    const onClose = () => {
        setOpenModal(false);
    }
    const onClick = () => {
        setOpenModal(true);
    }
    const onProductUpdate = () => {
        props.onProductUpdate();
    }
    return(
        <div>
            <button onClick={onClick} className={`w-full bg-white py-2 pl-2 pr-3 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 hover:bg-gray-900 hover:text-white sm:text-md my-7`}>
                Add new product
            </button>
            <AddProductPopup onClose={onClose} isOpenModal={isOpenModal} onProductUpdate={onProductUpdate}/>
        </div>
    );
}
export default AddProduct