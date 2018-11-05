// Bamazon App
// Author: Andrew Ulm

// Imports
const mysql = require('mysql');
const inquirer = require('inquirer');

// Set Variables
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'AJUaru2968648**',
    database: 'bamazon'
});

db.connect( (err) => {
   if (err) throw err;
   useDB();
});

function queryDB(query) {
    db.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
}

function useDB() {
    let sql = 'USE bamazon';
    queryDB(sql);

    // sql =
    //     `CREATE TABLE products(
    //     item_id INT AUTO_INCREMENT,
    //     product_name VARCHAR(255),
    //     department_name VARCHAR(255),
    //     price FLOAT(100, 2),
    //     stock_quantity INT(100),
    //     PRIMARY KEY (item_id))`;
    // queryDB(sql);

    sql =
        `INSERT INTO products (product_name, department_name, price, stock_quantity)
        VALUES('Camera', 'Electronics', 49.99, 10);`;
    queryDB(sql);
}