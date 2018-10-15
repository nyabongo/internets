import React from 'react';
import mount from 'enzyme/mount';
import Table from '@material-ui/core/Table';
import { TableBody } from '@material-ui/core';
import mockDataplans from '../../App/with-dataplans/example-dataplans';
import Dataplans from '.';
import Plan from './dataplan';
import TableHeaders from './table-headers';


jest.mock('./dataplan', () => () => <div />);

describe('Dataplans', () => {
  let wrapper;
  let table;
  beforeEach(() => {
    wrapper = mount(<Dataplans dataplans={mockDataplans} />);
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
});
