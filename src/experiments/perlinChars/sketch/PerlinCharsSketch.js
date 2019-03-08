import React from 'react';
import colorUtils from '../../controls/colors/utils/ColorUtils';
import ExtendedColor from '../../controls/colors/models/ExtendedColor';
import {lerp} from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';
import Color from '../../controls/colors/models/Color';

class PerlinCharsSketch extends React.PureComponent {

  animationFrameRequestId = null;

  componentDidMount() {
    console.log('[PerlinChars SKETCH] INIT');
    this.setupScene();
  }

  componentDidUpdate() {
    console.log('[PerlinChars SKETCH] UPDATE');
    cancelAnimationFrame(this.animationFrameRequestId);
    const canvas = this.refs.canvas;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    this.setupScene();
  }

  pause() {
    console.log('[PerlinChars SKETCH] PAUSE');
    cancelAnimationFrame(this.animationFrameRequestId);
    this.props.onStateChange('PAUSED');
  }

  resume() {
    console.log('[PerlinChars SKETCH] RESUME');
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

  createGrid() {
    const points = [];
    for (let x = 0; x < this.props.config.nbCols; x++) {
      for (let y = 0; y < this.props.config.nbRows; y++) {
        const u = x / (this.props.config.nbCols - 1);
        const v = y / (this.props.config.nbRows - 1);
        const noise = this.random.noise2D(u, v);
        points.push({
          position: [u, v],
          noise,
          size: Math.abs(noise) * this.props.config.size / 100,
          color: this.getColor(),
        });
      }
    }
    return points;
  }

  init() {
    this.random = random.createRandom();
    if (this.props.config.colors.mode === ExtendedColor.MODES.PALETTE && this.props.config.colors.random) {
      const colorCount = this.random.rangeFloor(2, 6);
      this.palette = this.random.shuffle(
        this.random.pick(palettes),
      ).slice(0, colorCount).map((color) => new Color(color));
    }
    else {
      this.palette = null;
    }
    this.points = this.createGrid().filter(() => this.random.value() > this.props.config.hiddenChance);
    this.margin = this.props.config.margin;
    this.props.onStateChange('RUNNING');
    this.animationFrameRequestId = requestAnimationFrame(this.onAnimationFrame);
  }

  getColor() {
    let color;
    const colorsConfig = this.props.config.colors;
    switch (colorsConfig.mode) {
      case ExtendedColor.MODES.SOLID:
        color = colorsConfig.color.hexString;
        break;
      case ExtendedColor.MODES.PALETTE:
        color = colorUtils.getPaletteColor(this.palette || colorsConfig.colors, this.random.value()).hexString;
        break;
      case ExtendedColor.MODES.GRADIENT:
        color = colorUtils.getHexStringFromHex(
          colorUtils.getGradientColor(colorsConfig.colorStops, this.random.value()),
        );
        break;
      default:
        color = 0;
    }
    return color;
  }

  onAnimationFrame = () => {
    const {width, height, backgroundColor, string} = this.props.config;
    const {ctx, margin, points} = this;

    ctx.fillStyle = backgroundColor.hexString;
    ctx.fillRect(0, 0, width, height);

    points.forEach(({position: [u, v], size, color, noise}) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      ctx.save();
      ctx.fillStyle = color;
      ctx.font = `${size * width}px "Helvetica"`;
      ctx.translate(x, y);
      ctx.rotate(noise);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(string, 0, 0);
      ctx.restore();
    });

    this.props.onStateChange('FINISHED');
  };

  render() {
    return (
      <div
        className='perlinCharsExperiment-sketch experimentSketch_shadow'
        ref='container'
        style={{backgroundColor: this.props.config.backgroundColor.hexString}}
      >
        <canvas ref='canvas'/>
      </div>
    );
  }
}

export default PerlinCharsSketch;
