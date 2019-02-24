import React from 'react';
import ControlBlock from '../../controls/ControlBlock';
import ColorPickerBlock from '../../controls/colors/ColorPickerBlock';
import ExtendedColorPickerBlock from '../../controls/colors/ExtendedColorPickerBlock';
import NumbersBlock from '../../controls/numbers/NumbersBlock';

class DlaColorControls extends React.Component {

  onEditBackgroundColor = () => this.refs.backgroundColorPicker.navigateToColorPicker();

  onEditCirclesColor = () => this.refs.circlesColorPicker.navigateToColorPicker();

  onEditShapeSizes = () => this.refs.shapeSizesPicker.navigateToNumbersPicker();

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
          title='Circles Color'
          editIcon={true}
          onEdit={this.onEditCirclesColor}
        >
          <ExtendedColorPickerBlock
            ref='circlesColorPicker'
            navigation={this.props.navigation}
            title='Circles Color'
            value={this.props.config.colors}
            onChange={(colors) => this.props.onChange({colors})}
            disableAlpha={true}
          />
        </ControlBlock>
        <ControlBlock title='Shape'>
          <select
            value={this.props.config.shape}
            onChange={(event) => this.props.onChange({shape: event.target.value})}
          >
            <option value='CIRCLE'>CIRCLE</option>
            <option value='TRIANGLE 1'>TRIANGLE 1</option>
            <option value='TRIANGLE 2'>TRIANGLE 2</option>
            <option value='SQUARE'>SQUARE</option>
          </select>
        </ControlBlock>
        <ControlBlock
          title='Shape Sizes'
          editIcon={true}
          onEdit={this.onEditShapeSizes}
        >
          <NumbersBlock
            ref='shapeSizesPicker'
            navigation={this.props.navigation}
            title='Shape Sizes'
            value={this.props.config.shapeSizes}
            onChange={(shapeSizes) => this.props.onChange({shapeSizes})}
          />
        </ControlBlock>
      </div>
    );
  }
}

export default DlaColorControls;