// const mysql = require("mysql");
// const express = require('express');
// // const mysql = require('mysql2');
// const bodyParser = require('body-parser'); 
// // const bcrypt = require('bcryptjs'); 
// // const jwt = require('jsonwebtoken'); 
// // const path = require('path'); 
// // const app = express(); 
// // const port = 3000;
// const conn = mysql.createConnection({
//     host : "localhost",
//     user : "root",
//     password : "",
//     database : "voting1",
//     port : "3311"
// });


// conn.connect((error) => {
//     if (error) {
//         console.log("Error in the connection to database : ",error);
//         return;
//     }else{
//         console.log("connected successfully");
//     }
// });

// module.exports = conn;

const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "voting1",
  port: "3311",
});

conn.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
  } else {
    console.log("Connected to the database successfully.");
  }
});

module.exports = conn;
