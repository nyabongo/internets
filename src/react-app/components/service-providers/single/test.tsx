import React from 'react';
import {
  render, cleanup, RenderResult,
} from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import ProviderPage from '.';
import data from '../../../../db/static-db/data';


const provider = data.serviceProviders[0];

describe('ProviderPage', () => {
  afterAll(() => {
    cleanup();
  });

  let renderResult: RenderResult;
  beforeAll(() => {
    renderResult = render(
      <MemoryRouter>
        <ProviderPage providerId={provider.id} />
      </MemoryRouter>,
    );
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

describe('Provider Services page', () => {
  afterAll(() => {
    cleanup();
  });

  let renderResult: RenderResult;
  beforeAll(() => {
    renderResult = render(
      <MemoryRouter>
        <ProviderPage providerId={provider.id} showServices />
      </MemoryRouter>,
    );
  });
  it('Should set the document title', () => {
    expect(document.title).toBe(`${provider.name} Services`);
  });
});
