import '.';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

jest.mock('react-dom', () => ({ render: jest.fn() }));

it('should call react render', () => {
  expect(ReactDOM.render).toHaveBeenCalledWith(
    <App />,
    document.getElementById('root'),
  );
});
