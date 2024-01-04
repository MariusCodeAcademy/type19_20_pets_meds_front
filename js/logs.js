console.log('logs.js file was loaded');

// pasiimti petId is query

const petId = new URLSearchParams(window.location.search).get('petId');
console.log('petId ===', petId);

// atvaizduoti tam pet skirtus logs ir presciptions
// http://localhost:3000/v1/api/logs/petId/2

// parsiusti visus irasus

// irasyti varda i h1

// sugeneruoti korteles sarase <ul id="med-list" class="unlisted grid">
