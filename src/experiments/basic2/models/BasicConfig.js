import Color from '../../controls/colors/models/Color';
import extendedColorUtils from '../../controls/colors/utils/ExtendedColorUtils';
import GenericConfig from '../../global/GenericConfig';
import PaletteColor from '../../controls/colors/models/PaletteColor';

class BasicConfig extends GenericConfig {
  static DEFAULT_CONFIG = new BasicConfig(
    'Style 1', 1000, 600,
    new Color(0x1A1B24),
    new PaletteColor(
      [
        new Color(0xE78B58),
        new Color(0x81C3DD),
        new Color(0x3747C5),
        new Color(0x4A74CF),
        new Color(0xEA6D53),
      ],
    ),
    new Color(0xFFFFFF),
    20, 4, 8, 6,
  );

  static defaultStyles = [
    BasicConfig.DEFAULT_CONFIG,
  ];

  static defaultStylesNames = BasicConfig.defaultStyles.map((style) => style.name);

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
    return BasicConfig.DEFAULT_CONFIG.copy(styleObject);
  }

  constructor() {
    super(
      ['name', 'width', 'height', 'backgroundColor', 'colors', 'borderColor', 'margin', 'strokeWidth', 'nbCols', 'nbRows'],
      arguments,
    );
  }
}

export default BasicConfig;