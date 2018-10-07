import fetch from 'node-fetch';
import { parseString } from 'xml2js';

const BASE_URL = 'https://www.goodreads.com/author/show.xml';
const API_KEY = 'sFiBmcUPg84JpH09Mu4ReQ';

export async function fetchXML(id) {
  const authors = await fetch(`${BASE_URL}?id=${id}&key=${API_KEY}`);
  const authorsText = await authors.text();
  let response;

  await parseString(authorsText, (err, json) => {
    if (err) {
      return;
    }
    response = json;
  });

  return response;
}
