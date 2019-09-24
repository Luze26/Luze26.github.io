import React from 'react';
import ControlBlock from '../controls/ControlBlock';
import ColorPickerBlock from '../controls/colors/ColorPickerBlock';
import ExtendedColorPickerBlock from '../controls/colors/ExtendedColorPickerBlock';
import Slider from 'rc-slider';

class GenericControlsPanel extends React.Component {

  onEditBackgroundColor = () => this.refs.backgroundColorPicker.navigateToColorPicker();

  onEditColors = () => this.refs.colorsPicker.navigateToColorPicker();

  renderControlBlockInput = (controlBlockConfig) => {
    const value = this.props.config[controlBlockConfig.id];
    const onChange = (value) => this.props.onChange({[controlBlockConfig.id]: value});

    let inputElem = null;
    switch (controlBlockConfig.type) {
      case 'COLOR_PICKER':
        inputElem = (
          <ColorPickerBlock
            refs={controlBlockConfig.id}
            navigation={this.props.navigation}
            title={controlBlockConfig.title}
            value={value}
            onChange={onChange}
            {...controlBlockConfig.inputProps}
          />
        );
        break;
      case 'EXTENDED_COLOR_PICKER':
        inputElem = (
          <ExtendedColorPickerBlock
            refs={controlBlockConfig.id}
            navigation={this.props.navigation}
            title={controlBlockConfig.title}
            value={value}
            onChange={onChange}
            {...controlBlockConfig.inputProps}
          />
        );
        break;
      case 'SLIDER':
        inputElem = (
          <Slider
            className='controlSlider'
            value={value}
            onChange={onChange}
            {...controlBlockConfig.inputProps}
          />
        );
        break;
      case 'CHECKBOX':
        inputElem = (
          <label className='controlCheckbox'>
            <input
              type='checkbox'
              checked={!!value}
              onChange={(event) => onChange(event.target.checked)}
            />
            <span className='controlCheckbox-label'>
              {controlBlockConfig.title}
            </span>
          </label>
        );
        break;
    }
    return inputElem;
  };

  renderControlBlock = (controlBlockConfig) => {
    if (controlBlockConfig.isAvailable && !controlBlockConfig.isAvailable(this.props.config)) {
      return null;
    }
    return (
      <ControlBlock
        key={controlBlockConfig.id}
        value={controlBlockConfig.showValue ? this.props.config[controlBlockConfig.id] : ''}
        title={controlBlockConfig.doNotShowTitle ? '' : controlBlockConfig.title}
        editIcon={controlBlockConfig.editIcon}
        onEdit={() => this.refs[controlBlockConfig.id].navigateToColorPicker()}
      >
        {this.renderControlBlockInput(controlBlockConfig)}
      </ControlBlock>
    );
  };

  render() {
    return (
      <div className='overflow-y'>
        {this.props.controlsConfig.controlsBlocks.map(this.renderControlBlock)}
      </div>
    );
  }
}

export default GenericControlsPanel;
