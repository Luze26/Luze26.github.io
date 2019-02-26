import React from 'react';
import PerlinCharsControlsPanel from './controls/PerlinCharsControlsPanel';
import GenericExperiment from '../global/GenericExperiment';
import PerlinCharsConfig from './models/PerlinCharsConfig';
import PerlinCharsSketch from './sketch/PerlinCharsSketch';

class PerlinCharsExperiment extends React.PureComponent {
  render() {
    return (
      <GenericExperiment
        className='lab-experiment'
        backgroundColor='#FFF'
        configModel={PerlinCharsConfig}
        SketchComponent={PerlinCharsSketch}
        ControlPanelComponent={PerlinCharsControlsPanel}
      />
    );
  }
}

export default PerlinCharsExperiment;