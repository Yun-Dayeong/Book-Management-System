var mysql = require('mysql');
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "bookmanagement"
})

module.exports = pool