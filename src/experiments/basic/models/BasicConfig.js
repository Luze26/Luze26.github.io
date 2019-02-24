import Color from '../../controls/colors/models/Color';
import extendedColorUtils from '../../controls/colors/utils/ExtendedColorUtils';
import GenericConfig from '../../global/GenericConfig';
import SolidColor from '../../controls/colors/models/SolidColor';

class BasicConfig extends GenericConfig {
  static DEFAULT_CONFIG = new BasicConfig(
    'Style 1', 1000, 600, new Color(0xFFFFFF), new SolidColor(new Color(0x000000)), 3, 5, 10, 3,
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
      ['name', 'width', 'height', 'backgroundColor', 'colors', 'nbRows', 'nbCols', 'margin', 'nbShapes'],
      arguments,
    );
  }
}

export default BasicConfig;