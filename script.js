// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Call updateCartUI on page load to display cart contents
updateCartUI();

// Function to add items to the cart
function addToCart(productName, price) {
  cart.push({ productName, price });
  localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
  updateCartUI();
}

// Update cart display
function updateCartUI() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  // Clear existing items in the cart
  cartItems.innerHTML = '';
  
  // Add cart items to the list
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center','py-1');
    
    // Display product name and price
    li.innerHTML = `${item.productName} - $${item.price}
      <button onclick="deleteItem(${index})" class="btn btn-danger btn-sm">Delete</button>`;
    
    cartItems.appendChild(li);
    total += parseFloat(item.price);
  });
  
  // Update total price and cart count
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-product');
    const price = button.getAttribute('data-price');
    addToCart(productName, price);
  });
});

// Delete item from cart
function deleteItem(index) {
  // Remove the item from the cart array
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
  updateCartUI(); // Refresh cart UI
}

function checkout() {
  window.location.href = 'checkout.html';
  cart = JSON.parse(localStorage.getItem("cart"));
}

function payment() {
  localStorage.setItem("cart", "[]");
  alert("Payment complete");
  window.location.href = 'index.html';
}
