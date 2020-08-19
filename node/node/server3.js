const bodyParser = require("body-parser");
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
    .get("/1",(req,res)=>{
        res.send("ScoreGet");
    })
    .post("/2",(req,res)=>{
        console.log('2');
        res.send("ScorePost")
    })
    .listen(4000);



console.log('Server On');