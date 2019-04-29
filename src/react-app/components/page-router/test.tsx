import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import PageRouter from '.';
import { View } from '../..';

describe('PageRouter', () => {
  let wrapper: ReactWrapper;
  let view: View;
  beforeEach(() => {
    view = {
      showPage: jest.fn(),
    };
  });
  function mountAtPath(path: string) {
    wrapper = mount(
      <MemoryRouter initialEntries={[path]}>
        <PageRouter view={view} />
      </MemoryRouter>,
    );
    expect(wrapper.html()).toBeNull();
    return wrapper;
  }
  describe('at the home route', () => {
    beforeEach(() => {
      wrapper = mountAtPath('/');
    });
    it('should call view.showPage with home', () => {
      expect(view.showPage).toHaveBeenCalledWith('home');
    });
  });
  describe('at providers path', () => {
    beforeEach(() => {
      wrapper = mountAtPath('/providers');
    });
    it('should call view.showPage with home', () => {
      expect(view.showPage).toHaveBeenCalledWith('providers');
    });
  });
  describe('at Provider page', () => {
    const providerId = 'provider-id';
    beforeEach(() => {
      wrapper = mountAtPath(`/providers/${providerId}`);
    });
    it('should call view.showPage with provider and the id', () => {
      expect(view.showPage).toHaveBeenCalledWith('provider', { providerId });
    });
  });
});
