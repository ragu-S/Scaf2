import React, { PureComponent } from 'react';
import './BoardContainer.global.scss';
import BoardView from './BoardView/BoardView';
import interact from 'interactjs';
import ImageContainer from '../ImageContainer/ImageContainer';
import { Subscribe, subscribe } from 'react-contextual';
import uuidv1 from 'uuid/v1';
import throttle from 'lodash.throttle';

import { saveToTempFolder } from '../../utils/electron-utils';
import isAcceptedFileTypes from '../../utils/isAcceptedFileTypes';
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

type Props = {
  onClick: (ev: {}) => void
};

const HEADER_MARGIN = 50;
const SCALE_INCREMENTS = 0.05;

// @subscribe()
export default class BoardContainer extends PureComponent<Props> {
  static defaultProps = {
    onClick: ev => console.log('click', ev),
    windowWidth: 0,
    windowHeight: 0
  };
  state = {
    style: {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      scale: 1
    },
    snapGrid: { x: 30, y: 30 },
    gridCount: 100
  };
  zoomInWheelDeltas = [];
  zoomOutWheelDeltas = [];
  zoomInEvents = [];
  zoomOutEvents = [];

  componentWillMount() {
    window.bbb = this;
    const width = this.props.windowWidth;
    const height = (this.props.windowHeight - HEADER_MARGIN) * 0.66;
    this.setState({
      style: {
        ...this.state.style,
        width,
        height
      },
      snapGrid: {
        x: 30,
        y: 30
      }
    });
  }

  componentDidMount() {
    window.iii = this;
    this.interactRef = interact(this.container)
      .resizable({
        edges: { left: false, right: false, bottom: true, top: true },
        restrictEdges: {
          outer: 'parent',
          endOnly: true
        },
        restrictSize: {
          min: { width: 100, height: 50 }
        }
        // inertia: false
      })
      .on('resizemove', this.handleResize);

    // attach mouse wheel/pinch zoom event handlers
    // this.container.addEventListener('wheel', this.handleWheelEvent);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('boarder container being replaced');
    if (
      nextProps.windowWidth !== this.props.windowWidth ||
      nextProps.windowHeight !== this.props.windowHeight
    ) {
      this.setState({
        style: {
          ...this.state.style,
          width: nextProps.windowWidth,
          height: Math.min(nextProps.windowHeight, nextState.style.height)
        }
      });
    }
  }

  componentWillUnmount() {
    console.log('unmounting boardcontainer');
    this.interactRef.off('resizemove', this.handleResize);
    // this.container.removeEventListener('wheel', this.handleWheelEvent);
  }

  handleResize = ev => {
    console.log('resizing', ev.rect);
    this.setState({
      style: {
        ...this.state.style,
        width: ev.rect.width,
        height: ev.rect.height
      }
    });
  };

  handleZoomIn = ev => {
    const { x, y, width, height, scale } = this.state.style;
    // console.log(scale);
    // const dScale = scale + SCALE_INCREMENTS;
    const dScale = scale + SCALE_INCREMENTS; //Math.abs(ev.nativeEvent.deltaY) * scale;
    // const widthDiff = width * scale;
    // const heightDiff = height * scale;
    this.zoomInWheelDeltas.push(ev.nativeEvent.deltaY);
    this.setState({
      style: {
        x,
        y,
        width,
        height,
        scale: dScale
      }
    });
  };

  handleZoomOut = ev => {
    // const scale = this.state.scale - SCALE_INCREMENTS;
    const { x, y, width, height, scale } = this.state.style;
    // const dScale = scale - SCALE_INCREMENTS;
    // const dScale = Math.abs(ev.nativeEvent.deltaY) * scale;
    const dScale = scale - SCALE_INCREMENTS;
    // const widthDiff = width * scale;
    // const heightDiff = height * scale;
    this.zoomOutWheelDeltas.push(ev.nativeEvent.deltaY);
    this.setState({
      width: 0,
      height: 0,
      style: {
        width,
        height,
        x,
        y,
        scale: dScale
      }
    });
  };

  handleWheelEventUnthrottled = ev => {
    ev.preventDefault();
    ev.persist();

    // mac pinch zoom wheel event
    if (ev.ctrlKey) this.handleWheelEventThrottled(ev);
    // center zoom transform to this point
  };

  handleWheelEventThrottled = throttle(ev => {
    console.log(ev);
    const { clientX, clientY, deltaY } = ev;
    if (deltaY === 0) return;
    // console.log(clientX, clientY, deltaY);

    // check if deltaY is positive for zoom out, negative for zoom in
    if (deltaY >= 0) {
      this.handleZoomOut(ev);
    } else {
      this.handleZoomIn(ev);
    }
  }, 150);

  addChildCompnent = type => {
    const uniqueId = uuidv1();
    this.props.actions.addChild(
      <ImageContainer
        id={uniqueId}
        key={uniqueId}
        parentId={this.props.id}
        snapGrid={this.state.snapGrid}
      />
    );
    // switch(type) {
    //   case 'image':
    //     actions.addChild(<ImageContainer />)
    //     return;
    // }
  };

  handleDrop = ev => {
    ev.preventDefault();
    const { files } = ev.dataTransfer;
    if (isAcceptedFileTypes(files, acceptedFileTypes)) {
      // add file to store
      console.log('adding accepted file to store', files);
      // this.props.actions.addImageFile(files[0]);
      // saveToTempFolder(files[0].name);
      const uniqueId = uuidv1();
      // const { width, height } = this.state.style;
      // const Component = ImageContainer;//this.props.subscribeToStore(ImageContainer);
      this.props.actions.addChild(
        <ImageContainer // x={(width - 200) / 2}
          // y={(height - 200) / 2}
          // width={200}
          // height={200}
          parentDimensions={this.state.style}
          snapGrid={this.state.snapGrid}
          // scale={1}
          src={files[0].path}
          id={uniqueId}
          key={uniqueId}
          parentId={this.props.id}
        />
      );
    } else console.warn('unacceptable file type', files);
  };

  handleDragOver = ev => {
    ev.preventDefault();
  };

  render() {
    const { style } = this.state;
    const { id } = this.props;
    return (
      <div
        className="board-container"
        ref={el => (this.container = el)}
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
        onWheel={this.handleWheelEventUnthrottled}
        style={{ width: `${style.width}px`, height: `${style.height}px` }}
      >
        <BoardView id={id} style={style}>
          {this.props.children}
        </BoardView>
      </div>
    );
  }
}
