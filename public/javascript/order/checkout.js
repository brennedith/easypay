/* Logic */
let taps = 1;
let orderProducts = null;

// DOM Nodes
$previewPayment = document.getElementById('preview-payment');
$previewPayment.onclick = previewPayment;

/* CRUD */

// Read
function readOrder() {
  axios.get(`${HOSTNAME}/api/order/${ORDER_ID}`).then(({ data: order }) => {
    const { products, productsQty } = order;
    const allProducts = products
      .map((product, index) => {
        return new Array(productsQty[index]).fill(product);
      })
      .flat();

    orderProducts = allProducts;
    renderOrder();
  });
}

/* Helpers */
function updateTotalTaps(n) {
  const $input = document.getElementById('taps');
  const value = Math.max(Number($input.value) + n, 1);

  $input.value = value;
  taps = value;

  renderOrder();
}

function updateTap(el) {
  const { id, tap } = el.dataset;
  const $product = document.getElementById(id);
  const $input = $product.querySelector('input');
  const buttons = [...$product.querySelectorAll('button')];

  buttons.forEach((button, i) => {
    if (i === Number(tap)) {
      button.classList.add('is-link');
    } else {
      button.classList.remove('is-link');
    }
  });

  $input.value = tap;
}

function previewPayment() {
  const $taps = document.getElementById('checkout-list').querySelectorAll('input');
  const tapsElements = [...$taps];
  const taps = {};

  tapsElements.forEach(element => {
    const { value: tap } = element;
    const { product, price } = element.dataset;

    if (!taps[tap]) {
      taps[tap] = {
        tap,
        products: [],
        amount: 0
      };
    }

    taps[tap].products.push(product);
    taps[tap].amount += Number(price);
  });

  axios
    .put(`${HOSTNAME}/api/order/${ORDER_ID}/payment`, {
      taps
    })
    .then(({ data: payments }) => {
      payments.forEach(payment => {
        console.log(`${HOSTNAME}/payments/${payment._id}`);
      });
    });
}

// Render
function renderOrder() {
  const $checkoutTable = document.getElementById('checkout-list');
  $checkoutTable.innerHTML = orderProducts.map(renderProductRow).join('');
}

function renderProductRow(product, index) {
  const renderButton = (n, i) => {
    return `<button data-id="${product._id}-${index}" data-tap="${i}" onclick="updateTap(this)" class="button ${
      i === 0 ? 'is-link' : ''
    }">${i + 1}</button>`;
  };

  const tapButtons = new Array(taps)
    .fill()
    .map(renderButton)
    .join('');

  return `
  <tr id="${product._id}-${index}">
    <td>${product.name}</td>
    <td>${product.price.toFixed(2)}</td>
    <td>
      <input type="text" name="tap" value="0" data-product="${product._id}" data-price="${product.price}" hidden/>
      ${tapButtons}
    </td>
  </tr>`;
}
