import { createContext } from 'react';
import db from './static-db';

export const DBContext = createContext(db);
export const DBProvider = DBContext.Provider;
export const DBConsumer = DBContext.Consumer;

export default db;
