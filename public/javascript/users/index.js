/* CRUD */

// Read
function readUsers() {
  $usersTable = document.querySelector('#users');
  axios.get(`${HOSTNAME}/api/user`).then(({ data: users }) => {
    $usersTable.innerHTML = users.map(renderUserRow).join('');
  });
}

// Update
function editUser(el) {
  const { id } = el.dataset;
  console.log(id);
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

/* Helpers */
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
