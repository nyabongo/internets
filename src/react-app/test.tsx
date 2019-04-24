import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
import App, { View } from '.';
import HomePage from './components/home-page';
import Router from './components/page-router';

jest.mock('../db');
jest.mock('./components/page-router', () => () => null);

describe('App', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe('Router', () => {
    let router: ReactWrapper<{ view: View }, never, React.Component<{}, {}>>;
    beforeEach(() => {
      router = wrapper.find(Router);
    });
    it('should be rendered', () => {
      expect(router.exists()).toBeTruthy();
    });
    it('should be rendered with a prop', () => {
      expect(router.prop('view')).toBeTruthy();
    });
    describe('View', () => {
      let view: View;
      beforeEach(() => {
        view = router.prop('view');
      });
      describe('Home Page', () => {
        it('should not be rendered  by default', () => {
          expect(wrapper.find(HomePage).exists()).toBeFalsy();
        });
        it('should be rendered when view.showPage("home") is called', () => {
          act(() => {
            view.showPage('home');
          });
          wrapper.update();
          expect(wrapper.find(HomePage).exists()).toBeTruthy();
        });
      });
    });
  });
});
