/* eslint-disable no-underscore-dangle */
import { createContext } from 'react';
import { Plan } from '../interface';

export class Filter {
  private _provider = '';

  private _service = '';

  public setProvider = (providerId: string) => {
    this._provider = providerId;
  }

  public setService = (serviceId: string) => {
    this._service = serviceId;
  }

  public get provider(): string {
    return this._provider;
  }

  public get service(): string {
    return this._service;
  }

  public filterPlans =(plans: Plan[]): Plan[] => plans
    .filter(plan => !this._provider || plan.providerId === this._provider)
    .filter(plan => !this._service || plan.serviceId === this._service)
}


const filterContext = createContext(new Filter());
export const FilterProvider = filterContext.Provider;
export default filterContext;
