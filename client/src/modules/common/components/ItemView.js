import React, { useContext } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/outline';
import CartContext from '../../store/cart-content';
const ItemView = (props) => {
    const cartCtx = useContext(CartContext);
    const addToCart = () => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: 1,
        })
    }
    return(
        <div className="m-auto md:w-80">
            <div className="flex justify-center md:h-72">
                <img src={props.img} alt={props.name}/>
            </div>    
            <div className="flex justify-end mb-2">
                <button type="button" className="p-1 text-black-400 hover:text-gray-400">
                    <ShoppingCartIcon onClick={addToCart} className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div className="flex justify-between">
                <p className="font-medium">{props.name} ({props.quantity} pcs)</p>
                <p className="font-light sm:text-sm text-red-400">{Intl.NumberFormat().format(props.price)}VND</p>
            </div>
        </div>
    );
}
export default ItemView;