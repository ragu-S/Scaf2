import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../routes';

type Props = {};

export default class Root extends Component<Props> {
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}
