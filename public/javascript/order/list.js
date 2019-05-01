function createOrderHTML(order) {
  return `
  <tr>
      <td>10:20</td>
      <td>${order._id}</td>
      <td>${order.total}</td>
      <td>${order.payments}</td>
      <td>
      <a href="${HOSTNAME}/orders/detail/${order._id}">
        <button class="button is-link is-small">View</button>
      </a>
      </td>
    </tr>`;
}

function renderOrders() {
  const $orders = document.getElementById('orders');

  axios.get(`${HOSTNAME}/api/order`).then(({ data: orders }) => {
    const { id, total, payments } = orders;

    $orders.innerHTML = orders.map(order => createOrderHTML(order));
  });
}
