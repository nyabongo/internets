import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import PageRouter from '.';
import { View } from '../..';

describe('PageRouter', () => {
  let wrapper: ReactWrapper;
  let view: View;
  const providerId = 'provider-id';
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
    it('should call view.showPage with home', () => {
      wrapper = mountAtPath('/');
      expect(view.showPage).toHaveBeenCalledWith('home');
    });
  });
  describe('at providers path', () => {
    it('should call view.showPage with home', () => {
      wrapper = mountAtPath('/providers');
      expect(view.showPage).toHaveBeenCalledWith('providers');
    });
  });
  describe('at Provider page', () => {
    it('should call view.showPage with provider and the id', () => {
      wrapper = mountAtPath(`/providers/${providerId}`);
      expect(view.showPage).toHaveBeenCalledWith('provider', { providerId });
    });
  });
  describe('at provider services page', () => {
    it('should call view.showpage with "services" and providerId', () => {
      wrapper = mountAtPath(`/providers/${providerId}/services`);
      expect(view.showPage).toHaveBeenCalledWith('services', { providerId });
    });
  });
});
