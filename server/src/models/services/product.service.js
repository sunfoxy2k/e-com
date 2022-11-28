import {db} from "../core/modelDB.js";
import mongooseModule from "mongoose";

export async function getAllProducts(){
    const res = await db.products.find().exec();
    return res; 
}

export async function getProducts(condition){
    const res = await db.products.find(condition).exec();
    return res; 
}

export async function getProductByID(productID){
    if (!mongooseModule.isValidObjectId(productID)) return null;
    const product = await db.products.findById(productID);
    return product;
}

export async function getProductByName(productName){
    const querry = {
        Name: new RegExp(productName, "i")
    }
    return await db.products.find(querry).exec();
}

export async function createNewProduct(name, price, quantity, ingredients, image, stock){
    const product = db.products({
        name,
        price,
        quantity,
        ingredients,
        image,
        stock,
        disable: false,
    });
    let res = null;
    try{
        res = await product.save();
    }
    catch(e){
        console.log(e)
    }
    return res;
}

export async function updateProduct(id, name, price, quantity, ingredients, image, stock){
    if (!mongooseModule.isValidObjectId(id)) return null;
    const product = await db.products.findById(id).exec();
    if(product){
        product.name = name;
        product.price = price;
        product.quantity = quantity;
        product.ingredients = ingredients;
        product.image = image;
        product.stock = stock;

        let res = null;
        try{
            res = await product.save();
        }
        catch(e){
            console.log(e);
        }
        return res;
    }
    else{
        return null;
    }
}

export async function setProductStatus(id, disabled){
    if (!mongooseModule.isValidObjectId(id)) return null;
    const product = await db.products.findById(id).exec();
    if(product){
        product.disable = disabled;

        let res = null;
        try{
            res = await product.save();
        }
        catch(e){
            console.log(e);
        }
        return res;
    }
    else{
        return null;
    }
}