import React from 'react';
import './ImageBox.global.scss';

type Props = {
  src: string,
  onLoad: ev => void
};

const ImageBox = (props: Props) => {
  return <img className="image-box" {...props} />;
};

ImageBox.defaultProps = {
  src: '',
  onLoad: f => console.log('image loaded')
};

export default ImageBox;
