import React from 'react';
import {
  render, RenderResult, cleanup, act,
} from 'react-testing-library';
import data from '../../../../../db/static-db/data';
import PlansTable from '.';

describe('PlansTable', () => {
  let renderResult: RenderResult;
  afterAll(() => {
    cleanup();
  });
  beforeAll(() => {
    act(() => {
      renderResult = render(<PlansTable />);
    });
  });
  it('should render', () => {
    expect(renderResult.container.innerHTML).not.toBeNull();
  });
  it('sould contain a table', () => {
    expect(renderResult.queryAllByRole('table')).toHaveLength(1);
  });
  it('should contain a row for each plan', () => {
    expect(renderResult.queryAllByRole('row')).toHaveLength(data.plans.length);
  });
});
