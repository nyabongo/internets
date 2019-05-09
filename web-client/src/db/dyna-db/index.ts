import { Data } from './data';
import { Model } from '../interface';

class Database implements Model {
  private data: Data;

  public constructor(d: Data) {
    this.data = d;
  }

  public getServiceProviders =() => Promise.resolve(this.data.serviceProviders)

  public getServiceProviderById=(id: string) => Promise.resolve(
    this.data.serviceProviders.filter(p => p.id === id)[0],
  )

  public getServices=() => Promise.resolve(this.data.services)

  public getProviderServices=(providerId: string) => Promise.resolve(
    this.data.services.filter(s => s.providerId === providerId),
  )

  public getServiceById=(id: string, providerId?: string) => Promise.resolve(
    this.data.services
      .filter(service => service.id === id)
      .filter(service => !providerId || service.providerId === providerId)[0],
  )

  public getPlans=() => Promise.resolve(this.data.plans)

  public getServicePlans=(serviceId: string, providerId?: string) => Promise.resolve(
    this.data.plans
      .filter(plan => plan.serviceId === serviceId)
      .filter(plan => !providerId || plan.serviceId === serviceId),
  )

  public getProviderPlans=(providerId: string) => Promise.resolve(
    this.data.plans
      .filter(plan => plan.providerId === providerId),
  )

  public getPlanById=(id: string, serviceId?: string, providerId?: string) => Promise.resolve(
    this.data.plans
      .filter(plan => plan.id === id)
      .filter(plan => !serviceId || plan.serviceId === serviceId)
      .filter(plan => !providerId || plan.providerId === providerId)[0],
  )
}

export default Database;
