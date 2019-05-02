/* CRUD */

// Create
function createProduct(data, cb) {
  const $productsTable = document.getElementById('products-list');

  axios
    .post(`${HOSTNAME}/api/product`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(({ data: product }) => {
      $productsTable.innerHTML += renderProductRow(product);
    });

  cb();
}

// Read
function readProducts() {
  const $productsTable = document.querySelector('#products-list');

  axios.get(`${HOSTNAME}/api/product/all/${PLACE_ID}`).then(({ data: products }) => {
    $productsTable.innerHTML = products.map(renderProductRow).join('');
  });
}

function readProduct(id, cb) {
  axios.get(`${HOSTNAME}/api/product/${id}`).then(({ data: product }) => {
    cb(product);
  });
}

// Update
function updateProduct(data, cb) {
  const id = data.get('_id');
  const $productRow = document.getElementById(id);

  axios
    .patch(`${HOSTNAME}/api/product/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(({ data: product }) => {
      $productRow.outerHTML = renderProductRow(product);
    });

  cb();
}

// Delete
function deleteProduct(el) {
  const { id } = el.dataset;
  $product = document.getElementById(id);

  if (confirm('Are you sure you want to delete this product?')) {
    axios.delete(`${HOSTNAME}/api/product/${id}`).then(product => {
      $product.parentElement.removeChild($product);
    });
  }
}

/* DOM Nodes */
$addProduct = document.getElementById('add-product');
$addProductModal = document.getElementById('add-product-modal');
$addProductClose = document.getElementById('add-product-close');
$addProductCancel = document.getElementById('add-product-cancel');
$addProductSubmit = document.getElementById('add-product-submit');
$editProductModal = document.getElementById('edit-product-modal');
$editProductClose = document.getElementById('edit-product-close');
$editProductCancel = document.getElementById('edit-product-cancel');
$editProductSubmit = document.getElementById('edit-product-submit');

// Event Listeners
$addProduct.onclick = () => addProductModal($addProductModal);
$addProductClose.onclick = () => closeModal($addProductModal);
$addProductCancel.onclick = () => closeModal($addProductModal);
$addProductSubmit.onclick = () => submitModal('add', $addProductModal);
$editProductClose.onclick = () => closeModal($editProductModal);
$editProductCancel.onclick = () => closeModal($editProductModal);
$editProductSubmit.onclick = () => submitModal('edit', $editProductModal);

/* Helpers */

// Modal
function editProductModal(el) {
  const modal = $editProductModal;
  const { id } = el.dataset;

  readProduct(id, product => {
    const formElements = [...modal.querySelectorAll('input'), ...modal.querySelectorAll('textarea')];

    formElements.forEach(el => {
      el.value = product[el.name] || '';
    });

    openModal(modal);
  });
}

function addProductModal() {
  const modal = $addProductModal;

  openModal(modal);
}

function openModal(el) {
  el.classList.add('is-active');
}

function closeModal(el) {
  clearForm(el);
  el.classList.remove('is-active');
}

function clearForm(el) {
  el.querySelector('form').reset();
}

function submitModal(type, el) {
  const formElements = [...el.querySelectorAll('input'), ...el.querySelectorAll('textarea')];
  const formData = new FormData();

  formElements.forEach(el => {
    if (el.type === 'file') {
      formData.append(el.name, el.files[0]);
    } else {
      formData.append(el.name, el.value);
    }
  });

  if (type === 'add') {
    createProduct(formData, () => closeModal(el));
  } else if ('edit') {
    updateProduct(formData, () => closeModal(el));
  }
}

// Renders
function renderProductRow(product) {
  return `
  <tr id="${product._id}">
  <td><img src="${HOSTNAME}${product.photoURL}" alt="A photo of ${product.name}" class="avatar"/></td>
  <td>${product.name}</td>
  <td>${product.description}</td>
  <td>${product.price.toFixed(2)}</td>
  <td>
    <a class="button is-link" data-id="${product._id}" onclick="editProductModal(this)">Edit</a>
    <a class="button is-danger" data-id="${product._id}" onclick="deleteProduct(this)">Delete</a>
  </td>
</tr>`;
}
