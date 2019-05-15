import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
import App, { View } from '.';
import { init } from '../db';
import HomeNav from './components/home-nav';
import Router from './components/page-router';
import ProvidersList from './components/service-providers/list';
import ProviderPage from './components/service-providers/single';
import LoadingIndicator from './components/loading-indicator';
import PlansTable from './components/view-widgets/plans/table';

jest.mock('../db');
jest.mock('./components/page-router', () => () => null);
jest.mock('./components/home-nav', () => () => null);
jest.mock('./components/service-providers/list', () => () => null);
jest.mock('./components/service-providers/single', () => () => null);
jest.mock('./components/view-widgets/plans/table', () => () => null);

describe('App', () => {
  let wrapper: ReactWrapper;
  let defferedResolve: { (value?: {} | PromiseLike<{}> | undefined): void; (arg0: {}): void };
  beforeEach(() => {
    const defferePromise = new Promise((resolve) => {
      defferedResolve = resolve;
    });
    const mockInit = init as jest.Mock;
    mockInit.mockReturnValue(defferePromise);
    wrapper = mount(<App />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('should show loader before data loads', () => {
    expect(wrapper.find(LoadingIndicator).exists()).toBe(true);
  });
  describe('on data loaded', () => {
    beforeEach(() => {
      act(() => {
        defferedResolve({});
      });
      wrapper.update();
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
      it('should initialise the database', () => {
        expect(init).toHaveBeenCalled();
      });

      describe('View', () => {
        let view: View;
        beforeEach(() => {
          view = router.prop('view');
        });

        it('should show the plans table', () => {
          wrapper.update();
          expect(wrapper.find(PlansTable).exists()).toBe(true);
        });
        describe('Home Nav', () => {
          it('should not be rendered  by default', () => {
            expect(wrapper.find(HomeNav).exists()).toBeFalsy();
          });
          it('should be rendered when view.showPage("home") is called', () => {
            act(() => { view.showPage('home'); });
            wrapper.update();
            expect(wrapper.find(HomeNav).exists()).toBeTruthy();
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
          it('should not show the plans table', () => {
            expect(wrapper.find(PlansTable).exists()).toBe(false);
          });
        });
      });
    });
  });
});
