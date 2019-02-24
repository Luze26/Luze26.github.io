import React from 'react';
import ControlBtn from './ControlBtn';
import './css/genericStackedPanel.css';

class GenericStackedPanel extends React.PureComponent {

  renderActions() {
    let actions = null;
    if (this.props.onOk || this.props.onCancel) {
      actions = (
        <div className='genericStackedPanel-actions controls-btns'>
          {
            this.props.onCancel
              ? <ControlBtn onClick={this.props.onCancel} label='CANCEL'/>
              : null
          }
          {
            this.props.onOk
              ? <ControlBtn onClick={this.props.onOk} label='OK'/>
              : null
          }
        </div>
      );
    }
    return actions;
  }

  render() {
    return (
      <div className={'genericStackedPanel ' + (this.props.className || '')}>
        <h2 className='genericStackedPanel-title controlsPanel-title'>
          <i className='ic-arrow-thin-left genericStackedPanel-title-icon' onClick={this.props.onBack}/>
          {this.props.title}
        </h2>
        <div className='genericStackedPanel-content overflow-y'>
          {this.props.children}
        </div>
        {this.renderActions()}
      </div>
    );
  }
}

export default GenericStackedPanel;