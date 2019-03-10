import React from 'react';
import './css/colorPreviews.css';

class GradientPreview extends React.PureComponent {

  static constructBackgroundStyle(colorStops) {
    const linearGradient = ['linear-gradient(to right'];
    for (let i = 0; i < colorStops.length; i++) {
      linearGradient.push(',');
      linearGradient.push(colorStops[i].color.hexString);
      linearGradient.push(' ');
      linearGradient.push(colorStops[i].offset * 100);
      linearGradient.push('%');
    }
    linearGradient.push(')');
    return linearGradient.join('');
  };

  render() {
    return (
      <div
        className='gradientPreview'
        style={{background: GradientPreview.constructBackgroundStyle(this.props.value)}}
      >
        {
          this.props.isRandom
            ? <div className='paletteColorPreview-random'>Random</div>
            : null
        }
      </div>
    );
  }
}

export default GradientPreview;
