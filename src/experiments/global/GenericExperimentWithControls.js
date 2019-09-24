import React from 'react';
import GenericExperiment from './GenericExperiment';
import GenericControlsPanelStack from './GenericControlsPanelStack';

class GenericExperimentWithControls extends React.Component {

  render() {
    return (
      <GenericExperiment
        className={'lab-experiment ' + (this.props.className || '')}
        backgroundColor={this.props.backgroundColor || '#FFF'}
        configModel={this.props.configModel}
        controlsConfig={this.props.controlsConfig}
        SketchComponent={this.props.SketchComponent}
        ControlPanelComponent={GenericControlsPanelStack}
      />
    );
  }
}

export default GenericExperimentWithControls;
