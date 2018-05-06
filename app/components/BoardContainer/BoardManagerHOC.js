import React, { Component } from 'react';
import BoardContainer from './BoardContainer';

export default class BoardManagerHOC extends Component {
  // default state
  state = {
    id: '',
    children: [], // children currently in Workspace
    selectedChildren: [], // refs to selected children
    parentNode: null,
    imageFiles: [],
    scale: 1,
    width: 0,
    height: 0
  };
  // Actions
  addChild = (Component, props) => {
    // const SubscribedComponent = state.subscribeToCurrentStore(Component);
    this.setState({ children: [...this.state.children, Component] });
  };
  removeChild = componentRef => ({
    children: this.state.children.filter(c => c !== componentRef)
  });
  selectChildren = selectedChildren => ({
    selectedChildren: this.state.children.filter(c =>
      selectedChildren.includes(c)
    )
  });
  unselectChildren = childrenToUnselect => ({
    selectedChildren: this.state.selectedChildren.filter(c =>
      childrenToUnselect.includes(c)
    )
  });
  getParentNode = () => ({
    parentNode: document.getElementById(this.state.id)
  });
  addImageFile = file => ({
    imageFiles: [...imageFiles, file]
  });
  render() {
    return (
      <BoardContainer
        {...this.props}
        addChild={this.addChild}
        removeChild={this.removeChild}
        selectChildren={this.selectChildren}
        unselectChildren={this.unselectChildren}
        getParentNode={this.getParentNode}
        addImageFile={this.addImageFile}
      >
        {this.state.children}
      </BoardContainer>
    );
  }
}
