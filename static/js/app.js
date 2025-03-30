// Function to load and display cart products from localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from localStorage
  
    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalPriceElement = document.getElementById('total-price');
    let totalAmount = 0; // Variable to keep track of the total price
  
    // Clear existing rows in the table before adding new ones
    cartTableBody.innerHTML = '';
  
    // Loop through each product in the cart and create table rows
    cart.forEach((product) => {
      const productTotalPrice = product.price * product.quantity;
      totalAmount += productTotalPrice; // Add the product's total price to the overall total
  
      // Create a new table row for each product
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${product.imageUrl}" alt="${product.name}" width="50px"></td>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>₹${product.price}</td>
        <td>₹${productTotalPrice}</td>
        <td><button class="remove-btn" data-product-id="${product.id}">Remove</button></td>
      `;
      cartTableBody.appendChild(row);
    });
  
    // Update the total amount in the cart
    totalPriceElement.textContent = totalAmount;
  
    // Add event listeners to "Remove" buttons
    document.querySelectorAll('.remove-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        removeProductFromCart(productId); // Call function to remove product
      });
    });
  }
  
  // Function to remove a product from the cart
  function removeProductFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get current cart from localStorage
  
    // Filter out the product with the matching ID
    cart = cart.filter((product) => product.id !== productId);
  
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    loadCart(); // Reload the cart after removing the product
  }
  
  // Call the loadCart function when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    loadCart();
  });
  