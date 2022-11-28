import * as MODEL from '../models/modelExport.js';

export async function productGetEnabled(req, res){
    const condition = {
        disable: false,
    }
    const data = await MODEL.ProductService.getProducts(condition);
    //console.log(res);
    //console.log(JSON.stringify(res));
    res.status(200).send(data);
}

export async function productByID(req, res){
    const pid = req.query.pid;
    const data = await MODEL.ProductService.getProductByID(pid);
    res.status(200).send(data);
}
export async function productSearch(req, res){
    const name = req.query.name;
    const data = await MODEL.ProductService.getProductByName(name);
    res.status(200).send(data);
}

export async function productAddNew(req, res){
    // const sid = req.cookies.sessionId;
    // const isAdmin = await MODEL.SessionService.isAdminSession(sid);
    // if(!isAdmin){
    //     res.status(200).send("Not Authorized");
    //     return;
    // }

    const {name, price, quantity, ingredients, image, stock} = req.body;
    const product = await MODEL.ProductService.createNewProduct(name, price, quantity, ingredients, image, stock);
    if(product){
        res.status(200).send("OK");
    }
    else{
        res.status(200).send("Failed");
    }
}

export async function productEdit(req, res){
    const sid = req.cookies.sessionId;
    const isAdmin = await MODEL.SessionService.isAdminSession(sid);

    const {id, name, price, quantity, ingredients, stock, image} = req.body;
    const product = await MODEL.ProductService.updateProduct(id, name, price, quantity, ingredients, image, stock);
    res.status(200).send(product);
}

export async function disableProduct(req, res){
    const sid = req.cookies.sessionId;
    const isAdmin = await MODEL.SessionService.isAdminSession(sid);

    const {id} = req.body;
    const product = await MODEL.ProductService.setProductStatus(id, true);
    if(product){
        res.status(200).send("OK");
    }
    else{
        res.status(200).send("Failed");
    }
    
}