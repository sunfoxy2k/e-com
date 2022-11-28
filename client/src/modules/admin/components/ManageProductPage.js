import React, {useEffect, useState, useCallback } from 'react';
import * as api from '../../../utils/api/index.js';
import "../assets/admin.css"
import ListProducts from "./ListProducts.js"
import AddProduct from "./AddProduct.js"

const ManageProductPage = () => {
    const [orders,setOrders] = useState([]);

    const handleOnProductUpdate = useCallback(async () => {
        const res = await api.ProductService.getAllProduct();
        setOrders(res);
    },[])

    useEffect(() => {
        handleOnProductUpdate();
      },[handleOnProductUpdate]);

    return(
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <AddProduct onProductUpdate={handleOnProductUpdate}/>
            <ListProducts orders={orders} onProductUpdate={handleOnProductUpdate}/>
        </div>
    );
}
export default ManageProductPage
