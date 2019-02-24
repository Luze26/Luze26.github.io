import React from "react";
import './css/numbesBlock.css';

class NumbersBlock extends React.Component {

  onOk = (value) => {
    if (this.props.value === null || JSON.stringify(this.props.value) !== JSON.stringify(value)) {
      this.props.onChange(value);
    }
  };

  navigateToNumbersPicker = () => this.props.navigation.navigateTo(
    'NUMBERS_PICKER',
    {
      title: this.props.title,
      value: this.props.value,
      onOk: this.onOk,
    },
  );

  renderNumber = (number, index) => <div
    key={index}
    className='numbersBlock-number'
    style={{width: number, height: number}}
  />;

  render() {
    return (
      <div className='numbersBlock' onClick={this.navigateToNumbersPicker}>
        {this.props.value.map(this.renderNumber)}
      </div>
    );
  }
}

export default NumbersBlock;