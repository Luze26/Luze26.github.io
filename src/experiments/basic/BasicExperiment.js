import React from 'react';
import GenericExperiment from '../global/GenericExperiment';
import BasicConfig from './models/BasicConfig';
import BasicSketch from './sketch/BasicSketch';
import BasicControlsPanel from './controls/BasicControlsPanel';

class BasicExperiment extends React.PureComponent {
  render() {
    return (
      <GenericExperiment
        className='dlaExperiment'
        backgroundColor='#FFF'
        configModel={BasicConfig}
        SketchComponent={BasicSketch}
        ControlPanelComponent={BasicControlsPanel}
      />
    );
  }
}

export default BasicExperiment;