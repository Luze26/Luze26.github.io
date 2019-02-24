import React from 'react';
import './css/colorPickerBlock.css';
import ExtendedColorPreview from './colorPreviews/ExtendedColorPreview';

class ExtendedColorPickerBlock extends React.PureComponent {

  onChange = (value) => {
    if (this.props.value !== value) {
      this.props.onChange(value);
    }
  };

  navigateToColorPicker = () => {
    this.props.navigation.navigateTo(
      'EXTENDED_COLOR_PICKER',
      {
        title: this.props.title,
        value: this.props.value,
        disableAlpha: this.props.disableAlpha,
        onOk: this.onChange,
      },
    );
  };

  render() {
    return (
      <div className='extendedColorPickerBlock'>
        <div className='extendedColorPickerBlock-content' onClick={this.navigateToColorPicker}>
          <ExtendedColorPreview
            value={this.props.value}
            navigation={this.props.navigation}
          />
        </div>
      </div>
    );
  }
}

export default ExtendedColorPickerBlock;