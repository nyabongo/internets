import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
import Model from '../db';
import Controller from '../App/controller';
import App from '.';
import HomePage from './components/home-page';
import View from '../App/interfaces/view';
import Router from './components/page-router';

jest.mock('../db');
jest.mock('../App/controller');
jest.mock('./components/page-router', () => () => null);

describe('App', () => {
  let wrapper: ReactWrapper;
  let MockController: jest.Mock;
  let MockModel: jest.Mock;
  beforeEach(() => {
    MockController = Controller as jest.Mock;
    MockModel = Model as jest.Mock;
    MockController.mockClear();
    MockModel.mockClear();
    wrapper = mount(<App />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('should initialise a model', () => {
    expect(Model).toHaveBeenCalledTimes(1);
    expect(Model).toHaveBeenCalledWith();
  });

  it('should initialise the controller with the model instance', () => {
    expect(Controller).toHaveBeenCalledTimes(1);
    expect(Controller).toHaveBeenCalledWith(expect.any(Object), MockModel.mock.instances[0]);
  });

  describe('Router', () => {
    let router: ReactWrapper<{ view: View; }, never, React.Component<{}, {}, any>>;
    beforeEach(() => {
      router = wrapper.find(Router);
    });
    it('should be rendered', () => {
      expect(router.exists()).toBeTruthy();
    });
    it('should be rendered with view as its view prop', () => {
      const view = MockController.mock.calls[0][0];
      expect(router.prop('view')).toBe(view);
    });
  });

  describe('View', () => {
    let view: View;
    beforeEach(() => {
      view = MockController.mock.calls[0][0];
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
