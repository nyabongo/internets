import React from 'react';
import { render, RenderResult, cleanup } from 'react-testing-library';
import DetailCard from '.';
import { Thing } from '../../../../db/interface';

const thing: Thing = {
  id: 'three',
  name: 'Africell Uganda',
  description: 'Non minima ullam numquam dolorem. Quis culpa alias eos reprehenderit illo unde aut quia. Sed iste quis non dolorem sequi. Odit distinctio quo fugit totam molestiae. Ea omnis sed.',
  website: 'https://africell.ug',
  banner: 'http://www.accessgambia.com/information/large/africell-logo-1.jpg',
  logo: 'http://www.connectenterprise.ug/sites/default/files/africell.jpg',
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
});
