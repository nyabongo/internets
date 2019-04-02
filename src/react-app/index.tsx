import React, { Component } from 'react';
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
       Placeholder
      </div>
    );
  }
}

export default App;
