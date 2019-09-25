import React from 'react';
import colorUtils from '../../controls/colors/utils/ColorUtils';
import {lerp} from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';
import {drawPattern} from './GridPatterns';

class GridSketch extends React.PureComponent {

  animationFrameRequestId = null;

  componentDidMount() {
    console.log('[Grid SKETCH] INIT');
    this.setupScene();
  }

  componentDidUpdate() {
    console.log('[Grid SKETCH] UPDATE');
    cancelAnimationFrame(this.animationFrameRequestId);
    const canvas = this.refs.canvas;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    this.setupScene();
  }

  pause() {
    console.log('[Grid SKETCH] PAUSE');
    cancelAnimationFrame(this.animationFrameRequestId);
    this.props.onStateChange('PAUSED');
  }

  resume() {
    console.log('[Grid SKETCH] RESUME');
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
    this.palette = colorUtils.getPaletteFromConfig(this.random, this.props.config.colors);
    this.points = this.createGrid().filter(() => this.random.value() > this.props.config.hiddenChance);
    this.margin = this.props.config.margin;
    this.props.onStateChange('RUNNING');
    this.animationFrameRequestId = requestAnimationFrame(this.onAnimationFrame);
  }

  getColor() {
    return colorUtils.getColor(this.props.config.colors, this.palette, this.random.value);
  }

  onAnimationFrame = () => {
    const {width, height, backgroundColor, thickness, randomThickness, patterns} = this.props.config;
    const {ctx, margin, points} = this;

    ctx.fillStyle = backgroundColor.hexString;
    ctx.fillRect(0, 0, width, height);

    const halfCellWidth = (width - 2 * margin) / ((this.props.config.nbCols - 1) * 2);
    const halfCellHeight = (height - 2 * margin) / ((this.props.config.nbRows - 1) * 2);
    let isUp = false;

    points.forEach(({position: [u, v], size, color}) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      const patternThickness = (randomThickness ? this.random.gaussian() : 1) * thickness;
      const patternName = this.random.pick(patterns);
      isUp = drawPattern(patternName, ctx, x, y, halfCellWidth, halfCellHeight, isUp, color, patternThickness);
    });

    this.props.onStateChange('FINISHED');
  };

  render() {
    return (
      <div
        className='gridExperiment-sketch experimentSketch_shadow'
        ref='container'
        style={{backgroundColor: this.props.config.backgroundColor.hexString}}
      >
        <canvas ref='canvas'/>
      </div>
    );
  }
}

export default GridSketch;
