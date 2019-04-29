import db from '.';
import data from './data';


describe('StaticDB', () => {
  it('should return the static service Providers when', async () => {
    const result = await db.getServiceProviders();
    expect(result).toBe(data.serviceProviders);
  });
});
