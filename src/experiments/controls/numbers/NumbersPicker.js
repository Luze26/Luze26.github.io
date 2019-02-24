import React from 'react';
import Slider from 'rc-slider';
import './css/numbersPicker.css';

class NumbersPicker extends React.Component {

  onChange = (number, index) => {
    const newValue = this.props.value.slice();
    number !== null ? newValue.splice(index, 1, number) : newValue.splice(index, 1);
    this.props.onChange(newValue);
  };

  onAdd = () => {
    const newValue = this.props.value.slice();
    newValue.push(this.props.value[this.props.value.length - 1]);
    this.props.onChange(newValue);
  };

  onRemove = (index) => this.onChange(null, index);

  renderNumberPicker = (number, index) => (
    <div className='numberPicker' key={index}>
      <div className='numberPicker-value'>{number}</div>
      <div className='numberPicker-slider'>
        <Slider
          className='controlSlider'
          min={0.5}
          max={10}
          step={0.5}
          value={number}
          onChange={(value) => this.onChange(value, index)}
        />
      </div>
      <div className='numberPicker-remove'>
        {
          this.props.value.length > 1
            ? (
            <i
              className='ic-trash-can numberPicker-remove-icon opacityHover'
              onClick={() => this.onRemove(index)}
            />
          )
            : null
        }
      </div>
    </div>
  );

  render() {
    return (
      <div className='numbersPicker'>
        {this.props.value.map(this.renderNumberPicker)}
        <div className='numberPicker-add opacityHover' onClick={this.onAdd}>
          <i className='ic-plus'/> Add a number
        </div>
      </div>
    );
  }
}

export default NumbersPicker;