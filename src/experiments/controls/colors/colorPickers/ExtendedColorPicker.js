import React from 'react';
import ExtendedColorPickerTabs from './ExtendedColorPickerTabs';
import SolidColorPicker from './SolidColorPicker';
import GradientColorPicker from './GradientColorPicker';
import ExtendedColor from '../models/ExtendedColor';
import PaletteColorPicker from './PaletteColorPicker';

class ExtendedColorPicker extends React.PureComponent {

  onColorChange = (color) => this.props.onChange(this.props.value.copy({color}));

  onColorsChange = (colors) => this.props.onChange(this.props.value.copy({colors}));

  onColorStopsChange = (colorStops) => this.props.onChange(this.props.value.copy({colorStops}));

  renderPicker() {
    let picker;
    switch (this.props.value.mode) {
      case ExtendedColor.MODES.SOLID:
        picker = (
          <SolidColorPicker
            value={this.props.value.color}
            onChange={this.onColorChange}
            disableAlpha={this.props.disableAlpha}
          />
        );
        break;
      case ExtendedColor.MODES.PALETTE:
        picker = (
          <PaletteColorPicker
            value={this.props.value.colors}
            onChange={this.onColorsChange}
            disableAlpha={this.props.disableAlpha}
          />
        );
        break;
      case ExtendedColor.MODES.GRADIENT:
        picker = (
          <GradientColorPicker
            value={this.props.value.colorStops}
            onChange={this.onColorStopsChange}
          />
        );
        break;
      default:
        picker = null;
    }
    return picker;
  }

  render() {
    return (
      <div className='extendedColorPicker'>
        <ExtendedColorPickerTabs
          value={this.props.value}
          onChange={this.props.onChange}
        />
        {this.renderPicker()}
      </div>
    );
  }
}

export default ExtendedColorPicker;