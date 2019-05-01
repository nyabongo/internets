import db from '.';
import data from './data';


describe('StaticDB', () => {
  it('should return the static service Providers when', async () => {
    const result = await db.getServiceProviders();
    expect(result).toBe(data.serviceProviders);
  });
  it('should return a provider with a Matching ID', async () => {
    const provider = data.serviceProviders[0];
    const result = await db.getServiceProviderById(provider.id);
    expect(result).toBe(provider);
  });
  it('should return a providers services', async () => {
    const provider = data.serviceProviders[0];
    const result = await db.getProviderServices(provider.id);
    expect(result).toEqual(data.services.filter(s => s.providerId === provider.id));
  });
});
