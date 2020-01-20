import { getMapFromHeaders } from '.';

const oneD = {
  headers: [['name', 'age']],
  expectedMap: {
    name: 0,
    age: 1,
  },
};
const twoD = {
  headers: [
    ['name', 'age'],
    ['', 'value', 'unit'],
  ],
  expectedMap: {
    name: 0,
    age: { value: 1, unit: 2 },
  },
};
const twoD2 = {
  headers: [
    ['name', 'age', ''],
    ['', 'value', 'unit', 'relMag'],
  ],
  expectedMap: {
    name: 0,
    age: { value: 1, unit: 2, relMag: 3 },
  },
};
const three = {
  headers: [
    ['providerId', 'serviceId', 'name', 'description', 'website', 'logo', 'banner', 'price', '', 'volume', '', 'duration'],
    ['', '', '', '', '', '', '', 'value', 'currency', 'value', 'unit', 'value', 'unit'],
  ],
  expectedMap: {
    providerId: 0,
    serviceId: 1,
    name: 2,
    description: 3,
    website: 4,
    logo: 5,
    banner: 6,
    price: { value: 7, currency: 8 },
    volume: { value: 9, unit: 10 },
    duration: { value: 11, unit: 12 },
  },
};
const three2 = {
  headers: [
    ['providerId', 'serviceId', 'name', 'description', 'website', 'logo', 'banner', 'price', '', 'volume', '', 'duration', ''],
    ['', '', '', '', '', '', '', 'value', 'currency', 'value', 'unit', 'value', 'unit'],
  ],
  expectedMap: {
    providerId: 0,
    serviceId: 1,
    name: 2,
    description: 3,
    website: 4,
    logo: 5,
    banner: 6,
    price: { value: 7, currency: 8 },
    volume: { value: 9, unit: 10 },
    duration: { value: 11, unit: 12 },
  },
};
const cases = [oneD, twoD, twoD2, three, three2];
// const cases = [three];
describe('getMapFromHeaders', () => {
  it.each(cases)('should return the right stuff', ({ headers, expectedMap }) => {
    expect(getMapFromHeaders(headers)).toEqual(expectedMap);
  });
});
