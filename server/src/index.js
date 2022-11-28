import * as config from './config.js';
import express from "express";
import authRoute from './routes/auth.route.js';
import productRoute from './routes/product.route.js';
import userRoute from './routes/user.route.js';
import orderRoute from './routes/order.routes.js';
import webhooksRoute from './routes/webhooks.js';
import goshipRoute from './routes/goship.js';

import * as MODEL from './models/modelExport.js';

import cors from 'cors';
import cookieParser from 'cookie-parser';

import {FEAddress, IS_PRODUCTION} from './config.js';

const app = express();
const port = process.env.PORT || 3030;

let corsOptions = {
  origin: FEAddress,
  //origin: "http://localhost:4200",
  //origin: "*", //doesn't work with cookies in browser
  credentials: true,
};
app.use(cookieParser()); //not sure if needed

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());



app.use(cors(corsOptions));

app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('/webhook', webhooksRoute);
app.use('/goship', goshipRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

MODEL.ModelDB.db.mongoose
  .connect(MODEL.ModelDB.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


/*TEST CODE FOR CHECKING THE RIGHT URL IS USE TO CONNECT TO THE RIGHT DB COLLECTIONS*/
// const conn = MODEL.ModelDB.db.mongoose.createConnection(MODEL.ModelDB.db.url);
// conn.on('open', function () {
//   conn.db.listCollections().toArray(function (err, collectionNames) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//       console.log(collectionNames);
//       //conn.close();
//   });
// });
/*END TEST CODE*/

// import pkg from 'mongodb';
// const { ObjectID } = pkg;
// console.log(MODEL.UserService.getUserByID(ObjectID("60902e9584f99e948808c659")));
//MODEL.SessionService.createSession('6998');

app.get('/', (req, res) => {
  res.send(
    "Port: " + port + "\n" +
    "IS_PRODUCTION: " + IS_PRODUCTION + "\n" + 
    "FE_ADD: " + FEAddress + "\n"
  )
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});