import React from 'react';
import SolidColorPreview from './SolidColorPreview';
import GradientPreview from './GradientPreview';
import ExtendedColor from '../models/ExtendedColor';
import PaletteColorPreview from './PaletteColorPreview';

class ExtendedColorPreview extends React.PureComponent {

  renderContent() {
    let preview;
    switch (this.props.value.mode) {
      case ExtendedColor.MODES.SOLID:
        preview = (
          <SolidColorPreview value={this.props.value.color}/>
        );
        break;
      case ExtendedColor.MODES.PALETTE:
        preview = (
          <PaletteColorPreview value={this.props.value.colors}/>
        );
        break;
      case ExtendedColor.MODES.GRADIENT:
        preview = (
          <GradientPreview value={this.props.value.colorStops}/>
        );
        break;
      default:
        preview = null;
    }
    return preview;
  }

  render() {
    return (
      <div className='extendedColorPreview cursor-pointer'>
        {this.renderContent()}
      </div>
    );
  }
}

export default ExtendedColorPreview;