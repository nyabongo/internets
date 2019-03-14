import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Model from '../db';
import Controller from '../App/controller';
import App from '.';

jest.mock('../db');
jest.mock('../App/controller');

describe('App', () => {
  let wrapper: ReactWrapper;
  let MockController;
  let MockModel: jest.Mock;
  beforeEach(() => {
    MockController = Controller as jest.Mocked<any>;
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
  it('should initialise the controller with the App instance', () => {
    expect(Controller).toHaveBeenCalledTimes(1);
    expect(Controller).toHaveBeenCalledWith(wrapper.instance(), MockModel.mock.instances[0]);
  });
});
