import ExtendedColor from './ExtendedColor';
import Color from './Color';

class PaletteColor extends ExtendedColor {
  static fromJsObject(object) {
    let palette = null;
    if (object && object.attribute && object.colorStops) {
      palette = new PaletteColor(
        object.colors.map((color) => new Color(color)),
        object.attribute,
        !!object.random,
      );
    }
    return palette;
  }

  colors = [];
  attribute = null;
  random = false;

  constructor(colors, attribute, random) {
    super(ExtendedColor.MODES.PALETTE);
    this.colors = colors;
    this.attribute = attribute;
    this.random = random;
  }

  clone(shallow = false) {
    let clone;
    if (shallow) {
      clone = new PaletteColor(this.colors, this.attribute, this.random);
    }
    else {
      clone = new PaletteColor(this.colors.slice(), this.attribute, this.random);
    }
    return clone;
  }

  copy(changes) {
    return new PaletteColor(
      changes.colors !== undefined ? changes.colors : this.colors.slice(),
      changes.attribute !== undefined ? changes.attribute : this.attribute,
      changes.random !== undefined ? changes.random : this.random,
    );
  }
}

export default PaletteColor;
