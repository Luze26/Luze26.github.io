import React from 'react';
import TenPrintControlsPanel from './controls/TenPrintControlsPanel';
import GenericExperiment from '../global/GenericExperiment';
import TenPrintConfig from './models/TenPrintConfig';
import TenPrintSketch from './sketch/TenPrintSketch';

class TenPrintExperiment extends React.PureComponent {
  render() {
    return (
      <GenericExperiment
        className='lab-experiment'
        backgroundColor='#FFF'
        configModel={TenPrintConfig}
        SketchComponent={TenPrintSketch}
        ControlPanelComponent={TenPrintControlsPanel}
      />
    );
  }
}

export default TenPrintExperiment;