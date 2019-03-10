import Color from '../models/Color';
import ColorStop from '../models/ColorStop';
import ExtendedColor from '../models/ExtendedColor';
import palettes from 'nice-color-palettes';

const colorUtils = {};

colorUtils.getHexFromHexString = (hexString) => {
  hexString = hexString.slice(1);
  if (hexString.length === 3) {
    hexString = hexString[0] + hexString[0] + hexString[1] + hexString[1] + hexString[2] + hexString[2];
  }
  return parseInt(hexString, 16);
};

colorUtils.getRgbFromHex = (hex) => ({
  r: hex >> 16,
  g: (hex & 0x00FFFF) >> 8,
  b: hex & 0x0000FF,
});

colorUtils.getRgbaFromHexString = (hexString, alpha) => Object.assign({a: alpha}, colorUtils.getRgbFromHex(colorUtils.getHexFromHexString(hexString)));

colorUtils.getRgbStringFromRgb = (rgb) => `rgb${rgb.a != null ? 'a' : ''}(${rgb.r},${rgb.g},${rgb.b}${rgb.a != null
  ? ',' + rgb.a
  : ''})`;

colorUtils.getHexFromRgb = (r, g, b) => (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b);

colorUtils.getHexStringFromHex = (hex) => {
  const partialHexString = hex.toString(16);
  let hexString = '#';
  for (let i = 0; i < 6 - partialHexString.length; i++) {
    hexString += '0';
  }
  return hexString + partialHexString;
};

colorUtils.inverseSrgbCompanding = (r, g, b) => {
  r = r / 255;
  g = g / 255;
  b = b / 255;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  return {r: r * 255, g: g * 255, b: b * 255};
};

colorUtils.srgbCompanding = (r, g, b) => {
  r = r / 255;
  g = g / 255;
  b = b / 255;

  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92;

  return {r: r * 255, g: g * 255, b: b * 255};
};

colorUtils.getPaletteColor = (colors, offset) => {
  return colors[Math.min(Math.floor(colors.length * offset), colors.length - 1)];
};

colorUtils.getGradientColor = (colorStops, offset) => {
  //TODO opti
  let minColorStop;
  let maxColorStop;
  for (let i = 0; i < colorStops.length; i++) {
    if (colorStops[i].offset === offset) {
      return colorStops[i].color.hex;
    }
    if (offset < colorStops[i].offset) {
      if (i === 0) {
        return colorStops[i].color.hex;
      }
      else {
        minColorStop = colorStops[i - 1];
        maxColorStop = colorStops[i];
        break;
      }
    }
    else if (i === colorStops.length - 1) {
      return colorStops[colorStops.length - 1].color.hex;
    }
  }
  const minColor = colorUtils.inverseSrgbCompanding(minColorStop.color.rgb.r, minColorStop.color.rgb.g, minColorStop.color.rgb.b);
  const maxColor = colorUtils.inverseSrgbCompanding(maxColorStop.color.rgb.r, maxColorStop.color.rgb.g, maxColorStop.color.rgb.b);
  const relativeOffset = (offset - minColorStop.offset) / (maxColorStop.offset - minColorStop.offset);
  const r = minColor.r * (1 - relativeOffset) + maxColor.r * relativeOffset;
  const g = minColor.g * (1 - relativeOffset) + maxColor.g * relativeOffset;
  const b = minColor.b * (1 - relativeOffset) + maxColor.b * relativeOffset;
  const rgb = colorUtils.srgbCompanding(r, g, b);
  return colorUtils.getHexFromRgb(rgb.r, rgb.g, rgb.b);
};

colorUtils.getPaletteFromConfig = (random, colorsConfig) => {
  let palette = null;
  if (colorsConfig.random) {
    const colorCount = random.rangeFloor(2, 6);
    palette = random.shuffle(
      random.pick(palettes),
    ).slice(0, colorCount);
    if (colorsConfig.mode === ExtendedColor.MODES.PALETTE) {
      palette = palette.map((color) => new Color(color));
    }
    else if (colorsConfig.mode === ExtendedColor.MODES.GRADIENT) {
      palette = palette.map((color, index) => new ColorStop(new Color(color), index / (colorCount - 1)));
    }
  }
  return palette;
};

colorUtils.getColor = (colorsConfig, palette, getPercentage) => {
  let color;
  switch (colorsConfig.mode) {
    case ExtendedColor.MODES.SOLID:
      color = colorsConfig.color.hexString;
      break;
    case ExtendedColor.MODES.PALETTE:
      color = colorUtils.getPaletteColor(palette || colorsConfig.colors, getPercentage()).hexString;
      break;
    case ExtendedColor.MODES.GRADIENT:
      color = colorUtils.getHexStringFromHex(
        colorUtils.getGradientColor(palette || colorsConfig.colorStops, getPercentage()),
      );
      break;
    default:
      color = 0;
  }
  return color;
};

export default colorUtils;
