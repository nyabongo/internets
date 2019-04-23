import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import PageRouter from '.';
import View from '../../../App/interfaces/view';

describe('PageRouter', () => {
  let wrapper: ReactWrapper;
  let view: View;
  beforeEach(() => {
    view = {
      showPage: jest.fn(),
    };
  });
  describe('at the home route', () => {
    beforeEach(() => {
      wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <PageRouter view={view} />
        </MemoryRouter>,
      );
    });
    it('should call view.showPage with home', () => {
      expect(view.showPage).toHaveBeenCalledWith('home');
    });
    it('should return null', () => {
      expect(wrapper.html()).toBeNull();
    });
  });
});
