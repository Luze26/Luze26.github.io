import React from 'react';
import ControlBtn from './ControlBtn';

class ControlsActions extends React.PureComponent {

  render() {
    return (
      <div className='controls-btns'>
        <ControlBtn
          onClick={this.props.onApply}
          icon='ic-paint-roller'
          label='APPLY'
        />
      </div>
    );
  }
}

export default ControlsActions;