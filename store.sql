CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(55) NOT NULL,
  department_name VARCHAR(55) NOT NULL,
  price decimal(10,2) NULL,
  stock_quantity int(10) DEFAULT 0,
  PRIMARY KEY (item_id)
);
SELECT * FROM products;