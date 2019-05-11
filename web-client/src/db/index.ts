import { createContext } from 'react';
import db from './static-db';
import getSheetData from './sheets-api';

export const DBContext = createContext(db);
export const DBProvider = DBContext.Provider;
export const DBConsumer = DBContext.Consumer;

export const init = (sheetId: string) => new Promise((resolve, reject) => {
  const save = async (data: object | Promise<object>) => {
    window.localStorage.setItem(sheetId, JSON.stringify(await data));
  };

  const load = () => {
    const data = window.localStorage.getItem(sheetId) || '';
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  };

  const cached = load();
  if (cached) {
    resolve(cached);
  }

  if (document.getElementById('gapi')) {
    reject(new Error('already initialised'));
  } else {
    const script = document.createElement('script');
    script.id = 'gapi';
    script.onload = () => {
      const result = getSheetData(sheetId);
      save(result);
      resolve(result);
    };
    script.src = 'https://apis.google.com/js/api.js';
    document.head.appendChild(script);
  }
});

export default db;
