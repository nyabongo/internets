import React from 'react';
import mount from 'enzyme/mount';
import container from '.';

const Subject = () => <div />;
const C = container(Subject);
describe('container', () => {
  let wrapper;
  let subject;
  beforeEach(() => {
    wrapper = mount(<C />);
    subject = wrapper.find(Subject);
  });
  it('should render the contained component', () => {
    expect(subject).toHaveLength(1);
  });
});
