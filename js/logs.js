import { getDataFetch, logsUrl, niceDate, presUrl } from './modules/helper.js';

console.log('logs.js file was loaded');

const els = {
  medList: document.getElementById('med-list'),
  h1: document.querySelector('h1'),
  linkToAddLog: document.getElementById('add-log-link'),
};
// pasiimti petId is query

const petId = new URLSearchParams(window.location.search).get('petId');
console.log('petId ===', petId);

// add link to add-log.html query params
els.linkToAddLog.href = `add-log.html?petId=${petId}`;

// atvaizduoti tam pet skirtus logs ir presciptions
// http://localhost:3000/v1/api/logs/petId/2

// parsiusti visus irasus
const [logsArr, logError] = await getDataFetch(`${logsUrl}/petId/${petId}`);
const [presscArr, presError] = await getDataFetch(`${presUrl}/petId/${petId}`);

if (logError || presError) {
  // show error
}

console.log('logsArr ===', logsArr);

if (Array.isArray(logsArr)) {
  renderLogsList(logsArr);
}
if (Array.isArray(presscArr)) {
  renderPressList(presscArr);
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
function renderPressList(arr) {
  // pagaminti html elementus
  arr.map(makeOnePresCard).forEach((htmlEl) => {
    els.medList.append(htmlEl);
  });
  // sudeti i sarasa
}

function makeOnePresCard(presObj) {
  const liEl = document.createElement('li');
  liEl.className = 'card';
  liEl.innerHTML = `
  <p><small>Prescription</small></p>
  <h3 class="card-tile">${presObj.name}</h3>
  <p class="card-date"><i>${niceDate(presObj.timestamp, 'time')}</i></p>
  <p class="card-text">${presObj.comment}</p>
  `;
  return liEl;
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

const presObj = {
  prescription_id: 1,
  comment: 'Take some vitamins to heal',
  timestamp: '2024-01-04T08:29:26.000Z',
  name: 'Vitamin C',
};

// irasyti varda i h1

// sugeneruoti korteles sarase <ul id="med-list" class="unlisted grid">
