import { petsUrl } from './modules/helper.js';

const els = {
  form: document.querySelector('form'),
  name: document.getElementById('name'),
  dob: document.getElementById('dob'),
  clientEmail: document.getElementById('clientEmail'),
};

console.log('els ===', els);

els.form.addEventListener('submit', createPet);

function createPet(event) {
  event.preventDefault();
  console.log('form submitted');
  const petObj = {
    name: els.name.value,
    dob: els.dob.value,
    clientEmail: els.clientEmail.value,
  };
  console.log('petObj ===', petObj);
  // siusti i serveri
  fetch(petsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(petObj),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('data ===', data);
      // redirect to logs.html?petId=2
      // window.location = 'index.html';
    })
    .catch((err) => {
      console.log('err ===', err);
    });
}