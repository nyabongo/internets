import React from 'react';
import mount from 'enzyme/mount';
import ISPs from '.';

describe('ISPs', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<ISPs />);
  });
  it('souldl render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
