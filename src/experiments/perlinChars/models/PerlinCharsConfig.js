import Color from '../../controls/colors/models/Color';
import extendedColorUtils from '../../controls/colors/utils/ExtendedColorUtils';
import GenericConfig from '../../global/GenericConfig';
import PaletteColor from '../../controls/colors/models/PaletteColor';

class PerlinCharsConfig extends GenericConfig {
  static DEFAULT_CONFIG = new PerlinCharsConfig(
    'Style 1', 600, 600, new Color(0xFFFFFF),
    new PaletteColor([new Color(0x6E1E72), new Color(0xB0254F), new Color(0xDE4126), new Color(0xEB9605)], null, true),
    15, 15, 70, 30, 30, '-', 22, 0.65,
  );

  static defaultStyles = [
    PerlinCharsConfig.DEFAULT_CONFIG,
  ];
  static defaultStylesNames = PerlinCharsConfig.defaultStyles.map((style) => style.name);

  static fromJsObject(styleObject) {
    if (styleObject.backgroundColor && styleObject.backgroundColor._hex !== undefined) {
      styleObject.backgroundColor = Color.fromJsObject(styleObject.backgroundColor);
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
    return PerlinCharsConfig.DEFAULT_CONFIG.copy(styleObject);
  }

  constructor() {
    super(
      ['name', 'width', 'height', 'backgroundColor', 'colors', 'cellWidth', 'cellHeight', 'margin', 'nbCols', 'nbRows', 'string', 'size', 'hiddenChance'],
      arguments,
    );
  }

  getDefaultStylesNames() {
    return PerlinCharsConfig.defaultStylesNames;
  }
}

export default PerlinCharsConfig;
