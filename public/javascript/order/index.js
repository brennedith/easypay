function renderOrder(product) {
  return `
  <tr id="${product._id}">
    <td>${product.name}</td>
    <td>${product.price.toFixed(2)}</td>
    <td>
      <div class="field has-addons">
        <div class="control">
          <button data-id="${product._id}" onclick="updateInput(this, -1)" class="button is-danger"> - </button>
        </div>
      
        <div class="control">
          <input type="number" value="${product.qty}" data-id="${product._id}" oninput="updateOrder(this)" class="input">
        </div>
      
        <div class="control">
          <button data-id="${product._id}" onclick="updateInput(this, 1)" class="button is-success">+</button>
        </div>
      </div>
    </td>
    <td>${product.subtotal.toFixed(2)}</td>
  </tr>`
}

function updateInput(el, n) {
  const {dataset: { id }} = el
  const $product = document.getElementById(id)
  const $input  = $product.querySelector('input')
  console.log(typeof n, typeof $input.value)
  
  $input.value = Number($input.value) + n
  updateOrder($input)
}

function updateOrder(el) {
 const {
   dataset: { id },
   value: qty
 } = el;

 const $product = document.getElementById(id)

 axios
  .patch(`${HOSTNAME}/api/order/5cc76c8544c5d850589801f4`, {
   product: id,
   quantity: Number(qty)
 })
 .then(({ data: order }) => {
  if(qty <= 0 ) {
    $product.parentElement.removeChild($product)
  } else {
    const { products, productsQty} = order
    let productIndex;
  
    products.forEach((product, index) => {
      if (product._id === id) {
        productIndex = index;
      }
    });
  
    const product = products[productIndex]
    product.qty = productsQty[productIndex]
    product.subtotal = product.price * product.qty
  
    document.getElementById(id).outerHTML = renderOrder(product)
  }

 });
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