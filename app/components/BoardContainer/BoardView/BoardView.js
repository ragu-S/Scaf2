import React, { Component } from 'react';
import './BoardView.global.scss';
import noop from '../../../utils/noop';
import { subscribe } from 'react-contextual';

type Props = {
  // onMouseOut: (ev: {}) => void,
  // onMouseMove: (ev: {}) => void,
  // mouseDown: func
  style: {
    x: number,
    y: number,
    scale: number,
    width: number,
    height: number
  }
};

class BoardView extends Component<Props> {
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   const { style } = this.props;
  //   return (
  //     nextProps.style.width !== style.width ||
  //     nextProps.style.height !== style.height ||
  //   );
  // }
  componentWillUnmount() {
    console.log('unmounting boardview');
  }

  transformStyleToCss(style) {
    console.log('setting scale', style.scale);
    // if (isNaN(style.scale)) debugger;
    return {
      transform: `translate(${style.x}px, ${style.y}px) scale(${style.scale})`,
      width: `${style.width}px`,
      height: `${style.height}px`
    };
  }

  render() {
    const { id, style, children } = this.props;
    return (
      <div
        id={id}
        className="boardview"
        style={this.transformStyleToCss(style)}
      >
        {children}
        {/* <Subscribe>{props => props.children}</Subscribe> */}
      </div>
    );
  }
}

BoardView.defaultProps = {
  // onMouseOut: ev => console.log('out', ev),
  // onMouseMove: ev => console.log('move', ev),
  style: {
    width: 0,
    height: 0
  }
};

export default BoardView;
