/* eslint-disable no-underscore-dangle */
import { createContext, Dispatch } from 'react';
import { Plan } from '../interface';

export class Filter {
  private _provider = '';

  private _service = '';

  private _dispatch: Dispatch<any> = () => { };

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

  public setDispatch = (func: Dispatch<any>) => {
    this._dispatch = func;
  }

  public get dispatch() {
    return this._dispatch;
  }


  public filterPlans = (plans: Plan[]): Plan[] => plans
    .filter(plan => !this._provider || plan.providerId === this._provider)

export const reducer = (filterState: Filter, action: any) => {
    .filter(plan => !this._service || plan.serviceId === this._service)
  if ('provider' in action) {
    filter.setProvider(action.provider);
  } else filter.setProvider(filterState.provider);

  if ('service' in action) {
    filter.setService(action.service);
  } else filter.setService(filterState.service);
}

  return filter;
};

const filterContext = createContext(new Filter());
export const FilterProvider = filterContext.Provider;
export default filterContext;
