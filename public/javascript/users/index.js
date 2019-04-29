function renderUser(user) {
  return `
  <tr id="${user._id}">
    <th><img src="${HOSTNAME}${user.photoURL}"/></th>
    <th>${user.name}</th>
    <th>${user.email}</th>
    <th>${user.role}</th>
    <th>{user.place.name}</th>
  </tr>`;
}

function renderUsers() {
  $users = document.getElementById('users');

  axios.get(`${HOSTNAME}/api/user`).then(({ data: users }) => {
    $users.innerHTML = users.map(renderUser).join('');
  });
}
