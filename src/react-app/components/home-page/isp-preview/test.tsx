import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Link, LinkProps } from 'react-router-dom';
import ISPPreview from '.';

jest.mock('react-router-dom/Link', () => ({
  // eslint-disable-next-line react/prop-types
  Link: ({ children }: LinkProps) => (
    <div>
      {children}
    </div>
  ),
}));
describe('ISPPreview', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<ISPPreview />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  describe('Link To isps', () => {
    let link: ReactWrapper<LinkProps>;
    beforeEach(() => {
      link = wrapper.find(Link);
    });
    it('should be rendered', () => {
      expect(link.exists()).toBeTruthy();
    });
    it('should have the text "More ISPs" ', () => {
      expect(link.text()).toBe('More ISPs');
    });
    it('should link to providers', () => {
      expect(link.prop('to')).toBe('/providers');
    });
  });
});
