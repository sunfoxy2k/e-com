import {dbConfig, IS_PRODUCTION} from "../../config.js";
import mongoose from "mongoose";
import {createUserModel} from './user.model.js';
import {createSessionModel} from './session.model.js';
import {createProductModel} from './product.model.js';
import {createOrderModel} from './order.model.js';
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = createUserModel(mongoose);
db.sessions  = createSessionModel(mongoose);
db.products  = createProductModel(mongoose);
db.order = createOrderModel(mongoose);
db.mongoose.set('debug', false);
// mongoose.set('debug', !IS_PRODUCTION);

export {db};