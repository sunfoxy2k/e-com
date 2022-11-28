import {db} from "../core/modelDB.js";
import mongooseModule from "mongoose";

export async function getAllOrder(){
    return await db.order.find().exec();
}

export async function getOrderByUserId(uid){
    if (!mongooseModule.isValidObjectId(uid)) return null;
    const querry = {
        ClientId: uid,
    }
    return await db.order.find(querry).exec();
}

export async function getOrders(condition){
    return await db.order.find(condition).exec();
}

export async function getOrderByID(oid){
    if (!mongooseModule.isValidObjectId(oid)) return null;
    const order = await db.order.findById(oid);
    return order;
}

export async function createNewOrder(OrderContent, ClientId, CustomerName, RecipientName, Address, ContactNumber){
    if(ClientId){
        if (!mongooseModule.isValidObjectId(ClientId)) return null;
    }
    let sum = 0;
    let newItemList = await Promise.all(OrderContent.itemList.map(async (ele)  =>{
        const product = await db.products.findById(ele.id);
        sum += product.price * ele.amount;
        return Object({
            ProductId: ele.id, 
            ProductName: product.name,
            Quantity: ele.amount
        })
    } 
        
    ))
    OrderContent.itemList = newItemList;
    OrderContent.TotalPrice = sum;
    OrderContent.deliveryFee = 0;
    
    const newOrder = db.order({
        OrderContent: OrderContent,
        ClientId: ClientId,
        CustomerName: CustomerName,
        RecipientName: RecipientName,
        Address: Address,
        ContactNumber: ContactNumber
    });
    let res = null;
    try{
        res = await newOrder.save();
    }
    catch(e){
        console.log(e)
    }
    return res;
}

