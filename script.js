// script.js

// Sample products for the vending machine
const products = [
    { id: 1, name: "Chips", price: 1.5 },
    { id: 2, name: "Soda", price: 2.0 },
    { id: 3, name: "Candy", price: 1.0 },
    { id: 4, name: "Water", price: 1.2 }
];

let balance = 0;

// Render products
function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach(product => {
        const item = document.createElement("div");
        item.className = "product";
        item.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button onclick="buyProduct(${product.id})">Buy</button>
        `;
        productList.appendChild(item);
    });
}

// Update balance display
function updateBalance() {
    document.getElementById("balance").textContent = `$${balance.toFixed(2)}`;
}

// Handle adding money
document.getElementById("add-money-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("money-input").value);
    if (!isNaN(amount) && amount > 0) {
        balance += amount;
        updateBalance();
        document.getElementById("message").textContent = `Added $${amount.toFixed(2)}.`;
    } else {
        document.getElementById("message").textContent = "Enter a valid amount.";
    }
    this.reset();
});

// Handle buying a product
window.buyProduct = function(id) {
    const product = products.find(p => p.id === id);
    if (balance >= product.price) {
        balance -= product.price;
        updateBalance();
        document.getElementById("message").textContent = `Enjoy your ${product.name}!`;
    } else {
        document.getElementById("message").textContent = "Insufficient balance.";
    }
};

// Initialize
renderProducts();
updateBalance();