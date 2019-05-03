import React from 'react';
import {
  render, cleanup, RenderResult,
} from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import sample from 'lodash/sample';
import find from 'lodash/find';
import ProviderPage from '.';
import data from '../../../../db/static-db/data';
import { Service, ServiceProvider, Plan } from '../../../../db/interface';


const plan = sample(data.plans) as Plan;
const provider = find(data.serviceProviders, { id: plan.providerId }) as ServiceProvider;
const service = find(data.services, { id: plan.serviceId }) as Service;


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
  it('should not show a link to the provider', () => {
    expect(renderResult.queryByTestId('provider-link')).toBeNull();
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
  it('should not show provider details  ', () => {
    expect(renderResult.queryByTestId('provider-detail')).toBeNull();
  });
  it('should show a link to the Provider', () => {
    const link = renderResult.getByTestId('provider-link') as HTMLAnchorElement;
    expect(link.text).toBe(provider.name);
    expect(link.href).toBe(`${document.location.origin}/providers/${provider.id}`);
  });
  it('should show a link to each of the providers services', () => {
    const services = data.services.filter(s => s.providerId === provider.id);
    const links = renderResult.getAllByTestId('service-link');
    services.forEach((svc, index) => {
      const link = links[index] as HTMLAnchorElement;
      expect(link.textContent).toBe(svc.name);
      expect(link.href).toBe(`${document.location.origin}/providers/${provider.id}/services/${svc.id}`);
    });
  });
});

describe('Service Page', () => {
  afterAll(() => {
    cleanup();
  });

  let renderResult: RenderResult;
  beforeAll(() => {
    renderResult = render(
      <MemoryRouter>
        <ProviderPage providerId={provider.id} serviceId={service.id} />
      </MemoryRouter>,
    );
  });
  it('should show the provider name and service name as the title', () => {
    expect(document.title).toBe(`${service.name} by ${provider.name}`);
  });
  it('should show the banner', () => {
    const banner = renderResult.getByRole('banner') as HTMLImageElement;
    expect(banner.src).toBe(service.banner);
  });
  it('should show the description as the contentinfo', () => {
    const desc = renderResult.getByRole('contentinfo');
    expect(desc.textContent).toBe(service.description);
  });
  it('should have a link to the service plans', () => {
    const link = renderResult.getByTestId('plans-link') as HTMLAnchorElement;
    expect(link.text).toBe('Plans');
    expect(link.href).toBe(`${document.location.origin}/providers/${provider.id}/services/${service.id}/plans`);
  });
  it('should show a link to the other services', () => {
    const link = renderResult.getByTestId('services-link') as HTMLAnchorElement;
    expect(link.text).toContain('Services');
    expect(link.text).toContain(provider.name);
    expect(link.href).toBe(`${document.location.origin}/providers/${provider.id}/services`);
  });
});

describe('Plans page', () => {
  afterAll(() => {
    cleanup();
  });

  let renderResult: RenderResult;
  beforeAll(() => {
    renderResult = render(
      <MemoryRouter>
        <ProviderPage providerId={plan.providerId} serviceId={plan.serviceId} showPlans />
      </MemoryRouter>,
    );
  });
  it('Should set the document title', () => {
    expect(document.title).toBe(`Plans from ${service.name} by ${provider.name}`);
  });
  it('should not show thing details  ', () => {
    expect(renderResult.queryByTestId('thing-detail')).toBeNull();
  });
  it('should show a link to the Service', () => {
    const link = renderResult.getByTestId('service-link') as HTMLAnchorElement;
    expect(link.text).toContain(service.name);
    expect(link.href).toBe(`${document.location.origin}/providers/${provider.id}/services/${service.id}`);
  });
  it('should show a link to each of the plans', () => {
    const plans = data.plans.filter(pln => pln.providerId === provider.id
      && pln.serviceId === service.id);
    const links = renderResult.getAllByTestId('plan-link');
    plans.forEach((pln, index) => {
      const link = links[index] as HTMLAnchorElement;
      expect(link.textContent).toContain(pln.name);
      expect(link.href).toBe(`${document.location.origin}/providers/${provider.id}/services/${service.id}/plans/${pln.id}`);
    });
  });
});

describe('Plan Page', () => {
  afterAll(() => {
    cleanup();
  });

  let renderResult: RenderResult;
  beforeAll(() => {
    renderResult = render(
      <MemoryRouter>
        <ProviderPage
          providerId={plan.providerId}
          serviceId={plan.serviceId}
          planId={plan.id}
        />
      </MemoryRouter>,
    );
  });
  it('should show the provider name and service name as the title', () => {
    expect(document.title).toBe(`${plan.name} from ${provider.name}`);
  });
  it('should show the banner', () => {
    const banner = renderResult.getByRole('banner') as HTMLImageElement;
    if (plan.banner)expect(banner.src).toBe(plan.banner);
  });
  it('should show the description as the contentinfo', () => {
    const desc = renderResult.getByRole('contentinfo');
    expect(desc.textContent).toBe(plan.description);
  });
  it('should show a link to the other plans', () => {
    const link = renderResult.getByTestId('plans-link') as HTMLAnchorElement;
    expect(link.text).toContain('Plans');
    expect(link.text).toContain(`${service.name} by ${provider.name}`);
    expect(link.href).toBe(`${document.location.origin}/providers/${provider.id}/services/${service.id}/plans`);
  });
});
