var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
const chalk = require('chalk');
require("dotenv").config();



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "knowit2018",
    database: "bamazon"
});

updateOrBuy();

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
});


function updateOrBuy() {
    inquirer.prompt([
        {
            name: "buyOrChange",
            type: "list",
            message: "What would you like to do in the Bamazon store today?",
            choices: ["Buy an item", "Update an item", "Quit"]
        }
    ]).then(function (ans) {
        if (ans.buyOrChange === "Buy an item") {
            callData(promptItem)
        } else if (ans.buyOrChange === "Update an item") {
            callData(updateChoices)
        } else (
            connection.end()
        )
    })
};

function callData(callback) {
    connection.query(
        'SELECT item_id, product_name, department_name, price, stock_quantity FROM products;', function (error, results) {
            if (error) throw error;
            console.table(results);
            callback();
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
                    var dbQuantity = results[0].stock_quantity;
                    var inquireQuantity = Number(ans.quantity);
                    if (dbQuantity >= inquireQuantity) {
                        console.log("\n \n \n Wonderful! Enjoy your purchase!\n \n \n");
                        var newQuantity = dbQuantity - inquireQuantity
                        buyProduct(newQuantity, ans.itemID);
                    } else {
                        console.log("\n \n \n Not enough product. Choose another item \n \n \n");
                        callData(updateOrBuy);
                    }
                }
            );
        })
}

function buyProduct(quant, item) {
    connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?", [quant, item],
        function (err, results) {
            if (err) throw err;
            callData(updateOrBuy)
        }
    )
}

function updateChoices() {
    inquirer.prompt([
        {
            name: "itemIDforUpdate",
            type: "input",
            message: "What is the item_id for the item you would like to update?"
        },
        {
            name: "chooseUpdateField",
            type: "list",
            message: "What about that item would you like to update",
            choices: ["product_name", "department_name", "price", "stock_quantity"]
        }
    ]).then(function (ans) {
        var id = (ans.itemIDforUpdate)

        if (ans.chooseUpdateField === "product_name") {
            updateName(id)
        }
        else if (ans.chooseUpdateField === "department_name") {
            updateDept(id)
        }
        else if (ans.chooseUpdateField === "price") {
            updatePrice(id)
        }
        else if (ans.chooseUpdateField === "stock_quantity") {
            updateQty(id)
        }
    })
};


function updateName(item_id) {
    inquirer.prompt([
        {
            name: "nameUpdate",
            type: "input",
            message: "What is the new name you would like to display?"
        },
    ]).then(function (ans) {
        connection.query(
            "UPDATE products SET product_name = ? WHERE item_id = ?", [ans.nameUpdate, item_id],
            function (err, results) {
                if (err) throw err;
                callData(updateOrBuy)
            }
        )
    })
};

function updateDept(item_id) {
    inquirer.prompt([
        {
            name: "deptUpdate",
            type: "input",
            message: "What department do you want listed for this item?"
        },
    ]).then(function (ans) {
        console.log(ans.deptUpdate)
        connection.query(
            "UPDATE products SET department_name = ? WHERE item_id = ?", [ans.deptUpdate, item_id],
            function (err, results) {
                if (err) throw err;
                callData(updateOrBuy)
            }
        )
    })
};

function updatePrice(item_id) {
    inquirer.prompt([
        {
            name: "priceUpdate",
            type: "input",
            message: "How much would you like to charge for this item?"
        },
    ]).then(function (ans) {
        console.log(ans.priceUpdate)
        connection.query(
            "UPDATE products SET price = ? WHERE item_id = ?", [ans.priceUpdate, item_id],
            function (err, results) {
                if (err) throw err;
                callData(updateOrBuy)
            }
        )
    })
}

function updateQty(item_id) {
    inquirer.prompt([
        {
            name: "qtyUpdate",
            type: "input",
            message: "How many of this item are available?"
        },
    ]).then(function (ans) {
        console.log(ans.qtyUpdate)
        connection.query(
            "UPDATE products SET stock_quantity = ? WHERE item_id = ?", [ans.qtyUpdate, item_id],
            function (err, results) {
                if (err) throw err;
                callData(updateOrBuy)
            }
        )

    })
}