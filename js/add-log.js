/* eslint-disable guard-for-in */
import { logsUrl } from './modules/helper.js';

console.log('add-log.js file was loaded');

const petId = new URLSearchParams(window.location.search).get('petId');
console.log('petId ===', petId);

const els = {
  form: document.querySelector('form'),
  status: document.getElementById('status'),
  description: document.getElementById('description'),
  errorList: document.getElementById('errors-list'),
};

console.log('els ===', els);

els.form.addEventListener('submit', createLog);

function createLog(event) {
  event.preventDefault();
  console.log('form submitted');
  els.errorList.innerHTML = '';
  const logObj = {
    status: els.status.value,
    description: els.description.value,
  };
  console.log('logObj ===', logObj);
  // siusti i serveri
  fetch(`${logsUrl}/petId/${petId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logObj),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('data ===', data);
      if (data !== 'Success') {
        showErrors(data);
        showIndividualErorrs(data);
        return;
      }
      console.log('klaidu nera');
      // redirect to logs.html?petId=2
      window.location = `logs.html?petId=${petId}`;
    })
    .catch((err) => {
      console.log('err ===', err);
    });
}

function showErrors(errorArr) {
  // console.log('errorArr ===', errorArr);
  // sukti cikla
  errorArr.forEach((eObj) => {
    const errEl = document.createElement('li');
    errEl.textContent = `${eObj.field}: ${eObj.error}`;
    els.errorList.append(errEl);
  });
}

function showIndividualErorrs(errorsArr) {
  console.log('errorsArr ===', errorsArr);
  // { status: mus be kazkas  }
  // const errorObjArr = errorsArr.map((eObj) => {
  //   return { [eObj.field]: eObj.error };
  // });
  // console.log('errorObjArr ===', errorObjArr);

  // sukti cikla per objekta els
  // eslint-disable-next-line no-restricted-syntax
  for (const key in els) {
    const value = els[key];
    console.log('key ===', key);
    // tikrinam ar errorObjArr yra toks key
    const found = errorsArr.find((eObj) => eObj.field === key);
    if (found) {
      // uzdeti klaida
      console.log('value ===', value);
      value.classList.add('is-invalid');
      value.nextElementSibling.textContent = found.error;
    }
  }
  // paimam viena propertie form: document.querySelector('form'),
  // jei key yra tai value uzdededu klase ir po value atvaizduoju klaida
}
