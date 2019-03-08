import React from 'react';
import {ChromePicker} from 'react-color';
import Color from '../models/Color';
import PaletteColorPreview from '../colorPreviews/PaletteColorPreview';
import './css/paletteColorPicker.css';

class PaletteColorPicker extends React.PureComponent {

  lastSelectedColorIndex = 0;

  state = {
    selectedColorIndex: 0,
  };

  onChangeComplete = (color) => {
    const newColors = this.props.value.slice();
    newColors.splice(this.state.selectedColorIndex, 1, new Color(color.hex));
    this.props.onChange(newColors);
  };

  onRemove = () => {
    const newColors = this.props.value.slice();
    newColors.splice(this.state.selectedColorIndex, 1);
    if (this.state.selectedColorIndex >= newColors.length) {
      this.setState({selectedColorIndex: this.state.selectedColorIndex - 1});
    }
    this.props.onChange(newColors);
  };

  onAdd = () => {
    const newColors = this.props.value.slice();
    newColors.push(new Color(0xFFFFFF));
    this.props.onChange(newColors);
    this.lastSelectedColorIndex = this.state.selectedColorIndex;
    this.setState({selectedColorIndex: newColors.length - 1});
  };

  render() {
    return (
      <div className='paletteColorPicker'>
        <label className='paletteColorPicker-random'>
          <input
            type='checkbox'
            checked={!!this.props.isRandom}
            onChange={(event) => this.props.onRandomChange(event.target.checked)}
          />
          Random
        </label>
        {
          this.props.isRandom
            ? null
            : (
              <div>
                <PaletteColorPreview
                  value={this.props.value}
                  onClick={(colorIndex) => this.setState({selectedColorIndex: colorIndex})}
                />
                {
                  this.props.value.length > 1 ?
                    (
                      <div className='gradientColorPicker-remove' onClick={this.onRemove}>
                        <i className='gradientColorPicker-remove-icon ic-trash-can'/>
                        DELETE
                      </div>
                    )
                    : null
                }
                <div className='gradientColorPicker-remove' onClick={this.onAdd}>
                  <i className='gradientColorPicker-remove-icon ic-plus'/>
                  ADD A COLOR
                </div>
                <ChromePicker
                  color={(this.props.value[this.state.selectedColorIndex] || this.props.value[this.lastSelectedColorIndex]).hexString}
                  onChangeComplete={this.onChangeComplete}
                  disableAlpha={this.props.disableAlpha}
                />
              </div>
            )
        }
      </div>
    );
  }
}

export default PaletteColorPicker;
