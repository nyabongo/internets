import data from './data';
import { Model } from '../interface';

const staticDB: Model = {
  getServiceProviders: () => Promise.resolve(data.serviceProviders),
  getServiceProviderById: (id: string) => Promise.resolve(
    data.serviceProviders.filter(p => p.id === id)[0],
  ),

  getServices: () => Promise.resolve(data.services),
  getProviderServices: (providerId: string) => Promise.resolve(
    data.services.filter(s => s.providerId === providerId),
  ),
  getServiceById: (id: string, providerId?: string) => Promise.resolve(
    data.services
      .filter(service => service.id === id)
      .filter(service => !providerId || service.providerId === providerId)[0],
  ),

  getPlans: () => Promise.resolve(data.plans),
  getServicePlans: (serviceId: string, providerId?: string) => Promise.resolve(
    data.plans
      .filter(plan => plan.serviceId === serviceId)
      .filter(plan => !providerId || plan.serviceId === serviceId),
  ),
  getProviderPlans: (providerId: string) => Promise.resolve(
    data.plans
      .filter(plan => plan.providerId === providerId),
  ),
  getPlanById: (id: string, serviceId?: string, providerId?: string) => Promise.resolve(
    data.plans
      .filter(plan => plan.id === id)
      .filter(plan => !serviceId || plan.serviceId === serviceId)
      .filter(plan => !providerId || plan.providerId === providerId)[0],
  ),
};

export default staticDB;
