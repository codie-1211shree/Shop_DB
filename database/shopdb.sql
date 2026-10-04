-- ============================================
-- ShopDB E-Commerce Database
-- ============================================

CREATE DATABASE IF NOT EXISTS ShopDB;
USE ShopDB;

-- ============================================
-- 1. CUSTOMERS
-- ============================================

CREATE TABLE IF NOT EXISTS Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    city VARCHAR(50),
    age INT,
    created_at DATE
);

-- ============================================
-- 2. PRODUCTS
-- ============================================

CREATE TABLE IF NOT EXISTS Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2),
    stock INT
);

-- ============================================
-- 3. ORDERS
-- ============================================

CREATE TABLE IF NOT EXISTS Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10,2),
    status VARCHAR(30),

    FOREIGN KEY (customer_id)
        REFERENCES Customers(customer_id)
);

-- ============================================
-- 4. ORDER DETAILS
-- ============================================

CREATE TABLE IF NOT EXISTS OrderDetails (
    order_detail_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),

    FOREIGN KEY (order_id)
        REFERENCES Orders(order_id),

    FOREIGN KEY (product_id)
        REFERENCES Products(product_id)
);

-- ============================================
-- SAMPLE CUSTOMERS
-- ============================================

INSERT INTO Customers
(name, email, city, age, created_at)
VALUES
('Rahul Sharma', 'rahul@gmail.com', 'Mumbai', 22, '2026-03-01'),
('Sneha Patil', 'sneha@gmail.com', 'Pune', 25, '2026-03-02'),
('Amit Shah', 'amit@gmail.com', 'Navi Mumbai', 30, '2026-03-03'),
('Priya Mehta', 'priya@gmail.com', 'Mumbai', 28, '2026-03-04'),
('Neha Joshi', 'neha@gmail.com', 'Thane', 24, '2026-03-05');

-- ============================================
-- SAMPLE PRODUCTS
-- ============================================

INSERT INTO Products
(product_name, category, price, stock)
VALUES
('Laptop', 'Electronics', 60000.00, 10),
('Mobile', 'Electronics', 25000.00, 20),
('Keyboard', 'Accessories', 1500.00, 50),
('Mouse', 'Accessories', 800.00, 100),
('Headphones', 'Accessories', 2000.00, 30);

-- ============================================
-- SAMPLE ORDERS
-- ============================================

INSERT INTO Orders
(customer_id, order_date, total_amount, status)
VALUES
(1, '2026-03-10', 61500.00, 'Delivered'),
(2, '2026-03-11', 25000.00, 'Pending'),
(1, '2026-03-12', 2800.00, 'Delivered'),
(3, '2026-03-13', 2000.00, 'Cancelled'),
(4, '2026-03-14', 60000.00, 'Delivered');

-- ============================================
-- SAMPLE ORDER DETAILS
-- ============================================

INSERT INTO OrderDetails
(order_id, product_id, quantity, price)
VALUES
(1, 1, 1, 60000.00),
(1, 3, 1, 1500.00),
(2, 2, 1, 25000.00),
(3, 4, 1, 800.00),
(3, 5, 1, 2000.00),
(4, 5, 1, 2000.00),
(5, 1, 1, 60000.00);

-- ============================================
-- VERIFY DATA
-- ============================================

SELECT * FROM Customers;
SELECT * FROM Products;
SELECT * FROM Orders;
SELECT * FROM OrderDetails;