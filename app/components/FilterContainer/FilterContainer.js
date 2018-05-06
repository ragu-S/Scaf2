import React from 'react';
import './FilterContainer.scss';

type Props = {
  foo: number,
  bar?: string,
};

const FilterContainer = props: Props => {
  return <div {...props}>FilterContainer component</div>;
};

FilterContainer.defaultProps = {};

export default FilterContainer;
