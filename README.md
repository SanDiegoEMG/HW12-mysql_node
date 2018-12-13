# HW12-mysql_node
Creating mock online store that can handle inventory changes

NPM used: mysql, chalk, inquirer, console.table, dotenv

Pseudo Code & Process details

1) create database 'bamazon' with table 'products' containing following columns
    item_id = primary key
    product_name = varchar(55) Not Null
    department_name = varchar(55) Not Null
    price = decimal(10, 2) Not Null
    stock_quantity = int(10)
        Done - no issues

2) add 10 mock items to get started
    ?? could I use a for-loop and fs.writeFile to my sql file to get this done quicker??
        Done - no issues

3) display all items available w/product_name, item_id, price, stock_quantity
    a) establish mySQL connection with database
        Done - no issues
    b) craft Query and display in terminal when code is run
        Worked it out in workbench
        SELECT product_name, price, stock_quantity FROM products;
        Done - no issues

4) Prompt users with 2 questions
    a) item number they want to buy
    b) quantity they want to purchase
        Inquirer for the questions
        Done. Love inquirer. 

5) If there is sufficient stock, subtract from stock_quantity and display new items list
    ??????????????????????????????????????
    a) perform subtraction and assign new variable to new value
    b) update the value in the database
    c)start the whole program over