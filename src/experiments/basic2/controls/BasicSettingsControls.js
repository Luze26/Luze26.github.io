import React from 'react';
import Slider from 'rc-slider';
import ControlBlock from '../../controls/ControlBlock';

class BasicSettingsControls extends React.Component {

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
        <ControlBlock title='Nb Rows' value={this.props.config.nbRows}>
          <Slider
            className='controlSlider'
            min={1}
            max={40}
            value={this.props.config.nbRows}
            onChange={(nbRows) => this.props.onChange({nbRows})}
          />
        </ControlBlock>
        <ControlBlock title='Nb Columns' value={this.props.config.nbCols}>
          <Slider
            className='controlSlider'
            min={1}
            max={40}
            value={this.props.config.nbCols}
            onChange={(nbCols) => this.props.onChange({nbCols})}
          />
        </ControlBlock>
        <ControlBlock title='Margin' value={this.props.config.margin}>
          <Slider
            className='controlSlider'
            min={0}
            max={40}
            value={this.props.config.margin}
            onChange={(margin) => this.props.onChange({margin})}
          />
        </ControlBlock>
      </div>
    );
  }
}

export default BasicSettingsControls;