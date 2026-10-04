const path = require("path");
const express = require("express");
const cors = require("cors");
const pool = require("./db");

require("dotenv").config();

const app = express();
app.use(express.static(path.join(__dirname, "../public")));

const PORT = process.env.PORT || 5000;


// -----------------------------
// Middleware
// -----------------------------

app.use(cors());

app.use(express.json());


// -----------------------------
// Home / Health Check
// -----------------------------

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "ShopDB API is running"
    });

});


// =====================================================
// CUSTOMERS
// =====================================================


// GET all customers

app.get("/api/customers", async (req, res) => {

    try {

        const [rows] = await pool.query(
            "SELECT * FROM Customers ORDER BY customer_id DESC"
        );

        res.json({
            success: true,
            data: rows
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// GET customer by ID

app.get("/api/customers/:id", async (req, res) => {

    try {

        const [rows] = await pool.query(
            "SELECT * FROM Customers WHERE customer_id = ?",
            [req.params.id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });

        }

        res.json({
            success: true,
            data: rows[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// CREATE customer

app.post("/api/customers", async (req, res) => {

    try {

        const {
            name,
            email,
            city,
            age
        } = req.body;


        const [result] = await pool.query(

            `INSERT INTO Customers
            (name, email, city, age, created_at)
            VALUES (?, ?, ?, ?, CURDATE())`,

            [
                name,
                email,
                city,
                age
            ]

        );


        res.status(201).json({

            success: true,

            message: "Customer created successfully",

            customerId: result.insertId

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// UPDATE customer

app.put("/api/customers/:id", async (req, res) => {

    try {

        const {
            name,
            email,
            city,
            age
        } = req.body;


        const [result] = await pool.query(

            `UPDATE Customers
             SET name = ?,
                 email = ?,
                 city = ?,
                 age = ?
             WHERE customer_id = ?`,

            [
                name,
                email,
                city,
                age,
                req.params.id
            ]

        );


        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,

                message: "Customer not found"

            });

        }


        res.json({

            success: true,

            message: "Customer updated successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// DELETE customer

app.delete("/api/customers/:id", async (req, res) => {

    try {

        const [result] = await pool.query(

            "DELETE FROM Customers WHERE customer_id = ?",

            [req.params.id]

        );


        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,

                message: "Customer not found"

            });

        }


        res.json({

            success: true,

            message: "Customer deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// =====================================================
// PRODUCTS
// =====================================================


// GET products

app.get("/api/products", async (req, res) => {

    try {

        const [rows] = await pool.query(

            "SELECT * FROM Products ORDER BY product_id DESC"

        );

        res.json({

            success: true,

            data: rows

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// GET product by ID

app.get("/api/products/:id", async (req, res) => {

    try {

        const [rows] = await pool.query(

            "SELECT * FROM Products WHERE product_id = ?",

            [req.params.id]

        );


        if (rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Product not found"

            });

        }


        res.json({

            success: true,

            data: rows[0]

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// CREATE product

app.post("/api/products", async (req, res) => {

    try {

        const {
            product_name,
            category,
            price,
            stock
        } = req.body;


        const [result] = await pool.query(

            `INSERT INTO Products
            (product_name, category, price, stock)
            VALUES (?, ?, ?, ?)`,

            [
                product_name,
                category,
                price,
                stock
            ]

        );


        res.status(201).json({

            success: true,

            message: "Product created successfully",

            productId: result.insertId

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// UPDATE product

app.put("/api/products/:id", async (req, res) => {

    try {

        const {
            product_name,
            category,
            price,
            stock
        } = req.body;


        const [result] = await pool.query(

            `UPDATE Products
             SET product_name = ?,
                 category = ?,
                 price = ?,
                 stock = ?
             WHERE product_id = ?`,

            [
                product_name,
                category,
                price,
                stock,
                req.params.id
            ]

        );


        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,

                message: "Product not found"

            });

        }


        res.json({

            success: true,

            message: "Product updated successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// DELETE product

app.delete("/api/products/:id", async (req, res) => {

    try {

        const [result] = await pool.query(

            "DELETE FROM Products WHERE product_id = ?",

            [req.params.id]

        );


        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,

                message: "Product not found"

            });

        }


        res.json({

            success: true,

            message: "Product deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// =====================================================
// ORDERS
// =====================================================


// GET orders with customer information

app.get("/api/orders", async (req, res) => {

    try {

        const [rows] = await pool.query(`

            SELECT
                o.order_id,
                c.name AS customer,
                o.order_date,
                o.total_amount,
                o.status

            FROM Orders o

            JOIN Customers c
                ON o.customer_id = c.customer_id

            ORDER BY o.order_id DESC

        `);


        res.json({

            success: true,

            data: rows

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// =====================================================
// DASHBOARD
// =====================================================

app.get("/api/dashboard", async (req, res) => {

    try {

        const [[customers]] = await pool.query(`

            SELECT COUNT(*) AS total
            FROM Customers

        `);


        const [[products]] = await pool.query(`

            SELECT COUNT(*) AS total
            FROM Products

        `);


        const [[orders]] = await pool.query(`

            SELECT COUNT(*) AS total
            FROM Orders

        `);


        const [[revenue]] = await pool.query(`

            SELECT
                COALESCE(SUM(total_amount), 0) AS total
            FROM Orders
            WHERE status = 'Delivered'

        `);


        res.json({

            success: true,

            data: {

                customers: customers.total,

                products: products.total,

                orders: orders.total,

                revenue: revenue.total

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// =====================================================
// START SERVER
// =====================================================
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`ShopDB server running on port ${PORT}`);
});
