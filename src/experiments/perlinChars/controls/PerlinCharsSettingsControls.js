import React from 'react';
import Slider from 'rc-slider';
import ControlBlock from '../../controls/ControlBlock';

class PerlinCharsSettingsControls extends React.Component {

  render() {
    return (
      <div>
        <ControlBlock title='String'>
          <input 
            placeholder='String to repeat'
            value={this.props.config.string}
            onChange={(event) => this.props.onChange({string: event.target.value})}
          />
        </ControlBlock>
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
        <ControlBlock title='Margin' value={this.props.config.margin}>
          <Slider
            className='controlSlider'
            min={0}
            max={300}
            value={this.props.config.margin}
            onChange={(margin) => this.props.onChange({margin})}
          />
        </ControlBlock>
        <ControlBlock title='Number of rows' value={this.props.config.nbRows}>
          <Slider
            className='controlSlider'
            min={10}
            max={300}
            value={this.props.config.nbRows}
            onChange={(nbRows) => this.props.onChange({nbRows})}
          />
        </ControlBlock>
        <ControlBlock title='Number of columns' value={this.props.config.nbCols}>
          <Slider
            className='controlSlider'
            min={10}
            max={300}
            value={this.props.config.nbCols}
            onChange={(nbCols) => this.props.onChange({nbCols})}
          />
        </ControlBlock>
        <ControlBlock title='Size' value={this.props.config.size}>
          <Slider
            className='controlSlider'
            min={4}
            max={100}
            value={this.props.config.size}
            onChange={(size) => this.props.onChange({size})}
          />
        </ControlBlock>
        <ControlBlock title='Hidden' value={this.props.config.hiddenChance}>
          <Slider
            className='controlSlider'
            min={0}
            max={0.99}
            step={0.01}
            value={this.props.config.hiddenChance}
            onChange={(hiddenChance) => this.props.onChange({hiddenChance})}
          />
        </ControlBlock>
      </div>
    );
  }
}

export default PerlinCharsSettingsControls;