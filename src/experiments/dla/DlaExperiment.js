import React from 'react';
import './css/dlaExperiment.css';
import DlaSketch from './sketch/DlaSketch';
import DlaControlsPanel from './controls/DlaControlsPanel';
import GenericExperiment from '../global/GenericExperiment';
import DlaConfig from './models/DlaConfig';

class DlaExperiment extends React.PureComponent {
  render() {
    return (
      <GenericExperiment
        className='dlaExperiment'
        configModel={DlaConfig}
        SketchComponent={DlaSketch}
        ControlPanelComponent={DlaControlsPanel}
      />
    );
  }
}

export default DlaExperiment;