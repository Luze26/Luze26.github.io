import React from 'react';
import {ChromePicker} from 'react-color';
import Color from '../models/Color';

class SolidColorPicker extends React.PureComponent {
  onChangeComplete = (color) => this.props.onChange(new Color(color.hex));

  render() {
    return (
      <ChromePicker
        color={this.props.value.hexString}
        onChangeComplete={this.onChangeComplete}
        disableAlpha={this.props.disableAlpha}
      />
    );
  }
}

export default SolidColorPicker;