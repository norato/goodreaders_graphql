import fetch from 'node-fetch';
import { parseString } from 'xml2js';
import * as DataLoader from 'dataloader';

const BASE_URL = 'https://www.goodreads.com/';
const API_KEY = 'sFiBmcUPg84JpH09Mu4ReQ';

export enum Endpoints {
  Author = 'author',
  Book = 'book'
}

export async function fetchXML(endpoint: Endpoints, id: number) {
  const authors = await fetch(
    `${BASE_URL}/${endpoint}/show.xml?id=${id}&key=${API_KEY}`
  );
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

export const authorLoader = new DataLoader(ids =>
  Promise.all(ids.map((id: number) => fetchXML(Endpoints.Author, id)))
);

export const bookLoader = new DataLoader(ids =>
  Promise.all(ids.map((id: number) => fetchXML(Endpoints.Book, id)))
);
