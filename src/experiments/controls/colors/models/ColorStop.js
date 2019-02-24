import Color from './Color';
class ColorStop {
  static fromJsObject(object) {
    let colorStop = null;
    if (object && object.offset !== undefined) {
      const color = Color.fromJsObject(object.color);
      if (color !== null) {
        colorStop = new ColorStop(color, object.offset);
      }
    }
    return colorStop;
  }

  color = null;
  offset = null;

  constructor(color, offset) {
    this.color = color;
    this.offset = offset;
  }

  clone(shallow = false) {
    let clone;
    if (shallow) {
      clone = new ColorStop(this.color, this.offset);
    }
    else {
      clone = new ColorStop(this.color.clone(), this.offset);
    }
    return clone;
  }
}

export default ColorStop;