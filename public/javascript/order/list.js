function createOrderHTML(order) {
  const payments = order.payments
    .map(payment => {
      const className = payment.complete ? 'is-success' : 'is-warning';
      return `<strong class="tag ${className}">${payment.amount.toFixed(2)}</strong>`;
    })
    .join(' ');

  return `
  <tr id="${order._id}">
      <td>${order.createdAt.slice(0, 16).replace('T', ' / ')}</td>
      <td>${order._id.slice(-5)}</td>
      <td>${order.total.toFixed(2)}</td>
      <td>${payments}</td>
      <td>
      <a href="${HOSTNAME}/orders/${order._id}">
        <button class="button is-link is-small">View</button>
      </a>
      </td>
    </tr>`;
}

function renderOrders() {
  const $orders = document.getElementById('orders');

  axios.get(`${HOSTNAME}/api/order`).then(({ data: orders }) => {
    $orders.innerHTML = orders.map(order => createOrderHTML(order)).join('');
  });
}

function createNewOrder() {
  axios.post(`${HOSTNAME}/api/order`).then(({ data: order }) => {
    location.href = `/orders/${order._id}`;
  });
}
