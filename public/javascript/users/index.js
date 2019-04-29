// Generates HTML of user(s)
function renderUserRow(user) {
  return `
    <tr id="${user._id}">
      <td><img src="${HOSTNAME}${user.photoURL}"/></td>
      <td>${user.email}</td>
      <td>${user.name}</td>
      <td>${user.role}</td>
      <td>${user.place.name}</td>
      <td>
        <a class="button is-link" data-id="${user._id}" onclick="editUser">Edit</a>
        <a class="button is-danger" data-id="${user._id}" onclick="editUser">Delete</a>
      </td>
    </tr>`;
}

function renderUserModalContent(user) {
  return `
    <div class="box">
      <h1 class="title is-3">User details</h1>
      <h2 class="title is-4">Name: ${user.name}</h2>
    </div>
  `;
}

// Handles user modal
$userDetailModel = document.querySelector('#user-details');
$userDetailModelContent = document.querySelector('#user-details-content');
$userDetailModelClose = document.querySelector('#user-details-close');

// Enables close button
$userDetailModelClose.onclick = () => $userDetailModel.classList.toggle('is-active');

function editUser(e) {
  console.log(e);
}

// Onload, it will render all available users
$usersTable = document.querySelector('#users');
function renderUsersTable() {
  axios.get(`${HOSTNAME}/api/user`).then(({ data: users }) => {
    $usersTable.innerHTML = users.map(renderUserRow).join('');
  });
}
