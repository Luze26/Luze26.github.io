import ExtendedColor from './ExtendedColor';
import ColorStop from './ColorStop';

class GradientColor extends ExtendedColor {
  static fromJsObject(object) {
    let gradient = null;
    if (object && object.colorStops) {
      gradient = new GradientColor(
        object.colorStops.map((colorStop) => ColorStop.fromJsObject(colorStop)),
        object.attribute,
      );
    }
    return gradient;
  }

  colorStops = null;
  attribute = null;

  constructor(colorStops, attribute) {
    super(ExtendedColor.MODES.GRADIENT);
    this.colorStops = colorStops;
    this.attribute = attribute;
  }

  _cloneColorStops = () => this.colorStops.slice().map(this._cloneColorStop);

  _cloneColorStop = (colorStop) => colorStop.clone();

  clone(shallow = false) {
    let clone;
    if (shallow) {
      clone = new GradientColor(this.colorStops, this.offset);
    }
    else {
      clone = new GradientColor(this._cloneColorStops(), this.offset);
    }
    return clone;
  }

  copy(changes) {
    return new GradientColor(
      changes.colorStops !== undefined ? changes.colorStops : this._cloneColorStops(),
      changes.attribute !== undefined ? changes.attribute : this.attribute,
    );
  }
}

export default GradientColor;