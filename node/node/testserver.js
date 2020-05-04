const express = require("express");
const bodyParser = require("body-parser");
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
    .get("/read",(req,res)=>{
        console.log('READ');
        res.send('READ');
    })
    .get("/write",(req,res)=>{
        console.log('WRITE');
        res.send('WRITE');
    })
    .get("/delete",(req,res)=>{
        console.log('DELETE');
        res.send('DELETE');
    })
    .listen(5000);

console.log('Server On');