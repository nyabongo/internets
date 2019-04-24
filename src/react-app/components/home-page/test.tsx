import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import ISPPreview from '../service-providers/isp-preview';
import HomePage from '.';

jest.mock('../service-providers/isp-preview', () => () => null);

describe('HomePage', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<HomePage />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  describe('ISPPPreview', () => {
    let ispPreview: ReactWrapper<{}, never, React.Component<{}, {}>>;
    beforeEach(() => {
      ispPreview = wrapper.find(ISPPreview);
    });
    it('should be rendered', () => {
      expect(ispPreview.exists()).toBeTruthy();
    });
  });
});
