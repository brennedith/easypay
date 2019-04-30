/* CRUD */

// Create
function createUser(data, cb) {
  const $usersTable = document.querySelector('#users-list');

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

function readUser(id) {
  axios.get(`${HOSTNAME}/api/user/${id}`).then(({ data: user }) => {});
}

// Update
function editUser(el) {
  const { id } = el.dataset;
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

// Event Listeners
$addUser.onclick = () => openModal($addUserModal);
$addUserClose.onclick = () => closeModal($addUserModal);
$addUserCancel.onclick = () => closeModal($addUserModal);
$addUserSubmit.onclick = () => submitModal('new', $addUserModal);

/* Helpers */

// Modal
function openModal(el) {
  el.classList.add('is-active');
}

function closeModal(el) {
  el.classList.remove('is-active');
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

  if (type === 'new') {
    createUser(formData, () => closeModal(el));
  } else {
    editUser(formData, () => closeModal(el));
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
        <a class="button is-link" data-id="${user._id}" onclick="editUser(this)">Edit</a>
        <a class="button is-danger" data-id="${user._id}" onclick="deleteUser(this)">Delete</a>
      </td>
    </tr>`;
}
