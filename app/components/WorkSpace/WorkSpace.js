import React, { Component, PureComponent } from 'react';
import BoardContainerHOC from '../BoardContainer/BoardManagerHOC';

import compose from '../../utils/compose';
import forwardProps from '../../utils/forward-props';
import AppContext from '../../contexts/AppContext';
import WorkSpaceContext from '../../contexts/WorkSpaceContext';
import withProps from '../../utils/with-props';

import './WorkSpace.scss';

type Props = {
  windowWidth: number,
  windowHeight: number
};

class WorkSpace extends PureComponent<Props> {
  static defaultProps = {
    windowWidth: 0,
    windowHeight: 0
  };

  state = {
    boards: [
      {
        id: 'board-0'
      }
    ],
    createNewBoard: () =>
      this.setState({
        boards: [...this.state.boards, board]
      }),
    removeBoard: boardRef =>
      this.setState({
        boards: this.state.boards.filter(c => c !== boardRef)
      }),
    handleFileDrop: () => {}
  };

  componentDidMount() {
    window.www = this;
    // initiate with one board
    // this.props.createNewBoard();

    // this.props.resize();
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }

  componentWillUpdate() {
    // console.log('workspace updating');
  }

  render() {
    const { leftPanel, rightPanel, boards } = this.state;
    const { windowWidth, windowHeight } = this.props;
    // determine default width and height of boards
    return (
      <div
        className="workspace"
        style={{
          width: windowWidth,
          height: windowHeight
        }}
      >
        {
          // LeftPanel
        }
        {boards.map(store => (
          <BoardContainerHOC
            windowWidth={windowWidth}
            windowHeight={windowHeight}
            key={`${store.id}`}
          />
        ))}
        {
          // RightPanel
        }
      </div>
    );
  }
}

export default compose(
  withProps(
    {
      windowWidth: 0,
      windowHeight: 0
    },
    context => ({
      workspaceCounter: context.workspaceCounter
    })
  ),
  AppContext.withContext,
  WorkSpaceContext.withContext,
  forwardProps
)(WorkSpace);
