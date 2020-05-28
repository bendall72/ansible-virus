const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const knex = require("knex");

const  BD01 =
knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "BD01",
        password:"noKfD9gaaQjRCKhV2ufg",
        database:"BusDev01"
    }
});
const  BD02 =
knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "BD02",
        password:"OVXFcHwPdzErYqQGm4uQ",
        database:"BusDev02"
    }
});
const  Open1 =
knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "Open1",
        password:"3B84flSIj12uwjvuWuGZ",
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
    .get("/1",(req,res)=>{
        console.log('1');
        const b = BD01.select().from('ACCOUNTS').then((data) => {res.send(data)});
    })
    .get("/2",(req,res)=>{
        console.log('2');
        const b = BD02.select().from('ACCOUNTS').then((data) => {res.send(data)});
    })
    .get("/Open",(req,res)=>{
        console.log('OPEN');
        const b = Open1.select().from('ACCOUNTS').then((data) => {res.send(data)});
    })
    .listen(5000);

console.log('Server On');