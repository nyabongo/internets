import { createContext } from 'react';
import db from './static-db';
import getSheetData from './sheets-api';

export const DBContext = createContext(db);
export const DBProvider = DBContext.Provider;
export const DBConsumer = DBContext.Consumer;

export const init = (sheetId: string) => new Promise((resolve, reject) => {
  if (document.getElementById('gapi')) {
    reject(new Error('already initialised'));
  } else {
    const script = document.createElement('script');
    script.id = 'gapi';
    script.onload = () => {
      resolve(getSheetData(sheetId));
    };
    script.src = 'https://apis.google.com/js/api.js';
    document.head.appendChild(script);
  }
});

export default db;
