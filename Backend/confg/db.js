const mysql = require("mysql2/promise");
const mySqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "my_duct",
});
module.exports = mySqlPool;
