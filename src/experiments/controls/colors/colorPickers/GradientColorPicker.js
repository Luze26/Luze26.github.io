import React from 'react';
import GradientPreview from '../colorPreviews/GradientPreview';
import './css/gradientColorPicker.css';
import SolidColorPicker from './SolidColorPicker';
import ColorStop from '../models/ColorStop';

class GradientColorPicker extends React.PureComponent {
  static compareColors = (color1, color2) => color1.offset - color2.offset;

  selectedColorStop = this.props.value[0];
  lastX;
  dragging = false;

  state = {
    selectedColorStop: this.selectedColorStop,
  };

  getColorStopClone = (colorStop) => colorStop.clone();

  getValueClone() {
    return this.props.value.slice().map(this.getColorStopClone);
  }

  onHandleMouseMove = (event) => {
    const tX = event.clientX - this.lastX;
    let offset = this.selectedColorStop.offset + tX / this.refs.handlesContainer.getBoundingClientRect().width;
    offset = Math.min(1, Math.max(0, offset));
    this.lastX = event.clientX;
    if (offset !== this.selectedColorStop.offset) {
      const index = this.props.value.indexOf(this.selectedColorStop);
      if (index >= 0) {
        const newValue = this.getValueClone();
        this.selectedColorStop = newValue[index];
        this.selectedColorStop.offset = offset;
        newValue.sort(GradientColorPicker.compareColors);
        this.setState({selectedColorStop: this.selectedColorStop});
        this.props.onChange(newValue);
      }
    }
  };

  onHandleMouseUp = (event) => {
    event.stopPropagation();
    this.dragging = false;
    document.removeEventListener('mouseup', this.onHandleMouseUp);
    document.removeEventListener('mousemove', this.onHandleMouseMove);
  };

  onHandleMouseDown(event, colorStop) {
    if (this.selectedColorStop !== colorStop) {
      this.selectedColorStop = colorStop;
      this.setState({selectedColorStop: colorStop});
    }
    this.dragging = true;
    this.lastX = event.clientX;
    document.addEventListener('mouseup', this.onHandleMouseUp);
    document.addEventListener('mousemove', this.onHandleMouseMove);
  }

  onAddHandle = (event) => {
    if (this.dragging) {
      return;
    }
    const tX = event.pageX - this.refs.handlesContainer.getBoundingClientRect().x;
    const offset = tX / this.refs.handlesContainer.getBoundingClientRect().width;
    for (let i = 0; i <= this.props.value.length; i++) {
      if (i === this.props.value.length || offset <= this.props.value[i].offset) {
        const newValue = this.getValueClone();
        const newColorStop = new ColorStop(this.props.value[i + (i === 0 ? 1 : -1)].color.clone(), offset);
        newValue.splice(i, 0, newColorStop);
        this.props.onChange(newValue);
        this.selectedColorStop = newColorStop;
        this.setState({selectedColorStop: newColorStop});
        return;
      }
    }
  };

  onRemoveHandle = () => {
    const index = this.props.value.indexOf(this.selectedColorStop);
    if (index >= 0) {
      const newValue = this.props.value.slice();
      newValue.splice(index, 1);
      this.selectedColorStop = newValue[0];
      this.props.onChange(newValue);
      this.setState({selectedColorStop: this.selectedColorStop});
    }
  };

  onColorChange = (color) => {
    const index = this.props.value.indexOf(this.selectedColorStop);
    if (index >= 0) {
      const newValue = this.getValueClone();
      newValue[index].color = color;
      this.selectedColorStop = newValue[index];
      this.setState({selectedColorStop: this.selectedColorStop});
      this.props.onChange(newValue);
    }
  };

  renderHandles() {
    return (
      <div
        className='gradientColorPicker-handles'
        ref='handlesContainer'
        onMouseUp={this.onAddHandle}
      >
        {this.props.value.map((colorStop, index) => (
          <div
            key={index}
            className={
              'gradientColorPicker-handle ' +
              (this.state.selectedColorStop === colorStop ? 'gradientColorPicker-handle_selected' : '')
            }
            style={{left: (colorStop.offset * 100) + '%'}}
            onMouseDown={(event) => this.onHandleMouseDown(event, colorStop)}
          >
            <div className='gradientColorPicker-handle-inner'/>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className='gradientColorPicker'>
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
                <div className='gradientColorPicker-gradient'>
                  <GradientPreview value={this.props.value}/>
                  {this.renderHandles()}
                </div>
                {
                  this.props.value.length > 2 ?
                    (
                      <div className='gradientColorPicker-remove' onClick={this.onRemoveHandle}>
                        <i className='gradientColorPicker-remove-icon ic-trash-can'/>
                        DELETE
                      </div>
                    )
                    : null
                }
                <SolidColorPicker
                  value={this.state.selectedColorStop.color}
                  onChange={this.onColorChange}
                  disableAlpha={this.props.disableAlpha}
                />
              </div>
            )
        }
      </div>
    );
  }
}

export default GradientColorPicker;
