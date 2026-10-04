const API = "/api";


// ================================
// Navigation
// ================================

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
    item.addEventListener("click", () => {
        showSection(item.dataset.section);
    });
});


function showSection(sectionName) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(sectionName).classList.add("active");

    navItems.forEach(item => {
        item.classList.remove("active");

        if (item.dataset.section === sectionName) {
            item.classList.add("active");
        }
    });

    const titles = {
        dashboard: [
            "Dashboard",
            "Overview of your store performance"
        ],
        customers: [
            "Customers",
            "Manage registered customers"
        ],
        products: [
            "Products",
            "Manage products and inventory"
        ],
        orders: [
            "Orders",
            "Track and manage customer orders"
        ]
    };

    document.getElementById("pageTitle").textContent =
        titles[sectionName][0];

    document.getElementById("pageSubtitle").textContent =
        titles[sectionName][1];
}


// ================================
// Dashboard
// ================================

async function loadDashboard() {

    try {

        const response = await fetch(`${API}/dashboard`);

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        const data = result.data;

        document.getElementById("customerCount")
            .textContent = data.customers;

        document.getElementById("productCount")
            .textContent = data.products;

        document.getElementById("orderCount")
            .textContent = data.orders;

        document.getElementById("revenue")
            .textContent =
            "₹" +
            Number(data.revenue).toLocaleString("en-IN");

    } catch (error) {

        console.error("Dashboard error:", error);

    }

    loadRecentOrders();
}


// ================================
// Recent Orders
// ================================

async function loadRecentOrders() {

    try {

        const response =
            await fetch(`${API}/orders`);

        const result = await response.json();

        const table =
            document.getElementById("recentOrders");

        table.innerHTML = "";

        result.data.slice(0, 4).forEach(order => {

            table.innerHTML += `

                <tr>

                    <td>#${order.order_id}</td>

                    <td>${order.customer}</td>

                    <td>
                        ₹${Number(order.total_amount)
                            .toLocaleString("en-IN")}
                    </td>

                    <td>
                        <span class="status ${order.status.toLowerCase()}">
                            ${order.status}
                        </span>
                    </td>

                </tr>

            `;
        });

    } catch (error) {

        console.error("Orders error:", error);

    }
}


// ================================
// Customers
// ================================

async function loadCustomers() {

    try {

        const response =
            await fetch(`${API}/customers`);

        const result = await response.json();

        const table =
            document.getElementById("customerTable");

        table.innerHTML = "";

        result.data.forEach(customer => {

            table.innerHTML += `

                <tr>

                    <td>#${customer.customer_id}</td>

                    <td>
                        <strong>${customer.name}</strong>
                    </td>

                    <td>${customer.email || "-"}</td>

                    <td>${customer.city || "-"}</td>

                    <td>
                        <button class="text-btn">
                            Edit
                        </button>
                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.error("Customers error:", error);

    }
}


// ================================
// Customer Search
// ================================

async function searchCustomers() {

    const value =
        document
            .getElementById("customerSearch")
            .value
            .toLowerCase();

    const response =
        await fetch(`${API}/customers`);

    const result = await response.json();

    const filtered =
        result.data.filter(customer =>
            customer.name
                .toLowerCase()
                .includes(value) ||

            (customer.email || "")
                .toLowerCase()
                .includes(value) ||

            (customer.city || "")
                .toLowerCase()
                .includes(value)
        );

    const table =
        document.getElementById("customerTable");

    table.innerHTML = "";

    filtered.forEach(customer => {

        table.innerHTML += `

            <tr>

                <td>#${customer.customer_id}</td>

                <td>
                    <strong>${customer.name}</strong>
                </td>

                <td>${customer.email || "-"}</td>

                <td>${customer.city || "-"}</td>

                <td>
                    <button class="text-btn">
                        Edit
                    </button>
                </td>

            </tr>

        `;

    });
}


// ================================
// Products
// ================================

async function loadProducts() {

    try {

        const response =
            await fetch(`${API}/products`);

        const result = await response.json();

        const table =
            document.getElementById("productTable");

        table.innerHTML = "";

        result.data.forEach(product => {

            const stockClass =
                product.stock <= 10
                    ? "pending"
                    : "delivered";

            table.innerHTML += `

                <tr>

                    <td>#${product.product_id}</td>

                    <td>
                        <strong>${product.product_name}</strong>
                    </td>

                    <td>${product.category || "-"}</td>

                    <td>
                        ₹${Number(product.price)
                            .toLocaleString("en-IN")}
                    </td>

                    <td>

                        <span class="status ${stockClass}">

                            ${product.stock}

                            ·

                            ${product.stock <= 10
                                ? "Low Stock"
                                : "In Stock"}

                        </span>

                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.error("Products error:", error);

    }
}


// ================================
// Product Search
// ================================

async function searchProducts() {

    const value =
        document
            .getElementById("productSearch")
            .value
            .toLowerCase();

    const response =
        await fetch(`${API}/products`);

    const result = await response.json();

    const filtered =
        result.data.filter(product =>
            product.product_name
                .toLowerCase()
                .includes(value) ||

            (product.category || "")
                .toLowerCase()
                .includes(value)
        );

    const table =
        document.getElementById("productTable");

    table.innerHTML = "";

    filtered.forEach(product => {

        table.innerHTML += `

            <tr>

                <td>#${product.product_id}</td>

                <td>
                    <strong>${product.product_name}</strong>
                </td>

                <td>${product.category || "-"}</td>

                <td>
                    ₹${Number(product.price)
                        .toLocaleString("en-IN")}
                </td>

                <td>

                    <span class="status ${
                        product.stock <= 10
                            ? "pending"
                            : "delivered"
                    }">

                        ${product.stock}

                    </span>

                </td>

            </tr>

        `;

    });
}


// ================================
// Orders
// ================================

async function loadOrders() {

    try {

        const response =
            await fetch(`${API}/orders`);

        const result = await response.json();

        const table =
            document.getElementById("orderTable");

        table.innerHTML = "";

        result.data.forEach(order => {

            table.innerHTML += `

                <tr>

                    <td>#${order.order_id}</td>

                    <td>${order.customer}</td>

                    <td>${order.order_date}</td>

                    <td>
                        ₹${Number(order.total_amount)
                            .toLocaleString("en-IN")}
                    </td>

                    <td>

                        <span class="status ${
                            order.status.toLowerCase()
                        }">

                            ${order.status}

                        </span>

                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.error("Orders error:", error);

    }
}


// ================================
// Start Application
// ================================

loadDashboard();
loadCustomers();
loadProducts();
loadOrders();