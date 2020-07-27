const express = require("express");
let router = express.Router();
const bodyParser = require("body-parser");
const db = require('./db.js');
const mysql = require('mysql');


router
.get('/:id',(req,res) => { 
    //PLEASE clean this data for production
    const uri = req.params.id;
    console.log(uri);

    db.connect_functions['Ledger'].query("SELECT * FROM GENERAL WHERE URL ='"+uri+"';", (err,result,fields) => {
        res.send(result);
    })    
    


});



module.exports = router;