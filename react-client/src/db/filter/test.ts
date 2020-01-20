import sortBy from 'lodash/sortBy';
import { Filter } from '.';
import { Plan } from '../interface';

const plans = [
  {
    providerId: '2',
    serviceId: '2-1',
    name: 'd',
    price: { value: 1 },
    duration: { magnitude: 1 },
    volume: { magnitude: 1 },
  },
  {
    providerId: '1',
    serviceId: '1-2',
    name: 'b',
    price: { value: 2 },
    duration: { magnitude: 2 },
    volume: { magnitude: 9 },
  },
  {
    providerId: '1',
    serviceId: '1-1',
    name: 'a',
    price: { value: 1 },
    duration: { magnitude: 1 },
    volume: { magnitude: 1 },
  },
  {
    providerId: '1',
    serviceId: '1-3',
    name: 'c',
    price: { value: 3 },
    duration: { magnitude: 3 },
    volume: { magnitude: 3 },
  },
  {
    providerId: '2',
    serviceId: '2-3',
    name: 'f',
    price: { value: 3 },
    duration: { magnitude: 3 },
    volume: { magnitude: 3 },
  },
  {
    providerId: '2',
    serviceId: '2-2',
    name: 'e',
    price: { value: 2 },
    duration: { magnitude: 2 },
    volume: { magnitude: 2 },
  },
] as unknown as Plan[];


describe('Filter', () => {
  let filter: Filter;

  beforeEach(() => {
    filter = new Filter();
  });

  it('should have an empty provider filter initially', () => {
    expect(filter.provider).toBe('');
  });
  it('should have an empty service filter initially', () => {
    expect(filter.service).toBe('');
  });
  it('should have a setProvider method', () => {
    const providerId = 'provider-id';
    filter.setProvider(providerId);
    expect(filter.provider).toBe(providerId);
  });
  it('should have a setService method', () => {
    const serviceId = 'service-id';
    filter.setService(serviceId);
    expect(filter.service).toBe(serviceId);
  });
  it('should return plans if not filters are set', () => {
    expect(filter.filterPlans(plans)).toEqual(plans);
  });
  it('should return plans matching the set providerId', () => {
    const providerId = '2';
    filter.setProvider(providerId);
    expect(filter.filterPlans(plans)).toEqual(plans.filter(p => p.providerId === providerId));
  });
  it('should return plans matching the set serviceId', () => {
    const serviceId = '2';
    filter.setService(serviceId);
    expect(filter.filterPlans(plans)).toEqual(plans.filter(p => p.serviceId === serviceId));
  });
  it('should order by the name if orderBy is set to name', () => {
    filter.orderBy = 'name';
    expect(filter.filterPlans(plans)).toEqual(sortBy(plans, 'name'));
  });
  it('should order by the reverese name if orderBy is set twice to name', () => {
    filter.orderBy = 'name';
    filter.orderBy = 'name';
    expect(filter.filterPlans(plans)).toEqual(sortBy(plans, 'name').reverse());
  });
  it('should reset the name filter if orderBy is set thrice', () => {
    filter.orderBy = 'name';
    filter.orderBy = 'name';
    filter.orderBy = 'name';
    expect(filter.filterPlans(plans)).toEqual(plans);
  });
  it('should order by price  if orderBy is set to price', () => {
    filter.orderBy = 'price';
    expect(filter.filterPlans(plans)).toEqual(sortBy(plans, p => p.price.value));
  });
  it('should order by volume  if orderBy is set to volume', () => {
    filter.orderBy = 'volume';
    expect(filter.filterPlans(plans)).toEqual(sortBy(plans, p => p.volume.magnitude));
  });
  it('should order by duration  if orderBy is set to duration', () => {
    filter.orderBy = 'duration';
    expect(filter.filterPlans(plans)).toEqual(sortBy(plans, p => p.duration.magnitude));
  });
});
