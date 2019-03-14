import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import Controller from '../App/controller';
import View from '../App/interfaces/view';
import Db from '../db';
import Model from '../App/interfaces/model';
import Presenter from '../App/interfaces/presenter';

class App extends Component implements View {
  model: Model;
  controller: Presenter;
  constructor(props: Readonly<{}>) {
    super(props);
    this.model = new Db();
    this.controller = new Controller(this, this.model);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
