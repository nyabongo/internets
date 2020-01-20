/* eslint-disable no-underscore-dangle */
import { createContext, Dispatch } from 'react';
import sortBy from 'lodash/sortBy';
import { Plan } from '../interface';

type OrderBy = '' | 'name' | 'price' | 'volume' | 'duration';

export class Filter {
  private _predicates = {
    name: 'name',
    price: (p: Plan) => p.price.value,
    volume: (p: Plan) => p.volume.magnitude,
    duration: (p: Plan) => p.duration.magnitude,
  }

  private _provider = '';

  private _service = '';

  private _orderBy: OrderBy = '';

  private _reverse = false;

  public constructor(orderBy?: OrderBy) {
    this._orderBy = orderBy || '';
  }

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

  public get orderBy() {
    return this._orderBy;
  }


  public set orderBy(val: any) {
    if (this._orderBy === val) {
      if (this._reverse) {
        this._reverse = false;
        this._orderBy = '';
      } else { this._reverse = true; }
    } else { this._orderBy = val; }
  }

  public get reverse() {
    return this._reverse;
  }

  public set reverse(val: boolean) {
    this._reverse = val;
  }

  public filterPlans = (plans: Plan[]): Plan[] => {
    const filteredPlans = plans
      .filter(plan => !this._provider || plan.providerId === this._provider)
      .filter(plan => !this._service || plan.serviceId === this._service);
    const orderedPlans = this._orderBy
      ? sortBy(filteredPlans, this._predicates[this._orderBy])
      : filteredPlans;
    return this._reverse ? orderedPlans.reverse() : orderedPlans;
  }
}

export const reducer = (filterState: Filter, action: any) => {
  const filter = new Filter(filterState.orderBy);
  filter.reverse = filterState.reverse;

  if ('provider' in action) {
    filter.setProvider(action.provider);
  } else filter.setProvider(filterState.provider);

  if ('service' in action) {
    filter.setService(action.service);
  } else filter.setService(filterState.service);

  if ('orderBy' in action) {
    filter.orderBy = action.orderBy;
  }

  return filter;
};

const filterContext = createContext(new Filter());
export const FilterProvider = filterContext.Provider;
export default filterContext;
