const mysql = require("mysql2/promise");
const mySqlPool = mysql.createPool({
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "my_duct",
  host: "bzstvt8iovjaxk3kkjja-mysql.services.clever-cloud.com",
  user: "u6xw1pn8jwnxhjan",
  password: "Q4IqrxvJd4krvl0OWSN3",
  database: "bzstvt8iovjaxk3kkjja",
  port: "3306",
});
module.exports = mySqlPool;
