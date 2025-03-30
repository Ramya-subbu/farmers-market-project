document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
  
    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // If cart is empty, show a message
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalPriceElement.textContent = "0";
    } else {
      let totalPrice = 0;
  
      // Loop through cart items and display them
      cart.forEach((product, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}" class="cart-item-image">
          <div class="cart-item-details">
            <h3>${product.name}</h3>
            <p>Quantity: ${product.quantity}</p>
            <p>Price: ₹${product.price}</p>
            <p>Total: ₹${product.price * product.quantity}</p>
          </div>
          <button class="remove-from-cart" data-index="${index}">Remove</button>
        `;
  
        cartItemsContainer.appendChild(cartItem);
  
        // Add to total price
        totalPrice += product.price * product.quantity;
      });
  
      // Update total price
      totalPriceElement.textContent = totalPrice;
    }
  
    // Event delegation for remove button
    cartItemsContainer.addEventListener("click", function (event) {
      if (event.target && event.target.classList.contains("remove-from-cart")) {
        const productIndex = event.target.dataset.index;
        removeFromCart(productIndex);
      }
    });
  });
  
  // Function to remove a product from the cart
  function removeFromCart(productIndex) {
    // Retrieve the current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Remove the product at the given index
    cart.splice(productIndex, 1);
  
    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Reload the page to reflect the changes
    window.location.reload();
  }
  