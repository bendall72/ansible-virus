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
        password:"masterpass",
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
        const b = MAIN('Test').select().then((data) => {res.send(data)});
    })
    .get("/write",(req,res)=>{
        console.log('WRITE');
        const b = MAIN('Test').insert({Name: 'Bojangles',Number: 27}).then((data) => {res.send(data)});
    })
    .get("/insert",(req,res)=>{
        console.log('INSERT');
        async function processLineByLine() {
            const fileStream = fs.createReadStream('BusDev01.txt');
          
            const rl = readline.createInterface({
              input: fileStream,
              crlfDelay: Infinity
            });
            // Note: we use the crlfDelay option to recognize all instances of CR LF
            // ('\r\n') in input.txt as a single line break.
          
            for await (const line of rl) {
              // Each line in input.txt will be successively available here as `line`.
              console.log(`Line from file: ${line}`);
            }
          }
          
          processLineByLine();
    })
    .listen(5000);

console.log('Server On');