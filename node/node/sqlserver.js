const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
const readline = require('readline');

const knex = require("knex");
const  MAIN =
knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "master",
        password:"VAFiGNXgWP4ph4qMFfe0",
        database:"BusDev01"
    }
});


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
    .get("/read",(req,res)=>{
        console.log('READ');
        const b = MAIN('Test').select().then((data) => {res.send(data)});
    })
    .get("/write",(req,res)=>{
        console.log('WRITE');
        const b = MAIN('Test').insert({Name: 'Bojangles',Number: 27}).then((data) => {res.send(data)});
    })
    .get("/insert",(req,res)=>{
        console.log('INSERT');
        var fs = require('fs');
        var array = fs.readFileSync('BusDev01.txt').toString().split("\r\n");
        for(i in array) {
            const b = MAIN('ACCOUNTS').insert({Address: array[i] ,V: 1}).then((data) => {console.log(data)});
        }
        res.send('Complete');
    })
    .listen(6000);

console.log('Server On');