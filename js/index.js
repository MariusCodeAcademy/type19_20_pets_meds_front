/* eslint-disable import/extensions */
import { getDataFetch, petsUrl } from './modules/helper.js';

console.log('index.js file was loaded');

// panaudoti getDataFetch

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
  // pagaminti html elementus
  // sudeti i sarasa
}
