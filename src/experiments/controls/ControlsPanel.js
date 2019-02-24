import React from 'react';
import './css/controlsPanel.css';
import './css/controlSlider.css';

class ControlsPanel extends React.PureComponent {

  render() {
    return (
      <div className='controlsPanel'>
        {this.props.children}
      </div>
    );
  }
}

export default ControlsPanel;