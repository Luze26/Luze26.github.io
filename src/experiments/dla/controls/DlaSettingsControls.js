import React from 'react';
import Slider from 'rc-slider';
import ControlBlock from '../../controls/ControlBlock';

class DlaSettingsControls extends React.Component {

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
        <ControlBlock title='Walkers' value={this.props.config.nbWalkers}>
          <Slider
            className='controlSlider'
            min={1}
            max={4000}
            value={this.props.config.nbWalkers}
            onChange={(nbWalkers) => this.props.onChange({nbWalkers})}
          />
        </ControlBlock>
        <ControlBlock title='Walker Radius' value={this.props.config.radius}>
          <Slider
            className='controlSlider'
            min={1}
            max={40}
            step={0.5}
            value={this.props.config.radius}
            onChange={(radius) => this.props.onChange({radius})}
          />
        </ControlBlock>
        <ControlBlock title='Iterations per rendering' value={this.props.config.stepsPerRender}>
          <Slider
            className='controlSlider'
            min={1}
            max={1000}
            value={this.props.config.stepsPerRender}
            onChange={(stepsPerRender) => this.props.onChange({stepsPerRender})}
          />
        </ControlBlock>
        <ControlBlock title='Stickiness' value={this.props.config.stickiness}>
          <Slider
            className='controlSlider'
            min={0.1}
            max={1}
            step={0.02}
            value={this.props.config.stickiness}
            onChange={(stickiness) => this.props.onChange({stickiness})}
          />
        </ControlBlock>
      </div>
    );
  }
}

export default DlaSettingsControls;