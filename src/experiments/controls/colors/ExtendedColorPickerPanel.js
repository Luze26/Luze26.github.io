import React from 'react';
import GenericStackedPanel from '../GenericStackedPanel';
import ExtendedColorPicker from './colorPickers/ExtendedColorPicker';

class ExtendedColorPickerPanel extends React.PureComponent {

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
        className='gradientColorPickerPanel'
        onBack={this.onOk}
        onCancel={this.onCancel}
        onOk={this.onOk}
      >
        <ExtendedColorPicker
          value={this.state.value}
          onChange={this.onChange}
        />
      </GenericStackedPanel>
    );
  }
}

export default ExtendedColorPickerPanel;