import Color from '../../controls/colors/models/Color';
import ColorStop from '../../controls/colors/models/ColorStop';
import extendedColorUtils from '../../controls/colors/utils/ExtendedColorUtils';
import GradientColor from '../../controls/colors/models/GradientColor';
import SolidColor from '../../controls/colors/models/SolidColor';

class DlaConfig {
  static DEFAULT_CONFIG = new DlaConfig('Style 1', 600, 600, 50, 5, 1, 10, 900, new Color(0x131116),
    new GradientColor(
      [
        new ColorStop(new Color(0x1DB98D), 0),
        new ColorStop(new Color(0xB91D7A), 0.3),
        new ColorStop(new Color(0xC471F5), 1),
      ],
      'NB_STUCK_WALKERS',
    ),
    'CIRCLE',
    [5 * 0.9, 5 * 0.7, 5 * 0.6, 5 * 0.4, 5 * 0.2], 'CENTER',
  );

  static defaultStyles = [
    DlaConfig.DEFAULT_CONFIG,
    new DlaConfig('Style 2', 600, 600, 50, 4, 1, 10, 900, new Color(0x131116),
      new SolidColor(new Color(0xFFFFFF)),
      'CIRCLE',
      [7, 2], 'CENTER',
    )
  ];

  static defaultStylesNames = DlaConfig.defaultStyles.map((style) => style.name);

  static fromJsObject(styleObject) {
    if (styleObject.backgroundColor && styleObject.backgroundColor._hex !== undefined) {
      styleObject.backgroundColor = Color.fromJsObject(styleObject.backgroundColor._hex);
    }
    else {
      delete styleObject.backgroundColor;
    }
    if (styleObject.colors && styleObject.colors.mode !== undefined) {
      styleObject.colors = extendedColorUtils.fromJsObject(styleObject.colors);
    }
    else {
      delete styleObject.colors;
    }
    return DlaConfig.DEFAULT_CONFIG.copy(styleObject);
  }

  name;
  width;
  height;
  stepsPerRender;
  radius;
  stickiness;
  velocity;
  nbWalkers;
  backgroundColor;
  colors;
  shape;
  shapeSizes;
  mode;

  constructor(name, width, height, stepsPerRender, radius, stickiness, velocity, nbWalkers, backgroundColor, colors, shape, shapeSizes, mode) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.stepsPerRender = stepsPerRender;
    this.radius = radius;
    this.stickiness = stickiness;
    this.velocity = velocity;
    this.nbWalkers = nbWalkers;
    this.backgroundColor = backgroundColor;
    this.colors = colors;
    this.shape = shape;
    this.shapeSizes = shapeSizes;
    this.mode = mode;
  }

  clone(shallow = false) {
    let clone;
    if (shallow) {
      clone = new DlaConfig(
        this.name, this.width, this.height, this.stepsPerRender, this.radius, this.stickiness, this.velocity, this.nbWalkers,
        this.backgroundColor, this.colors, this.shape, this.shapeSizes, this.mode,
      );
    }
    else {
      clone = new DlaConfig(
        this.name, this.width, this.height, this.stepsPerRender, this.radius, this.stickiness, this.velocity, this.nbWalkers,
        this.backgroundColor.clone(), this.colors.clone(), this.shape, this.shapeSizes.slice(), this.mode,
      );
    }
    return clone;
  }

  copy(changes) {
    return new DlaConfig(
      changes.name != null ? changes.name : this.name,
      changes.width != null ? changes.width : this.width,
      changes.height != null ? changes.height : this.height,
      changes.stepsPerRender != null ? changes.stepsPerRender : this.stepsPerRender,
      changes.radius != null ? changes.radius : this.radius,
      changes.stickiness != null ? changes.stickiness : this.stickiness,
      changes.velocity != null ? changes.velocity : this.velocity,
      changes.nbWalkers != null ? changes.nbWalkers : this.nbWalkers,
      changes.backgroundColor != null ? changes.backgroundColor : this.backgroundColor.clone(),
      changes.colors != null ? changes.colors : this.colors.clone(),
      changes.shape != null ? changes.shape : this.shape,
      changes.shapeSizes != null ? changes.shapeSizes : this.shapeSizes.slice(),
      changes.mode != null ? changes.mode : this.mode,
    );
  }
}

export default DlaConfig;