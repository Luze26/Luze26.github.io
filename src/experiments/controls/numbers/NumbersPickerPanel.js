import React from "react";
import GenericStackedPanel from '../GenericStackedPanel';
import NumbersPicker from './NumbersPicker';

class NumbersPickerPanel extends React.Component {

  state = {
    value: this.props.value,
  };

  onChange = (value) => this.setState({value});

  onCancel = () => this.props.navigation.goBack();

  onOk = () => {
    this.props.onOk(this.state.value);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <GenericStackedPanel
        title={this.props.title}
        className='numbersPickerPanel'
        onBack={this.onOk}
        onCancel={this.onCancel}
        onOk={this.onOk}
      >
        <NumbersPicker
          value={this.state.value}
          onChange={this.onChange}
        />
      </GenericStackedPanel>
    );
  }
}

export default NumbersPickerPanel;