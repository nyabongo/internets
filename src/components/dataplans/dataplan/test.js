import React from 'react';
import mount from 'enzyme/mount';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Price from './price';

import Dataplan from '.';

jest.mock('@material-ui/core/TableRow', () => p => p.children);
jest.mock('@material-ui/core/TableCell', () => p => <div>{p.children}</div>);

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
    it('should show the isp name in the first row', () => {
      expect(cells.at(0).text()).toEqual(plan.isp);
    });
    it('should show the data volume in the second column', () => {
      expect(cells.at(1).text()).toEqual(`${plan.dataVolume}${plan.dataUnit}`);
    });
    it('should render the price component in the seccond component with price and default currency as UGX', () => {
      const priceComponent = cells.at(2).find(Price);
      expect(priceComponent.prop('value')).toEqual({ price: plan.price, priceCurrency: 'UGX' });
    });
  });
});
