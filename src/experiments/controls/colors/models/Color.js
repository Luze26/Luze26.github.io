import colorUtils from '../utils/ColorUtils';

class Color {
  static fromJsObject(object) {
    let color = null;
    if (object && object._hex !== undefined) {
      color = new Color(object._hex);
    }
    return color;
  }

  _hex;
  _hexString;
  _rgb;

  constructor(hex) {
    if (arguments.length === 3) {
      this._hex = arguments[0];
      this._hexString = arguments[1];
      this._rgb = arguments[2];
    }
    else {
      if (typeof hex === 'number') {
        this._hex = hex;
        this._hexString = colorUtils.getHexStringFromHex(hex);
      }
      else {
        this._hexString = hex;
        this._hex = colorUtils.getHexFromHexString(hex);
      }
      this._rgb = colorUtils.getRgbFromHex(this._hex);
    }
  }

  get hex() {
    return this._hex;
  }

  get hexString() {
    return this._hexString;
  }

  get rgb() {
    return this._rgb;
  }

  negative() {
    return new Color(0xFFFFFF - this._hex);
  }

  clone() {
    return new Color(this._hex, this._hexString, this._rgb);
  }
}

export default Color;