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
    c) start the whole program over
        Travis helped me bring it together. Good to understand that after a query, mySQL takes input in array format [?one, ?two, ?three] to replace the ? values in the query statement

6) BONUS - can I now AADJUST products quantity?
Steps
    a) change first inquirer to have 2 options - buy an item or adjust an item - done!
    b) if they buy, go into current program - done!
    c) if they adjust - they can choose price or quantity or name or department
    d) depending on which one they choose, prompt for  updated amount/data
    e) UPDATE db, return results and start over
        Got it done - feels great!

7) BONUS 2 - use dotenv to store database info (cause I didn't to this in the Liri homework)
    Done! It is simple to use