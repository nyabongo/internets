import { Filter } from '.';
import { Plan } from '../interface';

const plans = [
  { providerId: '1', serviceId: '1-1' },
  { providerId: '1', serviceId: '1-2' },
  { providerId: '1', serviceId: '1-3' },
  { providerId: '2', serviceId: '2-1' },
  { providerId: '2', serviceId: '2-2' },
  { providerId: '2', serviceId: '2-3' },
] as Plan [];


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
});
