import ExtendedColor from './ExtendedColor';
import Color from './Color';

class SolidColor extends ExtendedColor {
  static fromJsObject(object) {
    let color = null;
    if (object && object.color !== undefined) {
      color = new SolidColor(Color.fromJsObject(object.color));
    }
    return color;
  }

  color = null;

  constructor(color) {
    super(ExtendedColor.MODES.SOLID);
    this.color = color;
  }

  clone(shallow = false) {
    let clone;
    if (shallow) {
      clone = new SolidColor(this.color, this.offset);
    }
    else {
      clone = new SolidColor(this.color.clone(), this.offset);
    }
    return clone;
  }

  copy(changes) {
    return new SolidColor(
      changes.color !== undefined ? changes.color : this.color.clone(),
    );
  }
}

export default SolidColor;