import sample from 'lodash/sample';
import db from '.';
import data from './data';
import { ServiceProvider, Plan, Service } from '../interface';

const provider = sample(data.serviceProviders) as ServiceProvider;
const service = sample(data.services) as Service;
const plan = sample(data.plans) as Plan;

describe('StaticDB', () => {
  describe('Providers', () => {
    describe('getServiceProviders', () => {
      it('should return the static service Providers when', async () => {
        const result = await db.getServiceProviders();
        expect(result).toBe(data.serviceProviders);
      });
    });
    describe('getServiceProviderById', () => {
      it('should return a provider with a Matching ID', async () => {
        const result = await db.getServiceProviderById(provider.id);
        expect(result).toBe(provider);
      });
    });
  });

  describe('Services', () => {
    describe('getServices', () => {
      it('should return an array of services', async () => {
        const result = await db.getServices();
        expect(result).toBe(data.services);
      });
    });

    describe('getProviderServices', () => {
      it('should return a providers services', async () => {
        const result = await db.getProviderServices(provider.id);
        expect(result).toEqual(data.services.filter(s => s.providerId === provider.id));
      });
    });
    describe('getServiceById', () => {
      it('should return a service when given just the sservice.id', async () => {
        const result = await db.getServiceById(service.id);
        expect(result).toBe(service);
      });
      it('should return a service when given providerId as well', async () => {
        const result = await db.getServiceById(service.id, service.providerId);
        expect(result).toBe(service);
      });
    });
  });

  describe('Plans', () => {
    describe('getPlans', () => {
      it('should return an array of plans', async () => {
        const result = await db.getPlans();
        expect(result).toBe(data.plans);
      });
    });
    describe('getServicePlans', () => {
      it('should return a list of plans from the specified serviceId', async () => {
        const result = await db.getServicePlans(service.id);
        const expected = data.plans.filter(p => p.serviceId === service.id);
        expect(result).toEqual(expected);
      });
      it('should return a list of plans from the specified serviceId and providerId', async () => {
        const result = await db.getServicePlans(service.id, service.providerId);
        const expected = data.plans.filter(p => p.serviceId === service.id
          && p.providerId === service.providerId);
        expect(result).toEqual(expected);
      });
    });
    describe('getProviderPlans', () => {
      it('should return a list of plans from the specified providerId', async () => {
        const result = await db.getProviderPlans(provider.id);
        const expected = data.plans.filter(p => p.providerId === provider.id);
        expect(result).toEqual(expected);
      });
    });
    describe('getPlanById', () => {
      it('should return a plan when given the planId', async () => {
        const result = await db.getPlanById(plan.id);
        expect(result).toBe(plan);
      });
      it('should return a plan when given the planId and serviceId', async () => {
        const result = await db.getPlanById(plan.id, plan.serviceId);
        expect(result).toBe(plan);
      });
      it('should return a plan when given the planId, serviceId and providerId', async () => {
        const result = await db.getPlanById(plan.id, plan.serviceId, plan.providerId);
        expect(result).toBe(plan);
      });
    });
  });
});
