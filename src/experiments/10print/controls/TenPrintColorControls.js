import React from 'react';
import ControlBlock from '../../controls/ControlBlock';
import ColorPickerBlock from '../../controls/colors/ColorPickerBlock';
import ExtendedColorPickerBlock from '../../controls/colors/ExtendedColorPickerBlock';
import Slider from 'rc-slider';

class TenPrintColorControls extends React.Component {

  onEditBackgroundColor = () => this.refs.backgroundColorPicker.navigateToColorPicker();

  onEditLinesColor = () => this.refs.linesColorPicker.navigateToColorPicker();

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
          title='Lines Color'
          editIcon={true}
          onEdit={this.onEditLinesColor}
        >
          <ExtendedColorPickerBlock
            ref='linesColorPicker'
            navigation={this.props.navigation}
            title='Lines Color'
            value={this.props.config.colors}
            onChange={(colors) => this.props.onChange({colors})}
            disableAlpha={true}
          />
        </ControlBlock>
        <ControlBlock title='Lines Color Attribute'>
          <select
            value={this.props.config.colorsAttribute}
            onChange={(event) => this.props.onChange({colorsAttribute: event.target.value})}
          >
            <option value='VERTICAL'>Vertical</option>
            <option value='HORIZONTAL'>Horizontal</option>
            <option value='DIAGONAL_1'>Diagonal Left -> Right</option>
            <option value='DIAGONAL_2'>Diagonal Right -> Left</option>
            <option value='RADIAL'>Radial</option>
          </select>
        </ControlBlock>
        <ControlBlock title='Stroke Width' value={this.props.config.strokeWidth}>
          <Slider
            className='controlSlider'
            min={1}
            max={20}
            value={this.props.config.strokeWidth}
            onChange={(strokeWidth) => this.props.onChange({strokeWidth})}
          />
        </ControlBlock>
        <ControlBlock title='Cell Width' value={this.props.config.cellWidth}>
          <Slider
            className='controlSlider'
            min={5}
            max={50}
            value={this.props.config.cellWidth}
            onChange={(cellWidth) => this.props.onChange({cellWidth})}
          />
        </ControlBlock>
        <ControlBlock title='Cell Height' value={this.props.config.cellHeight}>
          <Slider
            className='controlSlider'
            min={5}
            max={50}
            value={this.props.config.cellHeight}
            onChange={(cellHeight) => this.props.onChange({cellHeight})}
          />
        </ControlBlock>
        <ControlBlock title='Line Cap'>
          <select
            value={this.props.config.lineCap}
            onChange={(event) => this.props.onChange({lineCap: event.target.value})}
          >
            <option value='butt'>Butt</option>
            <option value='round'>Round</option>
            <option value='square'>Square</option>
          </select>
        </ControlBlock>
      </div>
    );
  }
}

export default TenPrintColorControls;