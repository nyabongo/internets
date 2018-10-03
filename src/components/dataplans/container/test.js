import React from 'react';
import shallow from 'enzyme/shallow';
import dataplans from './example-dataplans';
import withDataPlans from '.';

const TestComponent = () => <div />;
describe('withDataPlans', () => {
  let wrapper;
  const Comp = withDataPlans(TestComponent);
  let tc;
  beforeEach(() => {
    wrapper = shallow(<Comp />);
    tc = wrapper.find(TestComponent);
  });

  it('should render the component passed in ', () => {
    expect(wrapper.find(TestComponent)).toBeTruthy();
  });
  it('should set dataplans as a prop', () => {
    expect(tc.prop('dataplans')).toBe(dataplans);
  });
});
