import React from 'react';
import './css/controlsBtns.css';

class ControlBtn extends React.PureComponent {

  render() {
    return (
      <button className='controls-btn' onClick={this.props.onClick}>
        {
          this.props.icon
            ? <i className={'controls-btn-icon ' + this.props.icon}/>
            : null
        }
        {this.props.label}
      </button>
    );
  }
}

export default ControlBtn;