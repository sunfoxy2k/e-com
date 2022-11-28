import React from 'react';
import "../assets/admin.css"
import ListOrders from "./ListOrder"

const ManageOrderPage = () => {

    return(
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <ListOrders/>
        </div>
    );
}
export default ManageOrderPage
