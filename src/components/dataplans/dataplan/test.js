import React from 'react';
import mount from 'enzyme/mount';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Dataplan from '.';

jest.mock('@material-ui/core/TableRow', () => p => p.children);
jest.mock('@material-ui/core/TableCell', () => p => p.children);

const plan = {
  id: 2,
  isp: 'Africell Uganda',
  ispWebPage: 'http://africell.ug/',
  service: 'Internet Everywhere',
  technology: '4G/LTE',
  serviceWebPage: 'http://africell.ug/internet.php',
  dataVolume: 100,
  dataUnit: 'MB',
  megaBytes: 100,
  price: 2000,
  pricepergigabyte: 20480,
  centsperMB: 2048000,
  maxSpeed: 100,
  maxKbps: 102400,
  serviceDuration: 1,
  durationUnit: 'day',
  hours: 24,
};
describe('Dataplan', () => {
  let wrapper;
  let row;
  let cells;
  beforeEach(() => {
    wrapper = mount(<Dataplan plan={plan} />);
    row = wrapper.find(TableRow);
    cells = row.find(TableCell);
  });
  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('shoud contain a TableRow', () => {
    expect(row).toHaveLength(1);
  });
  describe('row', () => {
    it('should have 7 columns', () => {
      expect(cells).toHaveLength(7);
    });
  });
});
