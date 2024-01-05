import { petsUrl } from './modules/helper.js';

const els = {
  form: document.querySelector('form'),
  name: document.getElementById('name'),
  dob: document.getElementById('dob'),
  clientEmail: document.getElementById('clientEmail'),
  errorList: document.getElementById('errors-list'),
};

console.log('els ===', els);

els.form.addEventListener('submit', createPet);

function createPet(event) {
  event.preventDefault();
  console.log('form submitted');
  els.errorList.innerHTML = '';
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
      if (data !== 'Success') {
        showErrors(data);
        return;
      }
      console.log('klaidu nera');
      // redirect to logs.html?petId=2
      // window.location = 'index.html';
    })
    .catch((err) => {
      console.log('err ===', err);
    });
}

const errArr = [
  { field: 'name', error: 'required' },
  { field: 'email', error: 'required' },
  { field: 'dob', error: 'required' },
];

// kai yra klaidu,
// 1. atvaizduoti visas klaidas viename klaidu bloke
function showErrors(errorArr) {
  // console.log('errorArr ===', errorArr);
  // sukti cikla
  errorArr.forEach((eObj) => {
    const liEl = document.createElement('li');
    liEl.textContent = eObj.error;
    els.errorList.append(liEl);
  });
  // gaminti po klaidos li ir deti i klaidu ul
}
// 2. atvaziduoti klaida ties konkreciu inputu
