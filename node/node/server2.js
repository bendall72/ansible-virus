const bodyParser = require("body-parser");
const transaction_api = require('./transaction-api.js');
const unpack = require('./unpack-uri.js');
const db = require('./db.js');
const fs = require('fs');
const express = require("express");
const app = express();


app
    .use((req,res,next) => {
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if(req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods','POST');
            return res.status(200).json({});
        }
        next();
    })
    .use(express.json())
    .use(express.static('public'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use("/troveAPI",transaction_api)
    .use("/unpack",unpack)
    .get("/1",(req,res)=>{
        res.send("Hey1-Check");
    })
    .get("/2",(req,res)=>{
        console.log('2');
        const b = db.connect_functions['BD02'].select().from('ACCOUNTS').then((data) => {res.send(data)});
    })
    .get("/Open",(req,res)=>{
        console.log('OPEN');
        const b = db.connect_functions['Open1'].select().from('ACCOUNTS').then((data) => {res.send(data)});
    })
    .listen(4000);


console.log('Server On');