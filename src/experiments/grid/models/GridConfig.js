import Color from '../../controls/colors/models/Color';
import extendedColorUtils from '../../controls/colors/utils/ExtendedColorUtils';
import GenericConfig from '../../global/GenericConfig';
import PaletteColor from '../../controls/colors/models/PaletteColor';

class GridConfig extends GenericConfig {
  static DEFAULT_CONFIG = new GridConfig(
    'Style 1', 600, 600, new Color(0x131116),
    new PaletteColor([new Color(0x6E1E72), new Color(0xB0254F), new Color(0xDE4126), new Color(0xEB9605)], null, true),
    40, 100, 100, 0.45, 1, true
  );

  static defaultStyles = [
    GridConfig.DEFAULT_CONFIG,
  ];

  static defaultStylesNames = GridConfig.defaultStyles.map((style) => style.name);

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
    return GridConfig.DEFAULT_CONFIG.copy(styleObject);
  }

  constructor() {
    super(
      ['name', 'width', 'height', 'backgroundColor', 'colors', 'margin', 'nbCols', 'nbRows', 'hiddenChance', 'thickness', 'randomThickness'],
      arguments,
    );
  }
}

export default GridConfig;
