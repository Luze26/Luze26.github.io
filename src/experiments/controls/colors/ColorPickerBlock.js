import React from 'react';
import './css/colorPickerBlock.css';
import SolidColorPreview from './colorPreviews/SolidColorPreview';

class ColorPickerBlock extends React.PureComponent {

  onOk = (value) => {
    if (this.props.value === null || this.props.value.hex !== value.hex) {
      this.props.onChange(value);
    }
  };

  navigateToColorPicker = () => this.props.navigation.navigateTo(
    'COLOR_PICKER',
    {
      title: this.props.title,
      value: this.props.value,
      disableAlpha: this.props.disableAlpha,
      onOk: this.onOk,
    },
  );

  render() {
    return (
      <div className='colorPickerBlock'>
        <div className='colorPickerBlock-content' onClick={this.navigateToColorPicker}>
          <SolidColorPreview value={this.props.value}/>
        </div>
      </div>
    );
  }
}

export default ColorPickerBlock;