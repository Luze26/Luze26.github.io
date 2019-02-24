import React from 'react';
import './css/colorPreviews.css';

class PaletteColorPreview extends React.PureComponent {

  renderColor = (color, index) => (
    <div
      key={index}
      className='paletteColorPreview-color'
      style={{backgroundColor: color.hexString}}
      onClick={() => this.props.onClick && this.props.onClick(index, color)}
    />
  );

  render() {
    return (
      <div className='paletteColorPreview gradientPreview'>
        {this.props.value.map(this.renderColor)}
      </div>
    );
  }
}

export default PaletteColorPreview;