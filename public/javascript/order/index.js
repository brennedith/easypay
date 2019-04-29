function renderOrder(product) {
  return `
  <tr id="${product._id}">
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>
      <div class="field has-addons">
        <div class="control">
          <button class="button is-danger">-</button>
        </div>
      
        <div class="control">
          <input type="number" class="input">
        </div>
      
        <div class="control">
          <button class="button is-success">+</button>
        </div>
      </div>
    </td>
    <td>${product.price}</td>
  </tr>`
}

function renderOrders() {
  $products = document.getElementById('products')

  axios.get(`${HOSTNAME}/api/order/5cc76c8544c5d850589801f4`)
  .then(({ data: order }) => {
    $products.innerHTML = order.products.map(renderOrder).join("");
  })
}