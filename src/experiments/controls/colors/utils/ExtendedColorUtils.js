import ExtendedColor from '../models/ExtendedColor';
import SolidColor from '../models/SolidColor';
import GradientColor from '../models/GradientColor';
import PaletteColor from '../models/PaletteColor';

const extendedColorUtils = {};

extendedColorUtils.fromJsObject = (object) => {
  let color = null;
  if (object) {
    switch (object.mode) {
      case ExtendedColor.MODES.SOLID:
        color = SolidColor.fromJsObject(object);
        break;
      case ExtendedColor.MODES.GRADIENT:
        color = GradientColor.fromJsObject(object);
        break;
      case ExtendedColor.MODES.PALETTE:
        color = PaletteColor.fromJsObject(object);
        break;
    }
  }
  return color;
};

export default extendedColorUtils;