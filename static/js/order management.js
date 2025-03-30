const placeOrderBtn = document.getElementById('place-order-btn');
const cancelOrderBtn = document.getElementById('cancel-order-btn');
const orderStatusDiv = document.getElementById('order-status');
const adminDashboardBtn = document.getElementById('admin-dashboard-btn');
const adminDashboard = document.getElementById('admin-dashboard');

let orderId = 1;
let orderStatus = 'pending';
let userData = {};
let orders = [];

// Function to store order data
function storeOrderData(orderId, orderStatus, userData) {
  const orderData = {
    orderId,
    orderStatus,
    userData,
  };
  orders.push(orderData);
  localStorage.setItem('orders', JSON.stringify(orders));
}

// Function to retrieve order data
function retrieveOrderData() {
  const storedOrders = localStorage.getItem('orders');
  if (storedOrders) {
    orders = JSON.parse(storedOrders);
    return orders;
  }
  return [];
}

// Place order
placeOrderBtn.addEventListener('click', () => {
  userData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
  };
  storeOrderData(orderId, 'confirmed', userData);
  orderId++;
  updateOrderStatus('confirmed');
  displayAdminDashboard();
});

// Cancel order
cancelOrderBtn.addEventListener('click', () => {
  updateOrderStatus('canceled');
  displayAdminDashboard();
});

// Update order status
function updateOrderStatus(status) {
  orderStatus = status;
  orderStatusDiv.textContent = `Order Status: ${orderStatus}`;
  localStorage.setItem('orderStatus', orderStatus);
}

// Display admin dashboard
function displayAdminDashboard() {
  const orders = retrieveOrderData();
  adminDashboard.innerHTML = '';
  orders.forEach((order) => {
    const orderHTML = `
      <div>
        <h2>Order #${order.orderId}</h2>
        <p>User: ${order.userData.name} (${order.userData.email})</p>
        <p>Status: ${order.orderStatus}</p>
      </div>
    `;
    adminDashboard.innerHTML += orderHTML;
  });
}

// Initialize order status from LocalStorage
if (localStorage.getItem('orderStatus')) {
  orderStatusDiv.textContent = `Order Status: ${localStorage.getItem('orderStatus')}`;
}

// Display admin dashboard on button click
adminDashboardBtn.addEventListener('click', displayAdminDashboard);