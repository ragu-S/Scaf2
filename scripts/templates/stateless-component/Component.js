import React from 'react';
import './{{name}}.global.scss';

type Props = {
  foo: number,
  bar?: string,
};

const {{name}} = (props: Props) => {
  return <div {...props}>{{name}} component</div>;
};

{{name}}.defaultProps = {};

export default {{name}};
