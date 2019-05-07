import db from '.';

describe('db', () => {
  describe('getProviders', () => {
    it('should be a function', () => {
      expect(db.getServiceProviders).toBeInstanceOf(Function);
    });
  });
});
