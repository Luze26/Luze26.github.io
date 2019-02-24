import React from 'react';
import colorUtils from '../../controls/colors/utils/ColorUtils';
import ExtendedColor from '../../controls/colors/models/ExtendedColor';

class BasicSketch extends React.PureComponent {

  animationFrameRequestId = null;

  componentDidMount() {
    console.info('[Basic SKETCH] INIT');
    this.setupScene();
  }

  componentDidUpdate() {
    console.info('[Basic SKETCH] UPDATE');
    cancelAnimationFrame(this.animationFrameRequestId);
    const canvas = this.refs.canvas;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    this.setupScene();
  }

  pause() {
    console.info('[Basic SKETCH] PAUSE');
    cancelAnimationFrame(this.animationFrameRequestId);
    this.props.onStateChange('PAUSED');
  }

  resume() {
    console.info('[Basic SKETCH] RESUME');
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
    this.sketchCounter = 0;
    this.props.onStateChange('RUNNING');
    this.animationFrameRequestId = requestAnimationFrame(this.onAnimationFrame);
  }

  drawRandomRect = (color, startX, startY, colWidth, rowHeight) => {
    const startXMiddle = startX + colWidth / 2;
    const startYMiddle = startY + rowHeight / 2;
    const halfColWidth = colWidth / 2;
    const halfRowHeight = rowHeight / 2;

    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(startX + (Math.random() * halfColWidth), startY + (Math.random() * halfRowHeight));
    this.ctx.lineTo(
      startXMiddle + (Math.random() * halfColWidth),
      startY + (Math.random() * halfRowHeight),
    );
    this.ctx.lineTo(
      startXMiddle + (Math.random() * halfColWidth),
      startYMiddle + (Math.random() * halfRowHeight),
    );
    this.ctx.lineTo(
      startX + (Math.random() * halfColWidth),
      startYMiddle + (Math.random() * halfRowHeight),
    );
    this.ctx.closePath();
    this.ctx.fill();
  };

  getColor(n) {
    let color;
    n = n != null ? n : Math.floor(Math.random() * 4);
    const colorsConfig = this.props.config.colors;
    switch (colorsConfig.mode) {
      case ExtendedColor.MODES.SOLID:
        color = colorsConfig.color.hexString;
        break;
      case ExtendedColor.MODES.PALETTE:
        color = colorsConfig.colors[n].hexString;
        break;
      case ExtendedColor.MODES.GRADIENT:
        color = colorUtils.getHexStringFromHex(
          colorUtils.getGradientColor(colorsConfig.colorStops, n),
        );
        break;
      default:
        color = 0;
    }
    return color;
  }

  drawBasketballCourt() {
    const width = this.props.config.width - (2 * this.props.config.margin);
    this.ctx.lineWidth = this.props.config.strokeWidth;
    this.ctx.strokeStyle = this.props.config.borderColor.hexString;
    this.ctx.strokeRect(
      this.props.config.margin + (this.props.config.strokeWidth / 2),
      this.props.config.margin + (this.props.config.strokeWidth / 2),
      this.props.config.width - (this.props.config.margin * 2) - (this.props.config.strokeWidth / 2),
      this.props.config.height - (this.props.config.margin * 2) - (this.props.config.strokeWidth / 2),
    );

    this.ctx.beginPath();
    this.ctx.arc(
      this.props.config.width / 2,
      this.props.config.height / 2,
      1.8 / 28 * width, 0, 2 * Math.PI,
    );
    this.ctx.fillStyle = this.props.config.backgroundColor.hexString;
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(this.props.config.width / 2, this.props.config.margin);
    this.ctx.lineTo(this.props.config.width / 2, this.props.config.height - this.props.config.margin);
    this.ctx.stroke();


    this.ctx.beginPath();
    this.ctx.arc(
      this.props.config.width / 2,
      this.props.config.height / 2,
      0.5 / 28 * width, 0, 2 * Math.PI,
    );
    this.ctx.fillStyle = this.getColor(0);
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawCell(x, y, width, height) {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.getColor();
    this.ctx.rect(
      x, y, width, height,
    );
    this.ctx.fill();

    if (Math.random() > 0.8) {
      this.ctx.fillStyle = this.getColor();
      const radius = Math.min(width, height);
      const xOffset = width - radius;
      const yOffset = height - radius;

      this.ctx.beginPath();
      this.ctx.arc(
        x + xOffset, y + yOffset, radius, 0, Math.PI / 2,
      );
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + xOffset + radius, y + yOffset);
      this.ctx.lineTo(x + xOffset, y + yOffset + radius);
      this.ctx.lineTo(x, y + height);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  onAnimationFrame = () => {
    const {height, width, nbRows, nbCols, margin, strokeWidth} = this.props.config;
    const innerWidth = width - (2 * margin) - strokeWidth;
    const cellWidth = Math.ceil(innerWidth / nbCols);
    const innerHeight = height - (2 * margin) - strokeWidth;
    const cellHeight = Math.ceil(innerHeight / nbRows);
    for (let y = 0; y < nbRows; y++) {
      for (let x = 0; x < nbCols; x++) {
        this.drawCell(x * cellWidth + margin, y * cellHeight + margin, cellWidth, cellHeight);
      }
    }
    this.drawBasketballCourt();

    console.info('[Basic SKETCH] FINISHED');
    this.props.onStateChange('FINISHED');
  };

  render() {
    return (
      <div
        className='tenPrintExperiment-sketch experimentSketch_shadow'
        ref='container'
        style={{backgroundColor: this.props.config.backgroundColor.hexString}}
      >
        <canvas ref='canvas'/>
      </div>
    );
  }
}

export default BasicSketch;