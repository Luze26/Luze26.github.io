import React from 'react';
import {Base64} from 'js-base64';

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=(.*)|&|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

class GenericExperiment extends React.PureComponent {

  state = {
    sketchState: 'LOADING',
    config: null,
  };
  originalConfig = null;

  componentWillMount() {
    let config;
    const configStr = getParameterByName('config');
    if (configStr !== null) {
      try {
        config = this.props.configModel.fromJsObject(JSON.parse(Base64.decode(configStr)));
      }
      catch (e) {
        console.error(e);
      }
    }
    this.originalConfig = config || this.props.configModel.DEFAULT_CONFIG.clone();
    this.setState({config: this.originalConfig});
  }

  onApply = (config) => this.setState({config: config.clone()});

  onPause = () => this.refs.sketch.pause();

  onResume = () => this.refs.sketch.resume();

  onSketchStateChange = (sketchState) => this.setState({sketchState});

  render() {
    const {SketchComponent, ControlPanelComponent} = this.props;
    return (
      <div
        className={this.props.className || ''}
        style={{backgroundColor: this.props.backgroundColor || this.state.config.backgroundColor.hexString}}
      >
        <SketchComponent
          ref='sketch'
          config={this.state.config}
          onStateChange={this.onSketchStateChange}
        />
        {
          ControlPanelComponent
            ? (
              <ControlPanelComponent
                originalConfig={this.originalConfig}
                onPause={this.onPause}
                onResume={this.onResume}
                onApply={this.onApply}
                sketchState={this.state.sketchState}
              />
            )
            : null
        }
      </div>
    );
  }
}

export default GenericExperiment;