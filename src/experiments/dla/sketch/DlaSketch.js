import React from 'react';
import palettes from 'nice-color-palettes';
import * as THREE from 'three';
import colorUtils from '../../controls/colors/utils/ColorUtils';
import Walker from './Walker';
import ExtendedColor from '../../controls/colors/models/ExtendedColor';
import Color from '../../controls/colors/models/Color';
import random from 'canvas-sketch-util/random';

class DlaSketch extends React.PureComponent {

  movingWalkers;
  stuckWalkers;
  animationFrameRequestId = null;

  componentDidMount() {
    console.log('[DLA SKETCH] INIT');
    this.setupScene();
  }

  componentDidUpdate() {
    console.log('[DLA SKETCH] UPDATE');
    cancelAnimationFrame(this.animationFrameRequestId);
    while (this.refs.container.firstChild) {
      this.refs.container.firstChild.remove();
    }
    this.setupScene();
  }

  pause() {
    console.log('[DLA SKETCH] PAUSE');
    cancelAnimationFrame(this.animationFrameRequestId);
    this.props.onStateChange('PAUSED');
  }

  resume() {
    console.log('[DLA SKETCH] RESUME');
    this.props.onStateChange('RUNNING');
    this.animationFrameRequestId = requestAnimationFrame(this.onAnimationFrame);
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.props.config.backgroundColor.hex);

    this.width = this.props.config.width;
    this.minX = this.width / -2;
    this.maxX = this.width / 2;
    this.height = this.props.config.height;
    this.minY = this.height / -2;
    this.maxY = this.height / 2;

    this.camera = new THREE.OrthographicCamera(this.width / -2, this.width / 2, this.height / 2, this.height / -2, 1, 1000);
    this.camera.position.z = 100;
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(this.width, this.height);
    this.refs.container.appendChild(this.renderer.domElement);

    this.init();
  }

  getWalkerRandomPosition() {
    let x, y;
    switch (this.props.config.mode) {
      case 'CENTER':
        const r = Math.random();
        if (r < 0.5) {
          x = Math.random() * this.width - this.width * 0.5;
          y = (r < 0.25 ? -0.5 : 0.5) * this.height;
        }
        else {
          y = Math.random() * this.height - this.height * 0.5;
          x = (r < 0.75 ? -0.5 : 0.5) * this.width;
        }
        break;
      case 'BOTTOM':
        x = Math.random() * this.width - this.width * 0.5;
        y = 0.5 * this.height;
        break;
    }
    return {x, y};
  }

  addWalker(x, y, stuck) {
    if (x === undefined || y === undefined) {
      const position = this.getWalkerRandomPosition();
      x = position.x;
      y = position.y;
    }
    const walker = new Walker(
      x, y,
      this.props.config.radius,
      this.minX, this.maxX,
      this.minY, this.maxY,
    );
    if (stuck) {
      walker.setStuck(this.getColor(), this.props.config.radius, this.props.config.shape);
      this.stuckWalkers.push(walker);
    }
    else {
      this.movingWalkers.push(walker);
    }
    this.scene.add(walker.mesh);
  }

  initBottom() {
    const step = this.width / 120;
    let x = this.width / -2;
    for (let i = 0; i < 120; i++) {
      this.addWalker(x, this.height / -2, true);
      x += step;
    }
  }

  init() {
    this.random = random.createRandom();
    if (this.props.config.colors.mode === ExtendedColor.MODES.PALETTE && this.props.config.colors.random) {
      const colorCount = this.random.rangeFloor(5, 6);
      this.palette = this.random.shuffle(
        this.random.pick(palettes),
      ).slice(0, colorCount).map((color) => new Color(color));
    }
    else {
      this.palette = null;
    }

    this.stuckWalkers = [];
    this.movingWalkers = [];

    switch (this.props.config.mode) {
      case 'CENTER':
        this.addWalker(0, 0, true);
        break;
      case 'BOTTOM':
        this.initBottom();
        break;
    }

    for (let i = 0; i < this.props.config.nbWalkers; i++) {
      this.addWalker();
    }
    this.props.onStateChange('RUNNING');
    this.animationFrameRequestId = requestAnimationFrame(this.onAnimationFrame);
  }

  dist(walker1, walker2) {
    const dX = walker1.mesh.position.x - walker2.mesh.position.x;
    const dY = walker1.mesh.position.y - walker2.mesh.position.y;
    return dX * dX + dY * dY;
  }

  getAttributePercent(attribute) {
    let percent;
    switch (attribute) {
      case 'NB_STUCK_WALKERS':
      case 'DEFAULT':
      case undefined:
        percent = this.stuckWalkers.length / this.props.config.nbWalkers;
        break;
      default:
        percent = 0;
    }
    return percent;
  }

  getColor() {
    let color;
    const colorsConfig = this.props.config.colors;
    const attributePercent = this.getAttributePercent(colorsConfig.attribute) || 0.01;
    switch (colorsConfig.mode) {
      case ExtendedColor.MODES.SOLID:
        color = colorsConfig.color.hex;
        break;
      case ExtendedColor.MODES.PALETTE:
        color = colorUtils.getPaletteColor(this.palette || colorsConfig.colors, attributePercent).hexString;
        break;
      case ExtendedColor.MODES.GRADIENT:
        color = colorUtils.getGradientColor(colorsConfig.colorStops, attributePercent);
        break;
      default:
        color = 0;
    }
    return color;
  }

  moveWalker(walker, index) {
    let velX = Math.random() * this.props.config.velocity - this.props.config.velocity / 2;
    let velY = Math.random() * this.props.config.velocity - this.props.config.velocity / 2;
    walker.animate(velX, velY);
    const nbStuckWalkers = this.stuckWalkers.length;
    for (let i = 0; i < nbStuckWalkers; i++) {
      if (
        this.dist(walker, this.stuckWalkers[i]) < this.props.config.radius * this.props.config.radius * 4 &&
        Math.random() < this.props.config.stickiness
      ) {
        const sizes = this.props.config.shapeSizes[Math.floor(nbStuckWalkers / (this.props.config.nbWalkers / this.props.config.shapeSizes.length))] || this.props.config.shapeSizes[this.props.config.shapeSizes.length - 1];
        walker.setStuck(this.getColor(), sizes, this.props.config.shape);
        this.movingWalkers.splice(index, 1);
        this.stuckWalkers.push(walker);
        return;
      }
    }
  }

  onAnimationFrame = () => {
    for (let i = 0; i < this.props.config.stepsPerRender; i++) {
      this.movingWalkers.forEach(this.moveWalker, this);
    }

    this.renderer.render(this.scene, this.camera);
    if (this.movingWalkers.length > 0) {
      this.animationFrameRequestId = requestAnimationFrame(this.onAnimationFrame);
    }
    else {
      this.props.onStateChange('FINISHED');
    }
  };

  render() {
    return (
      <div className='dlaExperiment-sketch' ref='container'/>
    );
  }
}

export default DlaSketch;
