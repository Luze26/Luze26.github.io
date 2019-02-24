import React from 'react';
import Slider from 'rc-slider';
import ControlBlock from '../../controls/ControlBlock';

class TenPrintSettingsControls extends React.Component {

  render() {
    return (
      <div>
        <ControlBlock title='Width' value={this.props.config.width}>
          <Slider
            className='controlSlider'
            min={100}
            max={1200}
            value={this.props.config.width}
            onChange={(width) => this.props.onChange({width})}
          />
        </ControlBlock>
        <ControlBlock title='Height' value={this.props.config.height}>
          <Slider
            className='controlSlider'
            min={100}
            max={1200}
            value={this.props.config.height}
            onChange={(height) => this.props.onChange({height})}
          />
        </ControlBlock>
      </div>
    );
  }
}

export default TenPrintSettingsControls;