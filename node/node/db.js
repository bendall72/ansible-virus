const mysql = require('mysql');

const connect_functions = {
    BD01: mysql.createConnection({
            host: "167.71.169.178",
            user: "BD01",
            password:"noKfD9gaaQjRCKhV2ufg",
            database:"BusDev01"
}),
    BD02: mysql.createConnection({
            host: "167.71.169.178",
            user: "BD02",
            password:"OVXFcHwPdzErYqQGm4uQ",
            database:"BusDev02"
}),
    Open1: mysql.createConnection({
        host: "167.71.169.178",
        user: "Open1",
        password:"3B84flSIj12uwjvuWuGZ",
        database:"OpenEnroll1000"
}),
    Ledger: mysql.createConnection({
    host: "167.71.169.178",
    user: "Ledger",
    password:"fkrKNQ1b0ChWUiyfbcRl",
    database:"LEDGER"
})

}


exports.connect_functions = connect_functions;
