import data from './data';
import { Model } from '../interface';

const staticDB: Model = {
  getServiceProviders: () => Promise.resolve(data.serviceProviders),
  getServiceProviderById: (id: string) => Promise.resolve(
    data.serviceProviders.filter(p => p.id === id)[0],
  ),
  getProviderServices: (providerId: string) => Promise.resolve(
    data.services.filter(s => s.providerId === providerId),
  ),
};

export default staticDB;
