import React from 'react';
import { render, cleanup, RenderResult } from 'react-testing-library';
import ProviderPage from '.';
import { DBProvider } from '../../../../db';
import { Model, ServiceProvider } from '../../../../db/interface';

const provider: ServiceProvider = {
  id: 'one',
  name: 'Airtel Uganda',
  description: 'Accusantium odit neque voluptates laboriosam repudiandae incidunt id voluptatum et. Aliquam provident incidunt. Tempora repellendus et. Amet enim quisquam corporis. Et ex laborum eos.',
  website: 'https://airtel.ug',
  banner: 'http://lorempixel.com/640/480',
  logo: 'https://upload.wikimedia.org/wikipedia/en/1/14/Bharti_Airtel_Limited.svg',
};

describe('ProviderPage', () => {
  afterAll(() => {
    cleanup();
  });

  let renderResult: RenderResult;
  let db: Model;
  beforeAll(() => {
    db = {
      getServiceProviderById: jest.fn(() => Promise.resolve(provider)),
      getServiceProviders: jest.fn(),
    };
    renderResult = render(
      <DBProvider value={db}>
        <ProviderPage id={provider.id} />
      </DBProvider>,
    );
  });
  it('should call getServiceProviderById', () => {
    expect(db.getServiceProviderById).toHaveBeenCalledWith(provider.id);
  });
  it('should show the provider name as the title', () => {
    expect(renderResult.getByRole('heading').textContent).toBe(provider.name);
  });
  it('should show the banner', () => {
    const banner = renderResult.getByRole('banner') as HTMLImageElement;
    expect(banner.src).toBe(provider.banner);
  });
  it('should show the description as the contentinfo', () => {
    const desc = renderResult.getByRole('contentinfo');
    expect(desc.textContent).toBe(provider.description);
  });
});
