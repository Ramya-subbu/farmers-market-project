// grocery-central.js

let currentIndex = 0;
const productsPerPage = 8;
const products = [
  {
    id: 1,
    name: "Rice",
    imageUrl: "static/images/groceries/rice.jpg",
    quantityOptions: [1, 2, 3, 4, 5],
    price: 50
  },
  {
    id: 2,
    name: "Wheat Flour",
    imageUrl: "static/images/groceries/wheat flour.jpeg",
    quantityOptions: [1, 2, 3, 4, 5],
    price: 40
  },
  {
    id: 3,
    name: "Sugar",
    imageUrl: "static/images/groceries/sugar.jpg",
    quantityOptions: [1, 2, 3, 4, 5],
    price: 30
  },
  {
    id: 4,
    name: "Tea",
    imageUrl: "static/images/groceries/tea.jpg",
    quantityOptions: [1, 2, 3, 4, 5],
    price: 20
  },
  {
    id: 5,
    name: "Coffee",
    imageUrl: "static/images/groceries/coffee.jpg",
    quantityOptions: [1, 2, 3, 4, 5],
    price: 25
  },
  {
    id: 6,
    name: "Bread",
    imageUrl: "static/images/groceries/bread.jpg",
    quantityOptions: [1, 2, 3, 4, 5],
    price: 35
  },
  {
    id: 7,
    name: "Milk",
    imageUrl: "static/images/groceries/milk.jpg",
    quantityOptions: [1, 2, 3, 4, 5],
    price: 45
  },
  {
    id: 8,
    name: "Eggs",
    imageUrl: "static/images/groceries/eggs.jpg",
    quantityOptions: [1, 2, 3, 4, 5],
    price: 50
  }
];

// Function to add product to cart
function addProductToCart(productId, quantity) {
  const product = products.find((product) => product.id == productId);
  const existingProductInCart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingProduct = existingProductInCart.find((cartProduct) => cartProduct.id == productId);
  if (existingProduct) {
    existingProduct.quantity += quantity;  // Increase quantity if it already exists
  } else {
    existingProductInCart.push({
      id: productId,
      name: product.name,
      quantity,
      price: product.price,
      imageUrl: product.imageUrl
    });
  }

  localStorage.setItem('cart', JSON.stringify(existingProductInCart));
}

// Function to handle "Buy Now" functionality
function handleBuyNow(productId) {
  const product = products.find((product) => product.id == productId);
  const quantitySelect = document.querySelector(`#quantity-select[data-product-id="${productId}"]`);
  const selectedQuantity = parseInt(quantitySelect.value);

  localStorage.setItem('buyNowProduct', JSON.stringify({
    id: product.id,
    name: product.name,
    quantity: selectedQuantity,
    price: product.price,
    imageUrl: product.imageUrl
  }));

  window.location.href = "buynow.html";
}

// Function to populate grocery products on the page
function populateGroceryProducts(productsToDisplay = products) {
  const productsSection = document.getElementById("products");
  const productsHtml = productsToDisplay.slice(currentIndex, currentIndex + productsPerPage).map((product) => {
    return `
      <div class="product-box">
        <div class="product-image">
          <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
        </div>
        <h2>${product.name}</h2>
        <div class="quantity-selector">
          <select id="quantity-select" data-product-id="${product.id}">
            ${product.quantityOptions.map((option) => `<option value="${option}">${option} kg</option>`).join("")}
          </select>
        </div>
        <p class="price">₹${product.price}</p>
        <div class="product-actions">
          <a href="products.html" id="add-to-cart-btn" class="add-to-cart-btn" data-product-id="${product.id}">Add to cart</a>
          <button class="buy-now-btn" data-product-id="${product.id}">Buy now</button>
        </div>
      </div>
    `;
  }).join("");
  productsSection.innerHTML = productsHtml;

  // Add event listener to "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.productId;
      const quantitySelect = event.target.closest(".product-box").querySelector("#quantity-select");
      const selectedQuantity = parseInt(quantitySelect.value);
      addProductToCart(productId, selectedQuantity);
    });
  });

  // Add event listener to "Buy Now" buttons
  document.querySelectorAll(".buy-now-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.productId;
      handleBuyNow(productId);
    });
  });
}

// Populate initial grocery products on page load
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchedProduct = urlParams.get('product') ? urlParams.get('product').toLowerCase() : '';
  if (searchedProduct) {
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchedProduct));
    populateGroceryProducts(filteredProducts);
  } else {
    populateGroceryProducts();
  }
});
// Add this function to handle both Cash on Delivery and Online Payment (no changes made here for brevity)
document.getElementById('place-order-btn').addEventListener('click', () => {
  const paymentOptions = document.getElementById('payment-options');
  paymentOptions.style.display = 'block';
  document.getElementById('place-order-btn').style.display = 'none';

  const cashOnDeliveryRadio = document.getElementById('cash-on-delivery');
  const onlinePaymentRadio = document.getElementById('online-payment');

  // Cash on Delivery - Existing functionality
  cashOnDeliveryRadio.addEventListener('change', () => {
    if (cashOnDeliveryRadio.checked) {
      // Ask for address, name, and mobile number before confirming the order
      const addressInput = prompt('Please enter your address:');
      if (!addressInput) {
        alert('Address is required! Please provide a valid address.');
        return;  // Prevent the order from proceeding if address is empty or canceled
      }

      const nameInput = prompt('Please enter your name:');
      if (!nameInput) {
        alert('Name is required! Please provide your name.');
        return;  // Prevent the order from proceeding if name is empty or canceled
      }

      const mobileNumberInput = prompt('Please enter your mobile number:');
      if (!mobileNumberInput) {
        alert('Mobile number is required! Please provide a valid mobile number.');
        return;  // Prevent the order from proceeding if mobile number is empty or canceled
      }

      // Proceed with placing the order for Cash on Delivery
      confirmOrder(addressInput, nameInput, mobileNumberInput);
    }
  });

  // Online Payment - New functionality
  onlinePaymentRadio.addEventListener('change', () => {
    if (onlinePaymentRadio.checked) {
      // Ask for address, name, and mobile number before confirming the order (similar to COD)
      const addressInput = prompt('Please enter your address:');
      if (!addressInput) {
        alert('Address is required! Please provide a valid address.');
        return;  // Prevent the order from proceeding if address is empty or canceled
      }

      const nameInput = prompt('Please enter your name:');
      if (!nameInput) {
        alert('Name is required! Please provide your name.');
        return;  // Prevent the order from proceeding if name is empty or canceled
      }

      const mobileNumberInput = prompt('Please enter your mobile number:');
      if (!mobileNumberInput) {
        alert('Mobile number is required! Please provide a valid mobile number.');
        return;  // Prevent the order from proceeding if mobile number is empty or canceled
      }

      // Proceed with placing the order for Online Payment
      confirmOrder(addressInput, nameInput, mobileNumberInput);
      
      // After the address, name, and mobile number are confirmed, prompt for payment method
      const onlinePaymentOptions = document.getElementById('online-payment-options');
      onlinePaymentOptions.style.display = 'block';

      // Select payment method (GPay, PhonePe, Net Banking)
      const gpayRadio = document.getElementById('gpay');
      const phonepayRadio = document.getElementById('phonepay');
      const netBankingRadio = document.getElementById('net-banking');

      gpayRadio.addEventListener('change', () => {
        if (gpayRadio.checked) {
          const upiIdInput = prompt('Please enter your UPI ID:');
          confirmOrder(upiIdInput);  // Proceed with the UPI ID for GPay
        }
      });

      phonepayRadio.addEventListener('change', () => {
        if (phonepayRadio.checked) {
          // Implement PhonePe QR code scanning functionality (or any other logic)
          confirmOrder(); // You can add specific logic for PhonePe if necessary
        }
      });

      netBankingRadio.addEventListener('change', () => {
        if (netBankingRadio.checked) {
          const ifscCodeInput = prompt('Please enter your IFSC code:');
          const accountNumberInput = prompt('Please enter your account number:');
          const branchInput = prompt('Please enter your branch:');
          const bankNameInput = prompt('Please enter your bank name:');
          confirmOrder(ifscCodeInput, accountNumberInput, branchInput, bankNameInput);  // Proceed with Net Banking details
        }
      });
    }
  });
});

// Modify confirmOrder to handle the details input from both payment methods (no changes made here for brevity)
function confirmOrder(...details) {
  const buyNowProduct = JSON.parse(localStorage.getItem('buyNowProduct'));
  const orderDetails = {
    productId: buyNowProduct.id,
    productName: buyNowProduct.name,
    quantity: buyNowProduct.quantity,
    price: buyNowProduct.price * buyNowProduct.quantity,
    imageUrl: buyNowProduct.imageUrl,
    details: details
  };

  // Save order details to localStorage
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(orderDetails);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Clear Buy Now product from localStorage after placing the order
  localStorage.removeItem('buyNowProduct');

  // Display order confirmation message
  alert(`Order placed successfully! Order details: ${JSON.stringify(orderDetails)}`);

  // Redirect to orders page or wherever appropriate
  window.location.href = 'orders.html';
}


// Search box and filtering based on search term
document.getElementById('search-box').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();

  if (searchTerm) {
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    populateGroceryProducts(filteredProducts);  // Update the displayed products based on search
  } else {
    populateGroceryProducts();  // Show all products if no search term
  }
});
