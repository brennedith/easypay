// /* CRUD */

// Create
function createPlace(data, cb) {
  const $placesTable = document.getElementById('places-list');

  axios.post(`${HOSTNAME}/api/place`, data).then(({ data: place }) => {
    $placesTable.innerHTML += renderPlaceRow(place);
  });

  cb();
}

// Read
function readPlaces() {
  const $placesTable = document.querySelector('#places-list');

  axios.get(`${HOSTNAME}/api/place`).then(({ data: places }) => {
    $placesTable.innerHTML = places.map(renderPlaceRow).join('');
  });
}

function readPlace(id, cb) {
  axios.get(`${HOSTNAME}/api/place/${id}`).then(({ data: place }) => {
    cb(place);
  });
}

// Update
function updatePlace(data, cb) {
  const { _id: id } = data;
  const $placeRow = document.getElementById(id);

  axios.patch(`${HOSTNAME}/api/place/${id}`, data).then(({ data: place }) => {
    $placeRow.outerHTML = renderPlaceRow(place);
  });

  cb();
}

// Delete
function deletePlace(el) {
  const { id } = el.dataset;
  $place = document.getElementById(id);

  if (confirm('Are you sure you want to delete this place?')) {
    axios.delete(`${HOSTNAME}/api/place/${id}`).then(place => {
      $place.parentElement.removeChild($place);
    });
  }
}

/* DOM Nodes */
$addPlace = document.getElementById('add-place');
$addPlaceModal = document.getElementById('add-place-modal');
$addPlaceClose = document.getElementById('add-place-close');
$addPlaceCancel = document.getElementById('add-place-cancel');
$addPlaceSubmit = document.getElementById('add-place-submit');
$editPlaceModal = document.getElementById('edit-place-modal');
$editPlaceClose = document.getElementById('edit-place-close');
$editPlaceCancel = document.getElementById('edit-place-cancel');
$editPlaceSubmit = document.getElementById('edit-place-submit');

// // Event Listeners
$addPlace.onclick = () => addPlaceModal($addPlaceModal);
$addPlaceClose.onclick = () => closeModal($addPlaceModal);
$addPlaceCancel.onclick = () => closeModal($addPlaceModal);
$addPlaceSubmit.onclick = () => submitModal('add', $addPlaceModal);
$editPlaceClose.onclick = () => closeModal($editPlaceModal);
$editPlaceCancel.onclick = () => closeModal($editPlaceModal);
$editPlaceSubmit.onclick = () => submitModal('edit', $editPlaceModal);

// /* Helpers */

// // Modal
function editPlaceModal(el) {
  const modal = $editPlaceModal;
  const { id } = el.dataset;

  readPlace(id, place => {
    const formElements = [...modal.querySelectorAll('input')];

    place.address = place.location.address;
    place.longitude = place.location.coordinates[0];
    place.latitude = place.location.coordinates[1];

    formElements.forEach(el => {
      el.value = place[el.name] || '';
    });

    openModal(modal);
  });
}

function addPlaceModal() {
  const modal = $addPlaceModal;

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
  const formElements = [...el.querySelectorAll('input'), ...el.querySelectorAll('select')];
  const formData = {};

  formElements.forEach(el => {
    formData[el.name] = el.value;
  });

  if (type === 'add') {
    createPlace(formData, () => closeModal(el));
  } else if ('edit') {
    updatePlace(formData, () => closeModal(el));
  }
}

// Renders
function renderPlaceRow(place) {
  return `
    <tr id="${place._id}">
      <td>${place.name}</td>
      <td>${place.location.address}</td>
      <td>${place.type}</td>
      <td>
        <a class="button is-link" data-id="${place._id}" onclick="editPlaceModal(this)">Edit</a>
        <a class="button is-danger" data-id="${place._id}" onclick="deletePlace(this)">Delete</a>
      </td>
    </tr>`;
}
