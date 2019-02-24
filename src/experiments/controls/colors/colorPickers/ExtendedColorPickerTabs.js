import React from 'react';
import './css/extendedColorPicker.css';
import GradientPreview from '../colorPreviews/GradientPreview';
import ExtendedColor from '../models/ExtendedColor';
import PaletteColor from '../models/PaletteColor';
import GradientColor from '../models/GradientColor';
import ColorStop from '../models/ColorStop';
import SolidColor from '../models/SolidColor';
import PaletteColorPreview from '../colorPreviews/PaletteColorPreview';
import Color from '../models/Color';

class ExtendedColorPickerTabs extends React.PureComponent {

  static getColorStopsFromLastMode(lastValue) {
    const colorStops = lastValue.color
      ? [new ColorStop(lastValue.color.clone(), 0), new ColorStop(lastValue.color.negative(), 1)]
      : lastValue.colors.map((color, index) => new ColorStop(color.clone(), index / lastValue.colors.length));
    if (colorStops.length < 2) {
      colorStops.push(new ColorStop(new Color(0xFFFFFF), 1));
    }
    return colorStops;
  }

  static getColorsFromLastMode(lastValue) {
    return lastValue.color
      ? [lastValue.color]
      : lastValue.colorStops.map((colorStop) => colorStop.color);
  }

  lastValues = {};

  switchToColorMode = () => {
    if (this.props.value.mode !== ExtendedColor.MODES.SOLID) {
      this.lastValues[this.props.value.mode] = this.props.value;
      const newValue = this.lastValues[ExtendedColor.MODES.SOLID]
        ? this.lastValues[ExtendedColor.MODES.SOLID].clone()
        : new SolidColor(
          this.props.value.colorStops
            ? this.props.value.colorStops[0].color.clone()
            : this.props.value.colors[0].clone(),
        );
      this.props.onChange(newValue);
    }
  };

  switchToPaletteMode = () => {
    if (this.props.value.mode !== ExtendedColor.MODES.PALETTE) {
      this.lastValues[this.props.value.mode] = this.props.value;
      const newValue = this.lastValues[ExtendedColor.MODES.PALETTE]
        ? this.lastValues[ExtendedColor.MODES.PALETTE].clone()
        : new PaletteColor(ExtendedColorPickerTabs.getColorsFromLastMode(this.props.value), this.props.value.attribute || 'DEFAULT');
      this.props.onChange(newValue);
    }
  };

  switchToGradientMode = () => {
    if (this.props.value.mode !== ExtendedColor.MODES.GRADIENT) {
      this.lastValues[this.props.value.mode] = this.props.value;
      const newValue = this.lastValues[ExtendedColor.MODES.GRADIENT]
        ? this.lastValues[ExtendedColor.MODES.GRADIENT].clone()
        : new GradientColor(ExtendedColorPickerTabs.getColorStopsFromLastMode(this.props.value), this.props.value.attribute || 'DEFAULT');
      this.props.onChange(newValue);
    }
  };

  render() {
    return (
      <div className='extendedColorPicker-modes'>
        <div
          className={
            'extendedColorPicker-mode extendedColorPicker-mode_solid ' +
            (this.props.value.mode === ExtendedColor.MODES.SOLID ? 'extendedColorPicker-mode_selected' : 'extendedColorPicker-mode_unselected')
          }
          onClick={this.switchToColorMode}
        >
          <div
            className='extendedColorPicker-mode-preview'
            style={{
              backgroundColor: this.props.value.color
                ? this.props.value.color.hexString
                : (this.lastValues[ExtendedColor.MODES.SOLID] ? this.lastValues[ExtendedColor.MODES.SOLID].color.hexString : '#FFF'),
            }}
          />
          SOLID
        </div>
        <div
          className={
            'extendedColorPicker-mode extendedColorPicker-mode_palette ' +
            (this.props.value.mode === ExtendedColor.MODES.PALETTE ? 'extendedColorPicker-mode_selected' : 'extendedColorPicker-mode_unselected')
          }
          onClick={this.switchToPaletteMode}
        >
          <div className='extendedColorPicker-mode-preview'>
            <PaletteColorPreview
              value={
                this.props.value.colors ||
                (
                  this.lastValues[ExtendedColor.MODES.PALETTE]
                    ? this.lastValues[ExtendedColor.MODES.PALETTE].colors
                    : ExtendedColorPickerTabs.getColorsFromLastMode(this.props.value)
                )
              }
            />
          </div>
          PALETTE
        </div>
        <div
          className={
            'extendedColorPicker-mode extendedColorPicker-mode_gradient ' +
            (this.props.value.mode === ExtendedColor.MODES.GRADIENT ? 'extendedColorPicker-mode_selected' : 'extendedColorPicker-mode_unselected')
          }
          onClick={this.switchToGradientMode}
        >
          <div className='extendedColorPicker-mode-preview'>
            <GradientPreview
              value={
                this.props.value.colorStops ||
                (
                  this.lastValues[ExtendedColor.MODES.GRADIENT]
                    ? this.lastValues[ExtendedColor.MODES.GRADIENT].colorStops
                    : ExtendedColorPickerTabs.getColorStopsFromLastMode(this.props.value)
                )
              }
            />
          </div>
          GRADIENT
        </div>
      </div>
    );
  }
}

export default ExtendedColorPickerTabs;