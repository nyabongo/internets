import React from 'react';
import mount from 'enzyme/mount';
import filter from 'lodash/filter';
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
  it('should pass the dataplans to the contained component', () => {
    expect(tc.prop('dataplans')).toBe(wrapper.prop('dataplans'));
  });
  describe('updateFilter', () => {
    let updateFilter;
    beforeEach(() => {
      updateFilter = tc.prop('updateFilters');
    });
    it('should add a given label and predicate function as key and value pair in the filters state', () => {
      const label = 'a label';
      const predicate = jest.fn();
      updateFilter(label, predicate);
      wrapper.update();
      expect(wrapper.state('filters')).toMatchObject({ [label]: predicate });
    });
    it('should initialise the dataplans state to be the dataplans prop', () => {
      expect(wrapper.state('dataplans')).toBe(wrapper.prop('dataplans'));
    });
    it('should update the dataplans state by using all the filter predicates that have been set when the filter is updated', () => {
      const africellFIlter = ['africell', p => p.isp === 'Africell'];
      const unspecifiedTechFilter = ['technology', p => p.technology === 'Unspecified'];
      updateFilter(...africellFIlter);
      updateFilter(...unspecifiedTechFilter);
      wrapper.update();
      const filteredByAfricellFilter = filter(wrapper.props('dataplans'), africellFIlter[1]);
      const filteredByBoth = filter(filteredByAfricellFilter, unspecifiedTechFilter[1]);
      expect(wrapper.state('dataplans')).toEqual(filteredByBoth);
    });
  });
});
