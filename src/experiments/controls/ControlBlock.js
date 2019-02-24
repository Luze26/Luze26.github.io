import React from 'react';
import './css/controlsBlock.css';

class ControlBlock extends React.PureComponent {

  render() {
    return (
      <div className='controlBlock'>
        <h5 className='controlBlock-title'>
          {this.props.title}
          {
            this.props.value !== undefined
              ? <div className='controlBlock-title-right'>{this.props.value}</div>
              : null
          }
          {
            this.props.editIcon
              ? (
              <div className='controlBlock-title-right'>
                <i title='Edit' className='ic-write controlBlock-title-right-icon opacityHover' onClick={this.props.onEdit}/>
              </div>
            )
              : null
          }
        </h5>
        <div className='controlBlock-content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ControlBlock;