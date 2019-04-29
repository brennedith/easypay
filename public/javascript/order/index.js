function renderOrder(product) {
  return `
  <tr id="${product._id}">
    <td>${product.name}</td>
    <td>${product.price.toFixed(2)}</td>
    <td>
      <div class="field has-addons">
        <div class="control">
          <button class="button is-danger">-</button>
        </div>
      
        <div class="control">
          <input type="number" value="${product.qty}"class="input">
        </div>
      
        <div class="control">
          <button class="button is-success">+</button>
        </div>
      </div>
    </td>
    <td>${product.subtotal.toFixed(2)}</td>
  </tr>`
}

function renderOrders() {
  $products = document.getElementById('products')

  axios.get(`${HOSTNAME}/api/order/5cc76c8544c5d850589801f4`)
  .then(({ data: order }) => {
    const { products, productsQty } = order

    $products.innerHTML = products.map((product, index) => {
      product.qty = productsQty[index]
      product.subtotal = product.price * product.qty
      return renderOrder(product)
    }).join("");
  })
}