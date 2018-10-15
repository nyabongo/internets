import React from 'react';
import mount from 'enzyme/mount';
import groupBy from 'lodash/groupBy';
import mockDataplans from '../../App/with-dataplans/example-dataplans';
import ISP from './isp';
import ISPSelect from '.';

jest.mock('./isp', () => () => <div />);
describe('ISPSelect', () => {
  let wrapper;
  const isps = groupBy(mockDataplans, 'isp');
  let renderedISPS;
  beforeEach(() => {
    wrapper = mount(<ISPSelect
      filters={{}}
      updateFilters={jest.fn()}
      dataplans={mockDataplans}
    />);
    renderedISPS = wrapper.find(ISP);
  });
  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('should render an ISP for each isp', () => {
    expect.hasAssertions();
    Object.keys(isps).forEach((isp) => {
      expect(renderedISPS.findWhere(n => n.prop('isp') === isp)).toHaveLength(1);
    });
  });
  describe('onSelect', () => {
    it('should pass each ISP an onSelect function', () => {
      expect.hasAssertions();
      Object.keys(isps).forEach((isp) => {
        const renderedIsp = renderedISPS.findWhere(n => n.prop('isp') === isp);
        expect(renderedIsp.prop('onSelect')).toBeInstanceOf(Function);
      });
    });
    it('should add each isp to  the state\'s selected property when the onSelect is called', () => {
      expect.hasAssertions();
      Object.keys(isps).forEach((isp) => {
        const renderedIsp = renderedISPS.findWhere(n => n.prop('isp') === isp);
        renderedIsp.prop('onSelect')(isp);
        wrapper.update();
        expect(wrapper.state('selected')).toContain(isp);
      });
    });
    it('should remove each isp from the selected state if it was previously selected', () => {
      expect.hasAssertions();
      Object.keys(isps).forEach((isp) => {
        const renderedIsp = renderedISPS.findWhere(n => n.prop('isp') === isp);
        renderedIsp.prop('onSelect')(isp);
        wrapper.update();
        renderedIsp.prop('onSelect')(isp);
        wrapper.update();
        expect(wrapper.state('selected')).not.toContain(isp);
      });
    });
    it('should call updateFilters with the isp and a function', () => {
      expect.hasAssertions();
      Object.keys(isps).forEach((isp) => {
        wrapper.prop('updateFilters').mockClear();
        const renderedIsp = renderedISPS.findWhere(n => n.prop('isp') === isp);
        renderedIsp.prop('onSelect')(isp);
        wrapper.update();
        expect(wrapper.prop('updateFilters')).toHaveBeenCalledWith(isp, expect.any(Function));
      });
    });
    it('should call updateFilters with the isp and a function that returns true when given a selected isp', () => {
      expect.hasAssertions();
      Object.keys(isps).forEach((isp) => {
        wrapper.prop('updateFilters').mockClear();
        const renderedIsp = renderedISPS.findWhere(n => n.prop('isp') === isp);
        renderedIsp.prop('onSelect')(isp);
        wrapper.update();
        const predicate = wrapper.prop('updateFilters').mock.calls[0][1];
        expect(wrapper.state('selected').length).toBeGreaterThan(0);
        wrapper.state('selected').forEach((selection) => {
          expect(predicate({ isp: selection })).toBe(true);
        });
        expect(predicate()).toBeFalsy();
        expect(predicate({})).toBeFalsy();
        expect(predicate({ isp: 'not-selected' })).toBeFalsy();
      });
    });
    it('should call updateFilters with the isp and a function that returns true when there are no selected', () => {
      expect.hasAssertions();

      Object.keys(isps).forEach((isp) => {
        wrapper.update();
        wrapper.prop('updateFilters').mockClear();
        const renderedIsp = renderedISPS.findWhere(n => n.prop('isp') === isp);
        renderedIsp.prop('onSelect')(isp);
        wrapper.update();
        renderedIsp.prop('onSelect')(isp);
        wrapper.update();
        expect(wrapper.state('selected')).not.toContain(isp);
      });

      const predicate = wrapper.prop('updateFilters').mock.calls[1][1];
      expect(predicate({})).toBe(true);
      expect(predicate()).toBe(true);
      expect(predicate({ isp: 'not-selected' })).toBe(true);
    });
  });
});
