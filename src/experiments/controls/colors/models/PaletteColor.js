import ExtendedColor from './ExtendedColor';
import Color from './Color';

class PaletteColor extends ExtendedColor {
  static fromJsObject(object) {
    let palette = null;
    if (object && object.attribute && object.colorStops) {
      palette = new PaletteColor(
        object.colors.map((color) => new Color(color)),
        object.attribute,
      );
    }
    return palette;
  }

  colors = [];
  attribute = null;

  constructor(colors, attribute) {
    super(ExtendedColor.MODES.PALETTE);
    this.colors = colors;
    this.attribute = attribute;
  }

  clone(shallow = false) {
    let clone;
    if (shallow) {
      clone = new PaletteColor(this.colors, this.offset);
    }
    else {
      clone = new PaletteColor(this.colors.slice(), this.offset);
    }
    return clone;
  }

  copy(changes) {
    return new PaletteColor(
      changes.colors !== undefined ? changes.colors : this.colors.slice(),
      changes.attribute !== undefined ? changes.attribute : this.attribute,
    );
  }
}

export default PaletteColor;