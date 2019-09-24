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
    let shareUrl = '';
    if (window.location) {
      const queryIndex = window.location.href.indexOf('?');
      shareUrl = queryIndex > 0 ? window.location.href.substring(0, queryIndex) : window.location.href;
    }
    shareUrl += '?config=' + Base64.encode(JSON.stringify(this.props.value));
    return (
      <GenericStackedPanel
        title={this.props.title}
        className='gradientColorPickerPanel'
        onBack={this.onBack}
      >
        <div className='sharePanel-url'>
          <input
            style={{marginBottom: 10}}
            ref='input'
            value={shareUrl}
            readOnly={true}
          />
          <ControlBtn
            icon='ic-copy'
            label='Copy'
            onClick={this.onCopy}
          />
        </div>
      </GenericStackedPanel>
    );
  }
}

export default SharePanel;
