// helper fetch fn

const baseUrl = 'http://localhost:3000/v1/api';
export const petsUrl = `${baseUrl}/pets`;
export const logsUrl = `${baseUrl}/logs`;
export const presUrl = `${baseUrl}/prescriptions`;

export async function getDataFetch(url) {
  try {
    const resp = await fetch(url);
    if (resp.ok === false) {
      // eslint-disable-next-line no-throw-literal
      throw {
        status: resp.status,
        message: resp.statusText,
      };
    }
    const data = await resp.json();
    return [data, null];
  } catch (error) {
    console.log('error getDataFetch ===', error);
    return [null, error];
  }
}

export function niceDate(dbDate, format = '') {
  const dateObj = new Date(dbDate);
  let formatedDate = dateObj.toLocaleDateString('lt-lt');
  if (format === 'time') {
    formatedDate = dateObj.toLocaleString('lt-lt');
  }
  return formatedDate;
}
