/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import {
  render, cleanup, RenderResult, act,
} from 'react-testing-library';
import { DBProvider } from '../../../../db';
import db from '../../../../db/static-db';
import ProvidersList from '.';

jest.mock('../../../../db/static-db');
jest.mock('../../view-widgets/icon', () => (p: any) => (
  <div
    data-props={JSON.stringify(p)}
    data-testid="provider-icon"
  />
));

describe('ProvidersList', () => {
  let renderResult: RenderResult;
  const providers = [
    { id: 'one', logo: 'one.jpg', name: 'one' },
    { id: 'two', logo: 'two.jpg', name: 'two' },
    { id: 'three', logo: 'three.jpg', name: 'three' },
  ];
  let deffered: { resolve: (value: any) => void; reject: (reason?: any) => void };
  afterEach(() => {
    cleanup();
  });
  beforeEach(() => {
    act(() => {
      const promise = new Promise((resolve, reject) => { deffered = { resolve, reject }; });
      const mockGetServiceProviders = db.getServiceProviders as jest.Mock;
      mockGetServiceProviders.mockReturnValueOnce(promise);
      renderResult = render(<DBProvider value={db}><ProvidersList /></DBProvider>);
    });
  });
  it('should call db.getProviders', () => {
    expect(db.getServiceProviders).toHaveBeenCalled();
  });
  it('should render a Icon for each service provider', async () => {
    act(() => { deffered!.resolve(providers); });
    const cards = await renderResult.findAllByTestId('provider-icon');

    providers.forEach(({ name, logo, id }, index) => {
      const card = cards[index];
      expect(card.dataset.props).toBe(JSON.stringify({
        imageURL: logo,
        title: name,
        target: `/providers/${id}`,
      }));
    });
  });
});
