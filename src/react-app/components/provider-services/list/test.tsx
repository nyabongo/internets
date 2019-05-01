import React from 'react';
import { render, cleanup, RenderResult } from 'react-testing-library';
import ProviderServices from '.';

describe('ProviderServices', () => {
  afterEach(() => {
    cleanup();
  });
  let renderResult: RenderResult;
  const providerId = 'provider-id';
  beforeEach(() => {
    renderResult = render(<ProviderServices providerId={providerId} />);
  });
  it('should render', () => {
    expect(renderResult.asFragment()).toBeTruthy();
  });
});
