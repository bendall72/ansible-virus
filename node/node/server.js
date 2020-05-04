const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const knex = require("knex");
const  READ =
knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "globalREAD",
        password:"QbIJsUEPFT",
        database:"TEST"
    }
});
const  WRITE =
knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "globalWRITE",
        password:"pfeYinfD7E",
        database:"TEST"
    }
});
const  DELETE =
knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "globalDELETE",
        password:"NNpl4aygFX",
        database:"TEST"
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
        const b = READ.select().from('TEST').orderBy('ID').then((data) => {res.send(data)});
    })
    .get("/write",(req,res)=>{
        console.log('WRITE');
        const b = WRITE('TEST').returning('ID').insert({Data: 'Write'}).then((data) => {res.send(data)});
    })
    .get("/delete",(req,res)=>{
        console.log('DELETE');
        const b = DELETE('TEST').where('ID', 2).del();
    })
    .listen(5000);

console.log('Server On');