import React from 'react';
import mount from 'enzyme/mount';
import Table from '@material-ui/core/Table';
import { TableBody } from '@material-ui/core';
import mockDataplans from './container/example-dataplans';
import Dataplans from '.';
import Plan from './dataplan';
import TableHeaders from './table-headers';

jest.mock('./container',
  () => C => p => <C {...p} dataplans={mockDataplans} />);
jest.mock('./dataplan', () => () => <tr />);

describe('Dataplans', () => {
  let wrapper;
  let table;
  beforeEach(() => {
    wrapper = mount(<Dataplans />);
    table = wrapper.find(Table);
  });

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('should have a table', () => {
    expect(table.exists()).toBeTruthy();
  });
  describe('table', () => {
    let tableBody;
    beforeEach(() => {
      tableBody = table.find(TableBody);
    });
    it('should render TableHeaders', () => {
      expect(wrapper.find(TableHeaders).exists()).toBeTruthy();
    });
    it('should have a table body', () => {
      expect(tableBody).toHaveLength(1);
    });
    describe('tableBody', () => {
      it('should render a DataPlan component for each dataplan', () => {
        expect.hasAssertions();
        const plans = tableBody.find(Plan);
        mockDataplans.forEach((plan) => {
          const planWrapper = plans.findWhere(n => n.prop('plan') === plan);
          expect(planWrapper.exists()).toBeTruthy();
        });
      });
    });
  });
  it('should contain dataplans from mockDataplans', () => {
    expect(wrapper.childAt(0).prop('dataplans')).toBe(mockDataplans);
  });
});
