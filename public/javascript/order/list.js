function createOrderHTML(order) {
  return `
  <tr id="${order._id}">
      <td>${order.createdAt}</td>
      <td>${order._id}</td>
      <td>${order.total.toFixed(2)}</td>
      <td>${order.complete}</td>
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
    const { id, total, payments } = orders;
    $orders.innerHTML = orders.map(order => createOrderHTML(order)).join('');
  });
}

function createNewOrder() {
  const $orders = document.getElementById('orders');

  axios.post(`${HOSTNAME}/api/order`).then(({ data: order }) => {
    $orders.innerHTML += createOrderHTML(order);
  });
}
