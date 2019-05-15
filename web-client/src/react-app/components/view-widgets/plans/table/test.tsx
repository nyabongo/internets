import React from 'react';
import {
  render, RenderResult, cleanup, act,
} from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import data from '../../../../../db/static-db/data';
import PlansTable from '.';

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
  it('should show a link to each of the plans', () => {
    const links = renderResult.getAllByTestId('plan-link');
    data.plans.forEach(({
      providerId, serviceId, id, name,
    }, index) => {
      const link = links[index] as HTMLAnchorElement;
      expect(link.textContent).toContain(name);
      expect(link.href).toBe(`${document.location.origin}/providers/${providerId}/services/${serviceId}/plans/${id}`);
    });
  });
});
