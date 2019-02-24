import React from "react";

class ControlsPanelTitle extends React.Component {

  renderAction() {
    let result;
    switch (this.props.sketchState) {
      case 'RUNNING':
        result = (
          <button
            className='btnText controlsPanel-title-action'
            onClick={this.props.onPause}
            title='Play'
          >
            <i className='ic-pause-circle'/>
          </button>
        );
        break;
      case 'PAUSED':
        result = (
          <button
            className='btnText controlsPanel-title-action'
            onClick={this.props.onResume}
            title='Resume'
          >
            <i className='ic-play-circle'/>
          </button>
        );
        break;
      default:
        result = null;
    }
    return result;
  }

  render() {
    return (
      <h2 className='controlsPanel-title'>
        CONTROLS
        <div className='controlsPanel-title-actions'>
          {this.renderAction()}
        </div>
      </h2>
    );
  }
}

export default ControlsPanelTitle;