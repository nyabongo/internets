import data from './data';
import { Model } from '../interface';

const staticDB: Model = {
  getServiceProviders: () => Promise.resolve(data.serviceProviders),
};

export default staticDB;
