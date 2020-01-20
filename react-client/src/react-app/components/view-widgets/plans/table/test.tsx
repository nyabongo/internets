import React from 'react';
import {
  render, RenderResult, cleanup, act, fireEvent,
} from 'react-testing-library';
import sample from 'lodash/sample';
import data from '../../../../../db/static-db/data';
import PlansTable from '.';
import { FilterProvider, Filter } from '../../../../../db/filter';

jest.mock('./logo', () => () => null);
const filter = new Filter();
describe('PlansTable', () => {
  let renderResult: RenderResult;
  afterAll(() => {
    cleanup();
  });
  beforeAll(() => {
    act(() => {
      filter.setDispatch(jest.fn());
      renderResult = render(
        <FilterProvider value={filter}>
          <PlansTable />
        </FilterProvider>,
      );
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
  it('should show the plan detail when a row is clicked', () => {
    expect(renderResult.queryAllByRole('dialog')).toHaveLength(0);
    const planRow = sample(renderResult.queryAllByRole('row'));
    if (planRow) fireEvent.click(planRow);
    expect(renderResult.queryAllByRole('dialog')).toHaveLength(1);
  });
  it('should dispatch an orderBy message when a header is clicked', () => {
    const messages = ['name', 'duration', 'volume', 'price'];
    const headers = renderResult.queryAllByRole('columnheader');
    expect(headers).toHaveLength(messages.length);
    headers.forEach((header, index) => {
      fireEvent.click(header);
      expect(filter.dispatch).toHaveBeenLastCalledWith({ orderBy: messages[index] });
    });
  });
});
