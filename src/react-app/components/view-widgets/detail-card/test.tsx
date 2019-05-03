import React from 'react';
import { render, RenderResult, cleanup } from 'react-testing-library';
import DetailCard from '.';
import { Thing, Plan } from '../../../../db/interface';

const thing: Thing = {
  id: 'three',
  name: 'Africell Uganda',
  description: 'Non minima ullam numquam dolorem. Quis culpa alias eos reprehenderit illo unde aut quia. Sed iste quis non dolorem sequi. Odit distinctio quo fugit totam molestiae. Ea omnis sed.',
  website: 'https://africell.ug',
  banner: 'http://www.accessgambia.com/information/large/africell-logo-1.jpg',
  logo: 'http://www.connectenterprise.ug/sites/default/files/africell.jpg',
};

const plan: Plan = {
  id: '1-1-1',
  serviceId: '1-1',
  providerId: '1',
  name: 'Incredible Fresh Mouse',
  description: 'Esse mollit sit irure ut commodo ex proident.',
  price: {
    value: 466.00,
    currency: 'MDL',
    relativeMagnitude: 466.00,
  },
  volume: {
    value: 784.91,
    unit: 'MB',
    relativeMagnitude: 784.91,
  },
  duration: {
    value: 1,
    unit: 'month',
    relativeMagnitude: 1,
  },
};

describe('DetailCard', () => {
  let renderResult: RenderResult;
  afterAll(() => {
    cleanup();
  });
  beforeAll(() => {
    renderResult = render(<DetailCard thing={thing} />);
  });
  it('should render', () => {
    expect(renderResult.getAllByTestId('thing-detail')).toHaveLength(1);
  });
  it('should show the banner', () => {
    const banner = renderResult.getByRole('banner') as HTMLImageElement;
    expect(banner.src).toBe(thing.banner);
  });
  it('should show the description as the contentinfo', () => {
    const desc = renderResult.getByRole('contentinfo');
    expect(desc.textContent).toBe(thing.description);
  });
  describe('with a Plan', () => {
    beforeAll(() => {
      cleanup();
      renderResult = render(<DetailCard thing={plan} />);
    });
    it('should show the plan volume', () => {
      expect(renderResult.queryByText(`${plan.volume.value}`)).not.toBeNull();
      expect(renderResult.queryByText(`${plan.volume.unit}`)).not.toBeNull();
      expect(renderResult.queryByText('Volume')).not.toBeNull();
    });
    it('should show the plan duration', () => {
      expect(renderResult.queryByText(`${plan.duration.value}`)).not.toBeNull();
      expect(renderResult.queryByText(`${plan.duration.unit}`)).not.toBeNull();
      expect(renderResult.queryByText('Duration')).not.toBeNull();
    });
  });
});
