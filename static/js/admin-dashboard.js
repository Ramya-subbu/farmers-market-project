const adminDashboardContent = document.getElementById('admin-dashboard-content');

// Retrieve order data from LocalStorage
const orders = retrieveOrderData();

// Display order data on the admin dashboard
orders.forEach((order) => {
    const orderHTML = `
        <div>
            <h2>Order #${order.orderId}</h2>
            <p>User: ${order.userData.name} (${order.userData.email})</p>
            <p>Status: ${order.orderStatus}</p>
        </div>
    `;
    adminDashboardContent.innerHTML += orderHTML;
});

// Function to retrieve order data
function retrieveOrderData() {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
        return JSON.parse(storedOrders);
    }
    return [];
}
document.addEventListener("DOMContentLoaded", () => {
    const adminOrdersList = document.getElementById('admin-orders-list');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
  
    orders.forEach((order) => {
      const orderHtml = `
        <div class="order-box">
          <h2>Order #${orders.indexOf(order) + 1}</h2>
          <p>Product: ${order.productName}</p>
          <p>Quantity: ${order.quantity} kg</p>
          <p class="price">₹${order.price}</p>
          <p>Details: ${JSON.stringify(order.details)}</p>
        </div>
      `;
      adminOrdersList.innerHTML += orderHtml;
    });
  });