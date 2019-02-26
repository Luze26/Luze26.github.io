import React from 'react';
import ControlBlock from '../../controls/ControlBlock';
import ColorPickerBlock from '../../controls/colors/ColorPickerBlock';
import ExtendedColorPickerBlock from '../../controls/colors/ExtendedColorPickerBlock';

class PerlinCharsColorControls extends React.Component {

  onEditBackgroundColor = () => this.refs.backgroundColorPicker.navigateToColorPicker();

  onEditColors = () => this.refs.colorsPicker.navigateToColorPicker();

  render() {
    return (
      <div className='overflow-y'>
        <ControlBlock
          title='Background Color'
          editIcon={true}
          onEdit={this.onEditBackgroundColor}
        >
          <ColorPickerBlock
            ref='backgroundColorPicker'
            navigation={this.props.navigation}
            title='Background Color'
            value={this.props.config.backgroundColor}
            onChange={(backgroundColor) => this.props.onChange({backgroundColor})}
            disableAlpha={true}
          />
        </ControlBlock>
        <ControlBlock
          title='Colors'
          editIcon={true}
          onEdit={this.onEditColors}
        >
          <ExtendedColorPickerBlock
            ref='colorsPicker'
            navigation={this.props.navigation}
            title='Colors'
            value={this.props.config.colors}
            onChange={(colors) => this.props.onChange({colors})}
            disableAlpha={true}
          />
        </ControlBlock>
      </div>
    );
  }
}

export default PerlinCharsColorControls;