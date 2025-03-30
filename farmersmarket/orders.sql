-- orders.sql

CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  order_date DATE,
  total_cost DECIMAL(10, 2),
  payment_method VARCHAR(255),
  order_status VARCHAR(255)
);

CREATE TABLE order_items (
  id INT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT,
  price DECIMAL(10, 2)
);

CREATE TABLE payments (
  id INT PRIMARY KEY,
  order_id INT,
  payment_date DATE,
  payment_amount DECIMAL(10, 2),
  payment_status VARCHAR(255)
);