import React from 'react';
import colorUtils from '../../controls/colors/utils/ColorUtils';
import ExtendedColor from '../../controls/colors/models/ExtendedColor';

class TenPrintSketch extends React.PureComponent {

  animationFrameRequestId = null;

  componentDidMount() {
    console.log('[10Print SKETCH] INIT');
    this.setupScene();
  }

  componentDidUpdate() {
    console.log('[10Print SKETCH] UPDATE');
    cancelAnimationFrame(this.animationFrameRequestId);
    const canvas = this.refs.canvas;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    this.setupScene();
  }

  pause() {
    console.log('[10Print SKETCH] PAUSE');
    cancelAnimationFrame(this.animationFrameRequestId);
    this.props.onStateChange('PAUSED');
  }

  resume() {
    console.log('[10Print SKETCH] RESUME');
    this.props.onStateChange('RUNNING');
    this.animationFrameRequestId = requestAnimationFrame(this.onAnimationFrame);
  }

  setupScene() {
    const canvas = this.refs.canvas;
    canvas.width = this.props.config.width;
    canvas.height = this.props.config.height;
    this.ctx = canvas.getContext('2d');
    this.init();
  }

  init() {
    this.data = [];
    this.y = 0;
    this.props.onStateChange('RUNNING');
    this.animationFrameRequestId = requestAnimationFrame(this.onAnimationFrame);
  }

  getAttributePercent(x, y) {
    let attributePercent = 0;
    switch (this.props.config.colorsAttribute) {
      case 'VERTICAL':
        attributePercent = y / this.props.config.height;
        break;
      case 'HORIZONTAL':
        attributePercent = x / this.props.config.width;
        break;
      case 'DIAGONAL_1':
        attributePercent = (x + y) / (this.props.config.width + this.props.config.height);
        break;
      case 'DIAGONAL_2':
        attributePercent = ((this.props.config.width - x) + y) / (this.props.config.width + this.props.config.height);
        break;
      case 'RADIAL':
        attributePercent = (Math.abs(this.props.config.width / 2 - x) + Math.abs(this.props.config.height / 2 - y)) / (this.props.config.width / 2 + this.props.config.height / 2);
        break;
    }
    return attributePercent;
  }

  getColor(x, y) {
    let color;
    const colorsConfig = this.props.config.colors;
    switch (colorsConfig.mode) {
      case ExtendedColor.MODES.SOLID:
        color = colorsConfig.color.hexString;
        break;
      case ExtendedColor.MODES.PALETTE:
        color = colorUtils.getPaletteColor(colorsConfig.colors, this.getAttributePercent(x, y)).hexString;
        break;
      case ExtendedColor.MODES.GRADIENT:
        color = colorUtils.getHexStringFromHex(
          colorUtils.getGradientColor(colorsConfig.colorStops, this.getAttributePercent(x, y)),
        );
        break;
      default:
        color = 0;
    }
    return color;
  }

  onAnimationFrame = () => {
    const {width, height, cellWidth, cellHeight} = this.props.config;
    const {y, ctx} = this;

    this.data[y] = this.data[y] || [];
    for (let x = 0; x < width; x += cellWidth) {
      const forceFalseAngle = y > 0 && x > 0 && this.data[y - cellHeight][x - cellWidth] && !this.data[y][x - cellWidth] && !this.data[y - cellHeight][x];
      const angle = forceFalseAngle ? false : Math.random() >= 0.5;
      this.data[y][x] = angle;

      ctx.beginPath();
      ctx.strokeStyle = this.getColor(x, y);
      ctx.lineWidth = this.props.config.strokeWidth;
      ctx.lineCap = this.props.config.lineCap;
      ctx.moveTo(x + (angle ? cellWidth : 0), y);
      ctx.lineTo(x + (angle ? 0 : cellWidth), y + cellHeight);
      ctx.stroke();
    }

    this.y += cellHeight;

    if (this.y < height) {
      this.animationFrameRequestId = requestAnimationFrame(this.onAnimationFrame);
    }
    else {
      this.props.onStateChange('FINISHED');
    }
  };

  render() {
    return (
      <div
        className='tenPrintExperiment-sketch experimentSketch_shadow experimentSketch_padding'
        ref='container'
        style={{backgroundColor: this.props.config.backgroundColor.hexString}}
      >
        <canvas ref='canvas'/>
      </div>
    );
  }
}

export default TenPrintSketch;