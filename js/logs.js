import { getDataFetch, logsUrl } from './modules/helper.js';

console.log('logs.js file was loaded');

const els = {
  medList: document.getElementById('med-list'),
  h1: document.querySelector('h1'),
};
// pasiimti petId is query

const petId = new URLSearchParams(window.location.search).get('petId');
console.log('petId ===', petId);

// atvaizduoti tam pet skirtus logs ir presciptions
// http://localhost:3000/v1/api/logs/petId/2

// parsiusti visus irasus
const [logsArr, error] = await getDataFetch(`${logsUrl}/petId/${petId}`);

if (error) {
  // show error
}

console.log('logsArr ===', logsArr);

if (Array.isArray(logsArr)) {
  renderLogsList(logsArr);
}

// irasyti varda i h1
els.h1.textContent = `${logsArr[0].name}: Health Records`;

function renderLogsList(arr) {
  els.medList.innerHTML = '';
  // pagaminti html elementus
  arr.map(makeOneLogCard).forEach((htmlEl) => {
    els.medList.append(htmlEl);
  });
  // sudeti i sarasa
}

function makeOneLogCard(logObj) {
  const liEl = document.createElement('li');
  liEl.className = 'card';
  liEl.innerHTML = `
  <p><small>Log</small></p>
  <h3 class="card-tile">${logObj.status}</h3>
  <p class="card-text">${logObj.description}</p>
  `;
  return liEl;
}

// irasyti varda i h1

// sugeneruoti korteles sarase <ul id="med-list" class="unlisted grid">
