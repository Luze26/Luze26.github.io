import React from 'react';
import {Base64} from 'js-base64';
import GenericStackedPanel from '../GenericStackedPanel';
import ControlBtn from '../ControlBtn';

class SharePanel extends React.PureComponent {

  onBack = () => this.props.navigation.goBack();

  onCopy = () => {
    this.refs.input.select();
    document.execCommand('Copy');
  };

  render() {
    const shareUrl = window.location ? window.location.host + window.location.pathname + '?config=' + Base64.encode(JSON.stringify(this.props.value)) : '';
    return (
      <GenericStackedPanel
        title={this.props.title}
        className='gradientColorPickerPanel'
        onBack={this.onBack}
      >
        <div className='sharePanel-url'>
          <input
            ref='input'
            value={shareUrl}
            readOnly={true}
          />
          <ControlBtn
            icon='ic-copy'
            label=''
            onClick={this.onCopy}
          />
        </div>
      </GenericStackedPanel>
    );
  }
}

export default SharePanel;