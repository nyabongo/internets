import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Icon from '.';


const logo = 'http://lorempixel.com/400/400/abstract';

storiesOf('Icon', module)
  .add('default', () => (
    <MemoryRouter>
      <Icon imageURL={logo} title="title here" />
    </MemoryRouter>
  ))
  .add('Long Title', () => (
    <MemoryRouter>
      <Icon imageURL={logo} title="This is a Potentially multiline title" />
    </MemoryRouter>
  ));
