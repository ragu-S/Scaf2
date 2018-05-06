import React, { PureComponent, Component } from 'react';
import ImageBox from './ImageBox/ImageBox';
import interact from 'interactjs';
import { subscribe } from 'react-contextual';
import './ImageContainer.global.scss';

type Props = {
  snapGrid: { x: number, y: number }
};

export default class ImageContainer extends PureComponent<Props> {
  static defaultProps = {
    snapGrid: { x: 0, y: 0 },
    width: 0,
    height: 0
  };

  constructor(props) {
    super(props);

    const { parentDimensions } = props;
    const smallestDimension = Math.max(
      Math.min(parentDimensions.width, parentDimensions.height) * 0.5,
      100
    );

    const { x, y } = this.centeredCoords(
      {
        width: smallestDimension,
        height: smallestDimension
      },
      parentDimensions
    );

    this.state = {
      style: {
        width: `${smallestDimension}px`,
        height: `${smallestDimension}px`,
        transform: `scale(${1}) translate(${x}px, ${y}px)`
      },
      scale: 1,
      x,
      y
    };
  }

  centeredCoords(child = { width: 0, height: 0, x: 0, y: 0 }, parent) {
    const { x = 0, y = 0, width, height } = parent;
    return {
      x: (width - child.width) / 2 + x,
      y: (height - child.height) / 2 + y
    };
  }

  async componentDidMount() {
    window.iii = this;
    console.log('mounting again');
    const { snapGrid, parentId } = this.props;
    // await actions.getParentNode();

    // console.log(this.props.parentNode);
    const parent = document.getElementById(parentId);
    this.interactRef = interact(this.container)
      .draggable({
        snap: {
          targets: [interact.createSnapGrid(snapGrid)],
          range: Infinity,
          relativePoints: [{ x: 0, y: 0 }]
        },
        inertia: true,
        restrict: {
          restriction: parent,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        }
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        restrictEdges: {
          outer: parent,
          endOnly: true
        },
        restrictSize: {
          min: { width: 100, height: 50 }
        }
        // inertia: false
      })
      .on('resizemove', this.handleResize)
      .on('dragmove', this.handleDragMove);
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {
    console.log('unmounting el');
    // this.interactRef.off('resizemove', this.handleResize);
  }

  handleDragMove = ev => {
    const { dx, dy } = ev;
    const { style } = this.state;
    const x = this.state.x + dx;
    const y = this.state.y + dy;

    this.setState({
      x,
      y,
      style: {
        width: style.width,
        height: style.height,
        transform: `scale(${this.state.scale}) translate(${x}px, ${y}px)`
      }
    });
  };

  handleResize = ev => {
    console.log('resizing', ev);
    const {
      deltaRect: { left, top }
    } = ev;
    const x = this.state.x + left;
    const y = this.state.y + top;
    this.setState({
      style: {
        transform: `scale(${this.state.scale}) translate(${x}px, ${y}px)`,
        width: `${ev.rect.width}px`,
        height: `${ev.rect.height}px`
      },
      x,
      y
    });
  };

  handleOnLoad = ev => {
    const img = ev.target;
    const { naturalWidth, naturalHeight } = img;
    console.log(img.naturalWidth, img.naturalHeight);
    const { parentDimensions } = this.props;
    const smallestDimension = Math.max(
      Math.min(parentDimensions.width, parentDimensions.height) * 0.5,
      100
    );
    console.log(smallestDimension);
    const imgResized =
      naturalWidth > naturalHeight
        ? {
            width: smallestDimension * naturalWidth / naturalHeight,
            height: smallestDimension
          }
        : {
            width: smallestDimension,
            height: smallestDimension * naturalHeight / naturalWidth
          };

    const { x, y } = this.centeredCoords(imgResized, parentDimensions);

    this.setState({
      style: {
        width: `${imgResized.width}px`,
        height: `${imgResized.height}px`,
        transform: `scale(${1}) translate(${x}px, ${y}px)`
      },
      scale: 1,
      x,
      y
    });
  };

  render() {
    const { id, src } = this.props;
    const { style } = this.state;
    return (
      <div
        id={id}
        className="image-container"
        ref={el => (this.container = el)}
        style={style}
      >
        <ImageBox src={src} onLoad={this.handleOnLoad} />
      </div>
    );
  }
}
