import React from 'react';
import './css/imageOverlay.css';

class ImageOverlay extends React.Component {

  render() {
    if (!this.props.image) {
      return null;
    }

    return (
      <div
        className='imageOverlay'
        onClick={(event) => {
          event.stopPropagation();
          this.props.onClose();
        }}
      >
        <img src={this.props.image}/>
      </div>
    );
  }
}

export default ImageOverlay;
