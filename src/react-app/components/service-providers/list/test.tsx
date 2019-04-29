/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import {
  render, cleanup, RenderResult, act,
} from 'react-testing-library';
import { DBProvider } from '../../../../db';
import { Model } from '../../../../db/interface';
import ProvidersList from '.';

jest.mock('../card', () => (p: any) => (
  <div
    data-providerprop={JSON.stringify(p.provider)}
    data-testid="provider-card"
  />
));

describe('ProvidersList', () => {
  let db: Model;
  let renderResult: RenderResult;
  const providers = [
    { id: 'one', name: 'one' },
    { id: 'two', name: 'two' },
    { id: 'three', name: 'three' },
  ];
  let deffered: { resolve: (value: any) => void; reject: (reason?: any) => void };
  afterEach(() => {
    cleanup();
  });
  beforeEach(() => {
    act(() => {
      const promise = new Promise((resolve, reject) => { deffered = { resolve, reject }; });
      db = { getServiceProviders: jest.fn(() => promise) };
      renderResult = render(<DBProvider value={db}><ProvidersList /></DBProvider>);
    });
  });
  it('should call db.getProviders', () => {
    expect(db.getServiceProviders).toHaveBeenCalled();
  });
  it('should render a card for each service provider', async () => {
    act(() => { deffered!.resolve(providers); });
    const cards = await renderResult.findAllByTestId('provider-card');

    providers.forEach((provider, index) => {
      const card = cards[index];
      expect(card.dataset.providerprop).toBe(JSON.stringify(provider));
    });
  });
});
