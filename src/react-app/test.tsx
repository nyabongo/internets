import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
import App, { View } from '.';
import HomePage from './components/home-page';
import Router from './components/page-router';
import ProvidersList from './components/service-providers/list';
import ProviderPage from './components/service-providers/single';

jest.mock('./components/page-router', () => () => null);
jest.mock('./components/home-page', () => () => null);
jest.mock('./components/service-providers/list', () => () => null);
jest.mock('./components/service-providers/single', () => () => null);

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
          act(() => { view.showPage('home'); });
          wrapper.update();
          expect(wrapper.find(HomePage).exists()).toBeTruthy();
        });
      });
      describe('Providers Page', () => {
        it('should not be rendered  by default', () => {
          expect(wrapper.find(ProvidersList).exists()).toBeFalsy();
        });
        it('should be rendered when view.showPage("home") is called', () => {
          act(() => { view.showPage('providers'); });
          wrapper.update();
          expect(wrapper.find(ProvidersList).exists()).toBeTruthy();
        });
      });
      describe('Single Provider Page', () => {
        const providerId = 'provider-id';
        let providerPage: ReactWrapper<{ id: string }>;
        beforeEach(() => {
          act(() => { view.showPage('provider', { providerId }); });
          wrapper.update();
          providerPage = wrapper.find(ProviderPage);
        });
        it('should be rendered when view.showPage("home") is called', () => {
          expect(providerPage.exists()).toBeTruthy();
        });
        it('should have id as its id prop', () => {
          expect(providerPage.prop('id')).toBe(providerId);
        });
      });
    });
  });
});
