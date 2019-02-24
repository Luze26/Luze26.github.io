import React from "react";
import './css/colorPreviews.css';

class SolidColorPreview extends React.PureComponent {

  render() {
    return (
      <div className='solidColorPreview'>
        <div className='solidColorPreview-color' style={{backgroundColor: this.props.value.hexString}}/>
        <div className='solidColorPreview-label'>{this.props.value.hexString}</div>
      </div>
    );
  }
}

export default SolidColorPreview;