const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const db = require('./db.js');

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
    .get('/',(req,res)=>{
        console.log("HOME");
        db.connect_functions['BD01'].query("SELECT * FROM ACCOUNTS", (err,result,fields) =>{
            console.log(result);
        })
        res.send("HOME");
    })
    .get("/1",(req,res)=>{
        console.log("1");
        db.connect_functions['BD01'].query("SELECT * FROM ACCOUNTS", (err,result,fields) =>{
            console.log(result);
            res.send(result);
        })
    })
    .post("/2",(req,res)=>{
        console.log('2');
        res.send("ScorePost")
    })
    .listen(4000);



console.log('Server On');