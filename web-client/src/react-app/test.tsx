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
        let providerPage: ReactWrapper<any>;
        beforeEach(() => {
          act(() => { view.showPage('provider', { providerId }); });
          wrapper.update();
          providerPage = wrapper.find(ProviderPage);
        });
        it('should have providerId as its providerId prop', () => {
          expect(providerPage.prop('providerId')).toBe(providerId);
        });
        it('should have a false showServicesprop', () => {
          expect(providerPage.prop('showServices')).toBe(false);
        });
      });

      describe('a providers services page', () => {
        const providerId = 'provider-id';
        let providerPage: ReactWrapper<any>;
        const showServices = true;
        beforeEach(() => {
          act(() => {
            view.showPage('provider', { providerId, showServices });
          });
          wrapper.update();
          providerPage = wrapper.find(ProviderPage);
        });
        it('should be rendered when view.showPage("home") is called', () => {
          expect(providerPage.exists()).toBeTruthy();
        });
        it('should have providerId as its providerId prop', () => {
          expect(providerPage.prop('providerId')).toBe(providerId);
        });
        it('should have the same showServices prop', () => {
          expect(providerPage.prop('showServices')).toBe(showServices);
        });
      });

      describe('a provider service page', () => {
        const providerId = 'provider-id';
        const serviceId = 'service-id';
        let providerPage: ReactWrapper<any>;
        beforeEach(() => {
          act(() => {
            view.showPage('provider', { providerId, serviceId });
          });
          wrapper.update();
          providerPage = wrapper.find(ProviderPage);
        });
        it('should be rendered when view.showPage("home") is called', () => {
          expect(providerPage.exists()).toBeTruthy();
        });
        it('should have providerId as its providerId prop', () => {
          expect(providerPage.prop('providerId')).toBe(providerId);
        });
        it('should have serviceId as its serviceId prop', () => {
          expect(providerPage.prop('serviceId')).toBe(serviceId);
        });
      });

      describe('a provider service plans page', () => {
        const providerId = 'provider-id';
        const serviceId = 'service-id';
        const showPlans = true;
        let providerPage: ReactWrapper<any>;
        beforeEach(() => {
          act(() => {
            view.showPage('provider', { providerId, serviceId, showPlans });
          });
          wrapper.update();
          providerPage = wrapper.find(ProviderPage);
        });
        it('should be rendered when view.showPage("home") is called', () => {
          expect(providerPage.exists()).toBeTruthy();
        });
        it('should have providerId as its providerId prop', () => {
          expect(providerPage.prop('providerId')).toBe(providerId);
        });
        it('should have serviceId as its serviceId prop', () => {
          expect(providerPage.prop('serviceId')).toBe(serviceId);
        });
        it('should have the same showPlans prop', () => {
          expect(providerPage.prop('showPlans')).toBe(showPlans);
        });
      });

      describe('a provider service plan page', () => {
        const providerId = 'provider-id';
        const serviceId = 'service-id';
        const planId = 'plan-id';
        let providerPage: ReactWrapper<any>;
        beforeEach(() => {
          act(() => {
            view.showPage('provider', { providerId, serviceId, planId });
          });
          wrapper.update();
          providerPage = wrapper.find(ProviderPage);
        });
        it('should be rendered when view.showPage("home") is called', () => {
          expect(providerPage.exists()).toBeTruthy();
        });
        it('should have providerId as its providerId prop', () => {
          expect(providerPage.prop('providerId')).toBe(providerId);
        });
        it('should have serviceId as its serviceId prop', () => {
          expect(providerPage.prop('serviceId')).toBe(serviceId);
        });
        it('should have planId as its planId prop', () => {
          expect(providerPage.prop('planId')).toBe(planId);
        });
      });
    });
  });
});
