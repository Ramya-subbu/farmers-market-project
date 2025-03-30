// Function to load cart data and populate the Buy Now page
window.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const buynowTableBody = document.querySelector('#buynow-table tbody');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const taxElement = document.getElementById('tax');
    const totalAmountElement = document.getElementById('total-amount');

    let subtotal = 0;
    let tax = 0;

    // Display the products in the cart
    cart.forEach(product => {
        const totalProductPrice = product.price * product.quantity;
        subtotal += totalProductPrice;

        // Create table row for each product
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>₹${product.price}</td>
            <td>₹${totalProductPrice}</td>
            <td><button onclick="removeProduct('${product.id}')">Remove</button></td>
        `;
        buynowTableBody.appendChild(row);
    });

    // Calculate and display the price details
    tax = subtotal * 0.18; // Assuming 18% tax
    const shippingCharges = 50; // Flat shipping fee

    const totalAmount = subtotal + tax + shippingCharges;

    // Set the values in the price details section
    subtotalElement.textContent = subtotal.toFixed(2);
    shippingElement.textContent = shippingCharges.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    totalAmountElement.textContent = totalAmount.toFixed(2);
});

// Function to remove a product from the cart
function removeProduct(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the product from the cart
    cart = cart.filter(item => item.id !== productId);

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Reload the page to update the table
    window.location.reload();
}

// Function to handle the Buy Now process (e.g., submit order)
function processOrder() {
    const paymentMethod = document.getElementById('payment-method').value;
    alert(`Order placed successfully using ${paymentMethod}. Thank you for your purchase!`);
    
    // Here you would add your order submission logic (e.g., API call)
    // You might also want to clear the cart and redirect the user to a confirmation page
    localStorage.removeItem('cart');
    window.location.href = 'order-confirmation.html'; // Redirect to order confirmation page
}
