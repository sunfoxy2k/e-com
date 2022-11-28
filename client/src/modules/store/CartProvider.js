import React, { useReducer, useEffect } from 'react'
import CartContext from './cart-content';

const defaultCartState = {
    items: [],
    totalAmount: 0,
}
const cartReducer = (state,action) => {
    if (action.type === "ADD"){
        const existingIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingItemCart = state.items[existingIndex];
        let updatedItems;
        if (existingItemCart){
            const updatedItem = {
                ...existingItemCart,
                amount: existingItemCart.amount + action.item.amount,
            }
            updatedItems = [...state.items]
            updatedItems[existingIndex] = updatedItem;
        }
        else {
            updatedItems = state.items.concat(action.item);
        }
        const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if(action.type === "REMOVE"){
        const existingIndex = state.items.findIndex(item => item.id === action.id);
        const existingItemCart = state.items[existingIndex];
        let updatedItems;
        let updatedTotalAmount;
        if(existingItemCart && existingItemCart.amount > 1){
            const updatedItem = {
                ...existingItemCart,
                amount: existingItemCart.amount - 1,
            }
            updatedItems = [...state.items];
            updatedItems[existingIndex] = updatedItem;
            updatedTotalAmount = state.totalAmount - updatedItems[existingIndex].price;
        }
        if(existingItemCart && existingItemCart.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
            updatedTotalAmount = updatedItems.reduce((acc,item) => acc + item.amount*item.price ,0)
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    if(action.type === "REMOVE ALL"){
        const updatedItems = state.items.filter(item => item.id !== action.id);
        const updatedTotalAmount = updatedItems.reduce((acc,item) => acc + item.amount*item.price ,0)
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    if(action.type === "CLEAR"){
        return defaultCartState;
    }
    return defaultCartState;
}

const CartProvider = (props) => {
    let localData = localStorage.getItem('cart');
    localData = localData ? JSON.parse(localData) : defaultCartState;

    const [cartState,dispatchCartAction] = useReducer(cartReducer, localData);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type:"ADD", item: item});
        localStorage.setItem('cart', JSON.stringify(cartState));
    }
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type:"REMOVE", id: id});
        localStorage.setItem('cart', JSON.stringify(cartState));
    }
    const removeAllHandler = (id) => {
        dispatchCartAction({type:"REMOVE ALL", id: id});
        localStorage.setItem('cart', JSON.stringify(cartState));
    }
    const clearCartHandler = () => {
        dispatchCartAction({type:"CLEAR"});
        localStorage.setItem('cart', JSON.stringify(cartState));
    }
    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cartState));
    },[cartState]);

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        removeAll: removeAllHandler,
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider;