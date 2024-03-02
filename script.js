// JavaScript (script.js)
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize cart in session storage
if (!sessionStorage.getItem("cart")) {
  sessionStorage.setItem("cart", JSON.stringify([]));
}

// Render product list
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  const cartItems = JSON.parse(sessionStorage.getItem("cart"));
  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    const cartItems = JSON.parse(sessionStorage.getItem("cart"));
    cartItems.push({ id: product.id, name: product.name, price: product.price });
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  const cartItems = JSON.parse(sessionStorage.getItem("cart"));
  const updatedCart = cartItems.filter((item) => item.id !== productId);
  sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.setItem("cart", JSON.stringify([]));
  renderCart();
}

// Event listeners
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(e.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
