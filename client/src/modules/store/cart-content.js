import React from 'react'

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem :(_id) => {},
    removeAll: (_id) => {},
    clearCart : () => {},
})
export default CartContext