const myslq = require("mysql");

const conexao = myslq.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "admin",
    database: "salao-beleza"
})

module.exports = conexao;
