import { init } from '.';

jest.mock('./sheets-api', () => jest.fn().mockResolvedValue('sheets-data'));

describe('db', () => {
  describe('init', () => {
    it('should be a function', () => {
      expect(init).toBeInstanceOf(Function);
    });
  });
});
