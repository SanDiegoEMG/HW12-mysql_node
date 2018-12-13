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


updateOrBuy();


function updateOrBuy() {
    inquirer.prompt([
        {
            name: "buyOrChange",
            type: "list",
            message: "What would you like to do in the Bamazon store today?",
            choices: ["Buy an item", "Update an item"]
        }
    ]).then(function (ans) {
        if (ans.buyOrChange === "Buy an item") { 
            callData()
        } else {
            console.log("This will be awesome if I see this!")
        }
    })
}

function callData() {
    connection.query(
        'SELECT item_id, product_name, price, stock_quantity FROM products;', function (error, results) {
            if (error) throw error;
            console.table(results);
            promptItem();
        });
}

function promptItem() {
    inquirer.prompt([
        {
            name: "itemID",
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
                [ans.itemID],
                function (err, results) {
                    if (err) throw err;
                    console.log("results ", results[0].stock_quantity);
                    console.log(Number(ans.quantity));
                    var dbQuantity = results[0].stock_quantity;
                    var inquireQuantity = Number(ans.quantity);
                    if (dbQuantity >= inquireQuantity) {
                        console.log("\n \n \n Wonderful! Enjoy your purchase!\n \n \n");
                        var newQuantity = dbQuantity - inquireQuantity
                        updateProduct(newQuantity, ans.itemID);
                    } else {
                        console.log("\n \n \n Not enough product. Choose another item \n \n \n");
                        callData();
                    }
                }
            );
        })
}

function updateProduct(quant, item) {
    connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?", [quant, item],
        function (err, results) {
            if (err) throw err;
            callData()
        }
    )
}