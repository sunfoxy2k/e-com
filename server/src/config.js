import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
    uri: "mongodb+srv://QPhuc:123456ABC@pse-test.tl4gi.mongodb.net/test",
    url: "mongodb+srv://admin:12345@cluster0.qhppy.mongodb.net/?retryWrites=true&w=majority"
};

export const IS_PRODUCTION = process.env.NODE_ENV ? process.env.NODE_ENV === 'production' : false;

export const FEAddress = 'http://13.212.205.180'

export const saltRounds = process.env.SALT_ROUND ? parseInt(process.env.SALT_ROUND, 10) : 10;
export const jwtSecret = process.env.JWT_SECRET || 'abcdef';


// MOMO STUFF
export const partnerCode = "MOMOKLHU20211025";
export const accessKey = "ZaJDPNooBAEIDkLd";
export const secretkey = "apzcpZayg1uDeim32NUAspfVAHjUjvez";
// export const orderId = requestId;
export const redirectUrl = FEAddress;
export const ipnUrl = `${FEAddress}/webhook/momo`;
export const requestType = "captureWallet"
export const extraData = ""; //pass empty value if your merchant does not have stores
// END MOMO STUFF


export const goshipUrl = 'http://sandbox.goship.io/api/v2';
export const goshipToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZjMjk0ZDNlODBiODcxNzQ1MTA1Nzk2MGFmN2RjNTM0MmY3Yjk1Y2JlZjZhYWY3ZGNiOWI4OTdhZDhjZDcxY2Q3MjNmMzg3MjJjYTcyMTdiIn0.eyJhdWQiOiIxMyIsImp0aSI6ImZjMjk0ZDNlODBiODcxNzQ1MTA1Nzk2MGFmN2RjNTM0MmY3Yjk1Y2JlZjZhYWY3ZGNiOWI4OTdhZDhjZDcxY2Q3MjNmMzg3MjJjYTcyMTdiIiwiaWF0IjoxNjY5NjA1Nzc0LCJuYmYiOjE2Njk2MDU3NzQsImV4cCI6NDgyNTI3OTM3NCwic3ViIjoiMzE5NCIsInNjb3BlcyI6W119.HfqldWAum2isU0UsbCbyF2oDkobWjlQFHFJbCT0UuKO9aZxB_mH72S6TYYa3rcEPzPzy0IGLeWrRoTZLOcE9lOCooTIv0uluRvJYFYa6SKxD30zrp7mtp0dEKTK_zsSI9pJYTgtgsIrGs7MYAuLXN0h31o-Lw3Hs8q-g28s-ZuybKbvKpzomVrW-FG0e4d3cWzPlsPmpC61OzldbuA13_Lr14RVSkSfenNFRKWWz82c8v1XbxJdJUbsnTxP70olDq9IfYSH7ltiHNwtFQmyqY8AfTeLL5UJ2XhvU9LJtNC8w2PgLJWzdyyjslX01XBmh1knYcSORg7CTz6jjSSafBFsm0kugTAOgr3fSIHv_yuyr_jwrSe8hlc92EFa163jxcR3QsWQYP1sQZsftoewh0xKRu0H5OJ3eFs0NAS9BnrI_0NubDn7ZMswCZQUcMXJYiCQclRPnqWGfbuQAurSBP44AnHiC0oiU649jOSDtnd79cKZD-FxHPpKUD_ghGbjiXIUAZkC46eQGk5014pnCWo2Tyqsd_o4Lta0xTF-bMizSNmuebzP4EjcyRCswmJ6PXBMPSc2rIb9xkxX5Z8u3i0VAquVWRSIer1_HBURxesGwoWPXLFnMD4ZPcifd8it0zv7JJOkMO5DyDcdbiLiK_fM1yOnbJml-Y5xDqmf6HhY';
