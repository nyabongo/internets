import React from 'react';
import mount from 'enzyme/mount';
import withFx from '.';

const Subject = () => <div />;
const SubjectWithFX = withFx(Subject);

describe('withFx', () => {
  let subject;
  beforeEach(() => {
    subject = mount(<SubjectWithFX />).find(Subject);
  });
  it('should render the subject', () => {
    expect(subject).toHaveLength(1);
  });
});
