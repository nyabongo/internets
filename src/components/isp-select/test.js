import React from 'react';
import mount from 'enzyme/mount';
import groupBy from 'lodash/groupBy';
import mockDataplans from '../../App/with-dataplans/example-dataplans';
import ISP from './isp';
import ISPSelect from '.';

jest.mock('./isp', () => () => <div />);
describe('ISPSelect', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<ISPSelect dataplans={mockDataplans} />);
  });
  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('should render a ListItem for each isp', () => {
    expect.hasAssertions();
    const isps = groupBy(mockDataplans, 'isp');
    const ISPs = wrapper.find(ISP);
    Object.keys(isps).forEach((isp) => {
      expect(ISPs.findWhere(n => n.prop('isp') === isp)).toHaveLength(1);
    });
  });
});
