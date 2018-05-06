import React, { PureComponent } from 'react';
import './{{name}}.global.scss';

type Props = { /* ... */ };

export default class {{name}} extends PureComponent<Props> {
  static defaultProps = {};

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div
        className="{{className}}"
      >
        {{name}} component
      </div>
    );
  }
}
