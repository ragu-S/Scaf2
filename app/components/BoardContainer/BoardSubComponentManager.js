import React, { PureComponent } from 'react';

type Props = {
  onClick: (ev: {}) => void
};

const initialState = {
  children: [], // children currently in Workspace
  selectedChildren: [] // refs to selected children
};

export default class BoardSubComponentManager extends PureComponent<Props> {
  state = {
    children: [], // children currently in Workspace
    selectedChildren: [] // refs to selected children
  };

  addChild = componentRef => ({
    children: [...state.children, componentRef]
  });

  removeChild = componentRef => ({
    children: state.children.filter(c => c !== componentRef)
  });

  selectChildren = selectedChildren => ({
    selectedChildren: state.children.filter(c => selectedChildren.includes(c))
  });

  unselectChildren = childrenToUnselect => ({
    selectedChildren: state.selectedChildren.filter(c =>
      childrenToUnselect.includes(c)
    )
  });

  render() {
    const { children } = this.state;
    return children;
  }
}
