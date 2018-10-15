import React from 'react';
import mount from 'enzyme/mount';
import mockDataplans from '../with-dataplans/example-dataplans';
import withFilter from '.';

const TestComp = () => <div />;
const HOCed = withFilter(TestComp);

describe('withFilter', () => {
  let wrapper;
  let tc;
  beforeEach(() => {
    wrapper = mount(<HOCed dataplans={mockDataplans} />);
    tc = wrapper.find(TestComp);
  });
  it('should render the contained Component', () => {
    expect(tc).toHaveLength(1);
  });
  it('should initialise the filter property to an empty object', () => {
    expect(tc.prop('filters')).toEqual({});
  });
  it('should pass an updateFilter function to the contained component', () => {
    expect(tc.prop('updateFilters')).toBeInstanceOf(Function);
  });
});
