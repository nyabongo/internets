import React from 'react';
import {
  render, cleanup, RenderResult,
} from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import ProviderPage from '.';
import { DBProvider } from '../../../../db';
import db from '../../../../db/static-db';
import { ServiceProvider } from '../../../../db/interface';

jest.mock('../../../../db/static-db');

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
  beforeAll(() => {
    const mockGetServiceProviderById = db.getServiceProviderById as jest.Mock;
    mockGetServiceProviderById.mockReturnValueOnce(Promise.resolve(provider));
    renderResult = render(
      <MemoryRouter>
        <DBProvider value={db}>
          <ProviderPage id={provider.id} />
        </DBProvider>
      </MemoryRouter>,
    );
  });
  it('should call getServiceProviderById', () => {
    expect(db.getServiceProviderById).toHaveBeenCalledWith(provider.id);
  });
  it('should show the provider name as the title', () => {
    expect(renderResult.getByRole('heading').textContent).toBe(provider.name);
    expect(document.title).toBe(provider.name);
  });
  it('should show the banner', () => {
    const banner = renderResult.getByRole('banner') as HTMLImageElement;
    expect(banner.src).toBe(provider.banner);
  });
  it('should show the description as the contentinfo', () => {
    const desc = renderResult.getByRole('contentinfo');
    expect(desc.textContent).toBe(provider.description);
  });
  it('should have a link to the provider services', () => {
    const link = renderResult.getByTestId('services-link') as HTMLAnchorElement;
    expect(link.text).toBe('Services');
    expect(link.href).toBe(`${document.location.origin}/providers/${provider.id}/services`);
  });
});
