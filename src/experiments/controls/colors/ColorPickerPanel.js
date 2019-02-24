import React from 'react';
import GenericStackedPanel from '../GenericStackedPanel';
import SolidColorPicker from './colorPickers/SolidColorPicker';

class ColorPickerPanel extends React.PureComponent {

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
        className='colorPickerPanel'
        onBack={this.onOk}
        onCancel={this.onCancel}
        onOk={this.onOk}
      >
        <SolidColorPicker
          value={this.state.value}
          onChange={this.onChange}
          disableAlpha={this.props.disableAlpha}
        />
      </GenericStackedPanel>
    );
  }
}

export default ColorPickerPanel;