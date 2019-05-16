import React from 'react';
import {
  render, RenderResult, cleanup, act, fireEvent,
} from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import sample from 'lodash/sample';
import data from '../../../../../db/static-db/data';
import PlansTable from '.';

jest.mock('./logo', () => () => null);
describe('PlansTable', () => {
  let renderResult: RenderResult;
  afterAll(() => {
    cleanup();
  });
  beforeAll(() => {
    act(() => {
      renderResult = render(
        <MemoryRouter>
          <PlansTable />
        </MemoryRouter>,
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
});
