function createOrder(product) {
  return `
  <tr id="${product._id}">
    <td>${product.name}</td>
    <td>${product.price.toFixed(2)}</td>
    <td>
      <div class="field has-addons">
        <div class="control">
          <button data-id="${
            product._id
          }" onclick="updateInput(this, -1)" class="button is-danger"> - </button>
        </div>
      
        <div class="control">
          <input type="number" value="${product.qty}" data-id="${
    product._id
  }" oninput="updateOrder(this)" class="input">
        </div>
      
        <div class="control">
          <button data-id="${
            product._id
          }" onclick="updateInput(this, 1)" class="button is-success">+</button>
        </div>
      </div>
    </td>
    <td>${product.subtotal.toFixed(2)}</td>
  </tr>`;
}

function updateInput(el, n) {
  const {
    dataset: { id }
  } = el;
  const $product = document.getElementById(id);
  const $input = $product.querySelector('input');

  $input.value = Number($input.value) + n;
  updateOrder($input);
}

function updateOrder(el) {
  const {
    dataset: { id },
    value: qty
  } = el;

  const $product = document.getElementById(id);

  axios
    .patch(`${HOSTNAME}/api/order/${ORDER_ID}`, {
      product: id,
      quantity: Number(qty)
    })
    .then(({ data: order }) => {
      if (qty <= 0) {
        $product.parentElement.removeChild($product);
      } else {
        const { products, productsQty } = order;
        let productIndex;

        products.forEach((product, index) => {
          if (product._id === id) {
            productIndex = index;
          }
        });

        const product = products[productIndex];
        product.qty = productsQty[productIndex];
        product.subtotal = product.price * product.qty;

        document.getElementById(id).outerHTML = createOrder(product);
      }
    });
}

function renderOrders() {
  $products = document.getElementById('products');
  $total = document.getElementById('total');

  axios.get(`${HOSTNAME}/api/order/${ORDER_ID}`).then(({ data: order }) => {
    const { products, productsQty, total } = order;

    $total.innerHTML = Number(total).toFixed(2);

    $products.innerHTML = products
      .map((product, index) => {
        product.qty = productsQty[index];
        product.subtotal = product.price * product.qty;
        return createOrder(product);
      })
      .join('');
  });
}

// ---------- MODAL -------------

function openModal() {
  const $modal = document.getElementById('modal-ter');

  $modal.classList.add('is-active');
}

function closeModal() {
  const $modal = document.getElementById('modal-ter');

  $modal.classList.remove('is-active');
}

function generateProductsModal(product) {
  return `
  <tr id="${product._id}">
    <td><img src="${HOSTNAME}${product.photoURL}" alt=${
    product.name
  } class="avatar" /></td>
    <td>${product.name}</td>
    <td>${product.description}</td>
    <td>
      <button onclick="addProductToOrder(this)" data-id="${
        product._id
      }" data-price="${
    product.price
  }" class="button is-success is-small">Add</button>
    </td>
  </tr>`;
}

function RenderProductsModal() {
  const $productsModal = document.getElementById('products-modal');

  axios.get(`${HOSTNAME}/api/product`).then(({ data: products }) => {
    $productsModal.innerHTML = products
      .map(product => generateProductsModal(product))
      .join('');
  });
}

function addProductToOrder(el) {
  const {
    dataset: { id, price }
  } = el;

  const $products = document.getElementById('products');

  axios
    .put(`${HOSTNAME}/api/order/${ORDER_ID}`, {
      product: id,
      quantity: 1,
      price
    })
    .then(({ data: order }) => {
      const { products, productsQty } = order;

      $products.innerHTML = products
        .map((product, index) => {
          product.qty = productsQty[index];
          product.subtotal = product.price * product.qty;
          return createOrder(product);
        })
        .join('');
    });
}
