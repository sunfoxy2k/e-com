import React, {useState} from 'react'
import trash from '../assets/trash.png'
import EditProductPopup from '../../popup/EditProductPopup.js';
import * as api from '../../../utils/api/index.js';

const Product = (props) => {
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
    const deleteItemHandler = async () => {
      const res = await api.ProductService.disableProduct(props.id);
      props.onProductUpdate();
    }
    return(
        <div className="grid grid-cols-2 mt-10 shadow-md" style={{ height: "200px", paddingBottom: "30px" }}>
              <div className="grid grid-cols-7 gap-10">
                <div className="col-span-2 m-auto">
                  <img style = {{height: "140px"}} src={process.env.PUBLIC_URL + props.image} />
                </div>

                <div className="col-span-5" style={{ fontFamily: "Alata" }}>
                  <div className="leading-10">
                    <p style = {{fontSize: 25}}>{props.name}</p>
                    <p>Quantities (pieces): {props.quantities}</p>
                    <p>Ingredients: {props.ingredients}</p>
                    <p>STOCK: {props.stock}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-10">
                <div className="col-span-3 leading-10" style={{ fontFamily: "Alata" }}/>
                  
                <div className="col-span-2">
                  <img onClick={deleteItemHandler} className = "ml-10 cursor-pointer" style={{maxWidth: "50px", paddingBottom: "20px" }} src={trash} alt="trash" />
                  <p style= {{fontWeight: 'bold'}}>Price: {Intl.NumberFormat().format(props.price)} VND</p>
                  <div  className= "mt-7 mr-20">
                    <button onClick={onClick} className={`w-full bg-white py-2 pl-2 pr-3 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 hover:bg-gray-900 hover:text-white sm:text-md `}>
                          Edit product
                    </button>
                    <EditProductPopup
                      onProductUpdate={onProductUpdate}
                      id={props.id} onClose={onClose} isOpenModal={isOpenModal}
                    />
                  </div>
                </div>
              </div>
            </div>
    );
}
export default Product;