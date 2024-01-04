/* eslint-disable import/extensions */
import { getDataFetch, niceDate, petsUrl } from './modules/helper.js';

console.log('index.js file was loaded');

const els = {
  petsList: document.getElementById('pets-list'),
};

// ir parsiusti pets array

const [petsArr, error] = await getDataFetch(petsUrl);

console.log('error ===', error);

if (error) {
  // show error
}

console.log('pets ===', petsArr);

if (Array.isArray(petsArr)) {
  renderPetsList(petsArr);
}

function renderPetsList(arr) {
  els.petsList.innerHTML = '';
  // pagaminti html elementus
  arr.map(makeOnePetCard).forEach((htmlEl) => {
    els.petsList.append(htmlEl);
  });
  // sudeti i sarasa
}

function makeOnePetCard(pObj) {
  const liEl = document.createElement('li');
  liEl.className = 'card';
  liEl.dataset.petId = pObj.pet_id;
  liEl.innerHTML = `
  <h3 data-color='red' class="pet-name">${pObj.name}</h3>
  <p class="pet-date">${niceDate(pObj.dob)}</p>
  <p class="pet-email">${pObj.client_email}</p>
  <div class="flex center">
    <a href="logs.html?petId=${pObj.pet_id}" class="btn">View logs</a>
    <button class="btn btn-secondary">Delete</button>
  </div>
  `;
  return liEl;
}

function deletePet(idToDelete) {
  // isiusti fetch delete
  // ar sekmingas istrynimas
  // jei taip tai istrinti pati elementa (el.remove())
}

const petObj = {
  pet_id: 1,
  name: 'Rex',
  dob: '2017-12-31T22:00:00.000Z',
  client_email: 'rexowner@gmail.com',
};

/*
<li class="card">
  <h3 class="pet-name">Pet name</h3>
  <p class="pet-date">pet dob</p>
  <p class="pet-email">email</p>
  <div class="flex center">
    <a href="logs.html?petId=1" class="btn">View logs</a>
    <button class="btn btn-secondary">Delete</button>
  </div>
</li>
*/
