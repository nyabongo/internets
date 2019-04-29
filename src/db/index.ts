import { createContext } from 'react';
import { Model } from './interface';
import db from './static-db';

export const DBContext = createContext(db);
export const DBProvider = DBContext.Provider;
export const DBConsumer = DBContext.Consumer;

export default db;
