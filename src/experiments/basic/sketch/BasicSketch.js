import React from 'react';
import colorPalettes from 'nice-color-palettes';
import randomUtils from '../../global/utils/RandomUtils';
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
    this.colorPalette = randomUtils.rndElem(colorPalettes);
    this.ctx = canvas.getContext('2d');
    this.ctx.globalCompositeOperation = 'luminosity';
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
    const colorsConfig = this.props.config.colors;
    switch (colorsConfig.mode) {
      case ExtendedColor.MODES.SOLID:
        color = colorsConfig.color.hexString;
        break;
      case ExtendedColor.MODES.PALETTE:
        color = colorUtils.getPaletteColor(colorsConfig.colors, n / this.props.config.nbShapes).hexString;
        break;
      case ExtendedColor.MODES.GRADIENT:
        color = colorUtils.getHexStringFromHex(
          colorUtils.getGradientColor(colorsConfig.colorStops, n / this.props.config.nbShapes),
        );
        break;
      default:
        color = 0;
    }
    return color;
  }

  onAnimationFrame = () => {
    const {height, width, nbRows, nbCols, margin} = this.props.config;
    const col = this.sketchCounter % nbCols;
    const row = Math.floor(this.sketchCounter / nbCols);
    let rowHeight = height / nbRows;
    const startY = row * rowHeight + margin;
    rowHeight -= margin * 2;
    let colWidth = width / nbCols;
    const startX = col * colWidth + margin;
    colWidth -= margin * 2;

    for (let n = 0; n < this.props.config.nbShapes; n++) {
      const opacity = Math.random() + 0.5;
      this.drawRandomRect(
        colorUtils.getRgbStringFromRgb(colorUtils.getRgbaFromHexString(this.getColor(n), opacity)),
        startX, startY, colWidth, rowHeight,
      );
    }

    this.sketchCounter++;
    if (this.sketchCounter < nbRows * nbCols) {
      this.animationFrameRequestId = requestAnimationFrame(this.onAnimationFrame);
    }
    else {
      console.info('[Basic SKETCH] FINISHED');
      this.props.onStateChange('FINISHED');
    }
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