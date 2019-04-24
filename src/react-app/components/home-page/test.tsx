import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import ISPPreview from './isp-preview';
import HomePage from '.';

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
