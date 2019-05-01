/* CRUD */

// Create
function createUser(data, cb) {
  const $usersTable = document.getElementById('users-list');

  axios
    .post(`${HOSTNAME}/api/user`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(({ data: user }) => {
      $usersTable.innerHTML += renderUserRow(user);
    });

  cb();
}

// Read
function readUsers() {
  const $usersTable = document.querySelector('#users-list');

  axios.get(`${HOSTNAME}/api/user`).then(({ data: users }) => {
    $usersTable.innerHTML = users.map(renderUserRow).join('');
  });
}

function readUser(id, cb) {
  axios.get(`${HOSTNAME}/api/user/${id}`).then(({ data: user }) => {
    cb(user);
  });
}

// Update
function updateUser(data, cb) {
  const id = data.get('_id');
  const $userRow = document.getElementById(id);

  axios
    .patch(`${HOSTNAME}/api/user/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(({ data: user }) => {
      $userRow.outerHTML = renderUserRow(user);
    });

  cb();
}

// Delete
function deleteUser(el) {
  const { id } = el.dataset;
  $user = document.getElementById(id);

  if (confirm('Are you sure you want to delete this user?')) {
    axios.delete(`${HOSTNAME}/api/user/${id}`).then(user => {
      $user.parentElement.removeChild($user);
    });
  }
}

/* DOM Nodes */
$addUser = document.getElementById('add-user');
$addUserModal = document.getElementById('add-user-modal');
$addUserClose = document.getElementById('add-user-close');
$addUserCancel = document.getElementById('add-user-cancel');
$addUserSubmit = document.getElementById('add-user-submit');
$editUserModal = document.getElementById('edit-user-modal');
$editUserClose = document.getElementById('edit-user-close');
$editUserCancel = document.getElementById('edit-user-cancel');
$editUserSubmit = document.getElementById('edit-user-submit');

// Event Listeners
$addUser.onclick = () => addUserModal($addUserModal);
$addUserClose.onclick = () => closeModal($addUserModal);
$addUserCancel.onclick = () => closeModal($addUserModal);
$addUserSubmit.onclick = () => submitModal('add', $addUserModal);
$editUserClose.onclick = () => closeModal($editUserModal);
$editUserCancel.onclick = () => closeModal($editUserModal);
$editUserSubmit.onclick = () => submitModal('edit', $editUserModal);

/* Helpers */

// Modal
function editUserModal(el) {
  const modal = $editUserModal;
  const { id } = el.dataset;

  readUser(id, user => {
    const formElements = [...modal.querySelectorAll('input')];

    formElements.forEach(el => {
      el.value = user[el.name] || '';
    });

    openModal(modal);
  });
}

function addUserModal() {
  const modal = $addUserModal;
  const $addUserPlaces = document.getElementById('add-user-places');

  axios.get(`${HOSTNAME}/api/place`).then(({ data: places }) => {
    $addUserPlaces.innerHTML = places.map(place => {
      return `
      <option value="${place._id}">
      ${place.name}
      </option>`;
    });

    openModal(modal);
  });
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
  const formElements = [...el.querySelectorAll('input'), ...el.querySelectorAll('select')];
  const formData = new FormData();

  formElements.forEach(el => {
    if (el.type === 'file') {
      formData.append(el.name, el.files[0]);
    } else {
      formData.append(el.name, el.value);
    }
  });

  if (type === 'add') {
    createUser(formData, () => closeModal(el));
  } else if ('edit') {
    updateUser(formData, () => closeModal(el));
  }
}

// Renders
function renderUserRow(user) {
  return `
    <tr id="${user._id}">
      <td><img src="${HOSTNAME}${user.photoURL}" alt="A photo of ${user.name}" class="avatar"/></td>
      <td>${user.email}</td>
      <td>${user.name}</td>
      <td>${user.role}</td>
      <td>${user.place.name}</td>
      <td>
        <a class="button is-link" data-id="${user._id}" onclick="editUserModal(this)">Edit</a>
        <a class="button is-danger" data-id="${user._id}" onclick="deleteUser(this)">Delete</a>
      </td>
    </tr>`;
}
