import Color from '../../controls/colors/models/Color';
import extendedColorUtils from '../../controls/colors/utils/ExtendedColorUtils';
import GenericConfig from '../../global/GenericConfig';
import SolidColor from '../../controls/colors/models/SolidColor';

class TenPrintConfig extends GenericConfig {
  static DEFAULT_CONFIG = new TenPrintConfig(
    'Style 1', 600, 600, new Color(0xFFFFFF), new SolidColor(new Color(0x000000)), 15, 15, 4, 'round', 'VERTICAL',
  );

  static defaultStyles = [
    TenPrintConfig.DEFAULT_CONFIG,
  ];

  static defaultStylesNames = TenPrintConfig.defaultStyles.map((style) => style.name);

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
    return TenPrintConfig.DEFAULT_CONFIG.copy(styleObject);
  }

  constructor() {
    super(
      ['name', 'width', 'height', 'backgroundColor', 'colors', 'cellWidth', 'cellHeight', 'strokeWidth', 'lineCap', 'colorsAttribute'],
      arguments,
    );
  }
}

export default TenPrintConfig;