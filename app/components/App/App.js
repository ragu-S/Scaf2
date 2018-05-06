// @flow
import React, { Fragment } from 'react';
// import { Provider } from 'react-contextual';
import { withContext } from '../../contexts/AppContext';
import compose from '../../utils/compose';
import forwardProps from '../../utils/forward-props';
import './App.global.scss';

type Props = {
  children: React.Node
};

class App extends React.Component<Props> {
  props: Props;

  componentDidMount() {
    window.addEventListener('resize', this.props.resize);
    this.props.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.resize);
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default compose(withContext, forwardProps)(App);
