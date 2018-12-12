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
    getProducts();
});


function getProducts() {
    let sql = 'SELECT * FROM products';

    db.query(sql, (err, result) => {
        if (err) throw err;

        result.forEach( (item) => {
           console.log(`
           ID: ${item.item_id}
           Product: ${item.product_name}
           Department: ${item.department_name}
           Price: $${item.price}
           Stock: ${item.stock_quantity}`);
        });
        userPrompt();
    });
}

function userPrompt() {
    inquirer.prompt([
        {
            name: 'item_id',
            type: 'input',
            message: 'Which product ID would you like to purchase?'
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'How many would you like to purchase?'
        }]
        ).then((answers) => {
            let sql = `SELECT * FROM products WHERE item_id = ${answers.item_id}`;
            db.query(sql, (err, result) => {
               if (result[0].stock_quantity > answers.quantity) {
                   sql =
                       `UPDATE products
                        SET stock_quantity = stock_quantity - ${answers.quantity}
                        WHERE item_id = ${answers.item_id}`;
                   db.query(sql, (err, result) => {
                       if (err) throw err;
                   });
               } else {
                   console.log('We dont have enough of that product in stock!');
               }
                console.log('Item Purchased');
                getProducts();
            });
    });
}