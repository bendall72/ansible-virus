const express = require("express");
let router = express.Router();
const bodyParser = require("body-parser");
const fees = require('./fees.js');
const apiKEYS = require('./api_keys.json');
const db = require('./db.js');
const mysql = require('mysql');
const url = require('./web_creator.js');

router
.post('/:id',(req,res) => {
    const uri_ID = req.params.id;
    const amt = Number(req.body.TOTAL_AMOUNT.toFixed(2));
    console.log("AMOUNT:  "+amt);
    const client_key = req.body.TROVE_API_X_SECRET_CLIENT_KEY;
    const cart_content = req.body.CONTENTS;
    function ObjectLength( object ) {
        var length = 0;
        for( var key in object ) {
            if( object.hasOwnProperty(key) ) {
                ++length;
            }
        }
        return length;
    };

    console.log(ObjectLength(cart_content));
    if(cart_content){
        console.log('Contents of Cart: '+cart_content);
    }else{
        console.log('No Contents of Cart');
    }
//Testing
const banana = () =>{
    function inner(){
        return "banana";
    }
    return inner();
}

const output = banana();

console.log(output);
console.log(banana);



    //Security Checks
    if(apiKEYS[uri_ID]){
        if(apiKEYS[uri_ID][client_key] && amt){
            const db_knex_pack = apiKEYS[uri_ID][client_key];
            const client_alias = apiKEYS[uri_ID]["alias"];
            
            console.log(db_knex_pack);
            console.log(db.connect_functions[db_knex_pack]);

        
                //Transaction Promise 1- ACCOUNTS AND FEES
                const transaction_1 = new Promise((resolve,reject)=>{
                    db.connect_functions[db_knex_pack].beginTransaction((err) => {
                    if (err) { throw err;}
                    //QUERY1
                    db.connect_functions[db_knex_pack].query("SELECT Address, COUNT FROM ACCOUNTS ORDER BY COUNT LIMIT 1 FOR UPDATE;", (err,result,fields) => {
                        if (err) { 
                            db.connect_functions[db_knex_pack].rollback(function() {
                              throw err;
                            });
                        }
                        const selected_account = result[0].Address;
                        const selected_count = result[0].COUNT;
    
                        //QUERY2
                        db.connect_functions[db_knex_pack].query("UPDATE ACCOUNTS SET USES = 1, COUNT = " + (selected_count + 1) + " WHERE Address ='" + selected_account + "';",(err,result,fields) => {
                            if (err) { 
                                db.connect_functions[db_knex_pack].rollback(function() {
                                  throw err;
                                });
                            }
    
                            db.connect_functions[db_knex_pack].commit((err)=>{
                                if (err) { 
                                    connection.rollback(function() {
                                      throw err;
                                    });
                                  }
                                
                                console.log('Completed');
                                resolve(selected_account);
                                });
                        });
                    });
    
                }); 
    
                });
                

            //FEE CALCULATOR    
            const feesPromise = new Promise((resolve,reject)=>{
                console.log("Starting feesPromise with:"+amt);
                const fees_deets = fees.feeDetermine(amt);
                resolve(fees_deets);
            });

               



            Promise.all([feesPromise,transaction_1]).then((values)=>{ 
                console.log(values);
                transaction_2(values).then((result)=>{
                    console.log("Hello: " + result);
                    const a = db_knex_pack;
                    const b = values;
                    if(cart_content){
                    b.push(cart_content);
                    }
                    b.push(client_alias);
                    console.log(b);
                    const d = b[0][3];
                    const json = JSON.stringify(b);
                    console.log("HERE-J" + json);
                    const c = result;
                    transaction_3(a,json,c).then((id)=>{
                        res.send([id,d]);
                    });
                    console.log([a,b,c]);
                });
                
                //res.send(values);
            });

//TRANSACTION INSERT
const transaction_2 = (input) => {
    return new Promise((resolve,reject)=>{
        const a = input[0][0];
        const b = input[0][1];
        const c = input[0][2];
        const d = input[0][3];
        const e = input[1];
        db.connect_functions[db_knex_pack].query("INSERT INTO TRANSACTIONS (ACCOUNT, AMT, FEE, TOTAL, TOTALBTC) VALUES('" + e + "',"+a+","+b+","+c+","+d+");",(err,result,fields)=>{
            if (err) { 
                throw err;
            }
            db.connect_functions[db_knex_pack].query("SELECT @@IDENTITY;", (err,result,fields)=>{
                console.log("Identity: " + result[0]["@@IDENTITY"]);
                //res.send(result[0]);
                resolve(result[0]["@@IDENTITY"]);
            })
            
        });

    })

}

const transaction_3 = (in1,in2,in3) => {
    return new Promise((resolve,reject)=>{
        const unique_link = url.webAddrCreator(60);
        console.log(unique_link);
        console.log(in1);
        console.log(in2);
        console.log(in3);
        db.connect_functions['Ledger'].query("INSERT INTO GENERAL (URL, DB, PACK, tranID) VALUES ('" + unique_link + "','" + in1 + "','" + in2 + "'," + in3 + ");",(err,result,fields)=>{
            if (err) { 
                throw err;
            }
            resolve(unique_link);
        });
    })

}




    // let transaction_1 = => {
    //     await db.connect_functions[db_knex_pack].beginTransaction((err) => {
    //                 if (err) { throw err;}
    //                 //QUERY1
    //         let query_promise = new Promise((resolve,reject) => {
    //             db.connect_functions[db_knex_pack].query("SELECT Address, COUNT FROM ACCOUNTS WHERE USES = 0 ORDER BY COUNT LIMIT 1 FOR UPDATE;", (err,result,fields) => {
    //                 if (err) { 
    //                     db.connect_functions[db_knex_pack].rollback(function() {
    //                       throw err;
    //                     });
    //                 }
    //                 const selected_account = result[0].Address;
    //                 const selected_count = result[0].COUNT;

    //                 //QUERY2
    //                 db.connect_functions[db_knex_pack].query("UPDATE ACCOUNTS SET USES = 1, COUNT = " + (selected_count + 1) + " WHERE Address ='" + selected_account + "';",(err,result,fields) => {
    //                     if (err) { 
    //                         db.connect_functions[db_knex_pack].rollback(function() {
    //                           throw err;
    //                         });
    //                     }

    //                     db.connect_functions[db_knex_pack].commit((err)=>{
    //                         if (err) { 
    //                             connection.rollback(function() {
    //                               throw err;
    //                             });
    //                           }
                            
    //                         console.log('Completed');
    //                         });
    //                 });
    //                 return_detail = selected_account;
    //                 console.log("return detail: " + return_detail);
    //                 return return_detail;
    //             });

    //         }); 
    //                 //return "Cowboy";
    //         });
    //         //return "Howdy";
    //        // console.log(transaction_1);


    //             // db.connect_functions[db_knex_pack].query("SELECT Address FROM ACCOUNTS WHERE USES = 0 ORDER BY COUNT LIMIT 1 FOR UPDATE;", (err, result, fields) => {
    //             //     if (error) res.send(error);
    //             //     //var add_response = result[0].Address;
    //             //     //console.log(result[0].Address);
    //             //     // db.connect_functions[db_knex_pack].query("UPDATE ACCOUNTS SET 'USE' = 1, COUNT = 1 WHERE Address = '';", (err, result, fields) => {
                        
    //             //     //     if (error) res.send(error);
    //             //     //     res.send('Call');
    //             //     // SELECT Address FROM ACCOUNTS WHERE 'USE' = 0 ORDER BY COUNT ASC LIMIT 1 FOR UPDATE;
    //             //     // })
                    
                    
    //             //     res.send(result);
    //             // });
    //         //Gather Unused BTC Address
    //         // db.connect_functions[db_knex_pack]('ACCOUNTS').select('Address').where('USE',0).orderBy('COUNT').first().then(data =>{res.send(data)});
            
            
    //         // res.send('Success');
        
    //         //return returndetail;
    //         console.log("Outer: " + return_detail);
    // return return_detail;
    //console.log(return_address);
    //res.send("You made it");  
}else{
            res.send('Fail Secret KEY')
        }
    }else{
        res.send('Fail API Key');
    }

})

module.exports = router;