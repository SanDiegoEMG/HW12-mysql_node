var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
const chalk = require('chalk');
require("dotenv").config();
var fs = require("fs");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "knowit2018",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

function callData(){ 
connection.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products;', function (error, results) {
        if (error) throw error;
        console.table(results);
        promptItem();
    });
}

callData()

function promptItem() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What is the item_id on the product you would like to purchase?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many of that item would you like to purchase?"
        }
    ])
        .then(function (ans) {
            connection.query(
                "SELECT stock_quantity FROM products WHERE item_id = ?", 
                [ans.item], 
                function (err, results) 
                {
                    if (err) throw err;
                    console.log("results ", results[0].stock_quantity);
                    console.log(Number(ans.quantity));
                    var dbQuantity = results[0].stock_quantity;
                    var  inquireQuantity= Number(ans.quantity);
                    if (dbQuantity >= inquireQuantity) {
                        console.log("it's a match!");

                        callData()
                    } else {
                        console.log("Not enough product. Choose another item \n \n");
                        callData();
                    }
                }
            );
        })
    }

    // 