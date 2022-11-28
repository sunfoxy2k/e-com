import React, { useEffect, useState, useContext } from 'react';
import Sushi from '../assets/salmonSushi.jpg';
import CartContext from '../../store/cart-content';
import * as api from '../../../utils/api/index.js';

const ItemCard = (props) => {
    const [product,setProduct] = useState([]);

    const cartCtx = useContext(CartContext);
    const removeFormCartHandler = () =>{
        cartCtx.removeItem(props.id);
    }
    const addToCartHandler = () => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: 1,
        })
    }
    const removeAllFromCartHandler = () =>{
        cartCtx.removeAll(props.id);
    }

    useEffect(async () => {
        const res = await api.ProductService.getProduct(props.id);
        setProduct(res);
      },[]);

    return(
        <div className="mt-4 grid grid-cols-6 gap-3 border-b-2">
            <div>
                <img src={product.image} alt = "product"/>
            </div>
            <div className="col-span-3 text-sm">
                <p>{props.name}</p>
                <p className="pt-1">{Intl.NumberFormat().format(props.price)} VND</p>
            </div>
            <div className="col-span-2">
                <div className="flex justify-end">
                    <button onClick={removeFormCartHandler} className="rounded-full border border-black px-2.5 py-0.5 mr-2 ">
                        -
                    </button>
                    <p>{props.amount}</p>
                    <button onClick={addToCartHandler} className="rounded-full border border-black px-2.5 py-0.5 ml-2">
                        +
                    </button>
                </div>
                <p onClick={removeAllFromCartHandler} className="mt-4 text-right text-xs text-gray-400 cursor-pointer">REMOVE</p>
            </div>
        </div>
    );
}
export default ItemCard;