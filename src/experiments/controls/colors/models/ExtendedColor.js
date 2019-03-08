class ExtendedColor {

  static MODES = {
    SOLID: 0,
    PALETTE: 1,
    GRADIENT: 2,
    RANDOM_PALETTE: 3,
  };

  mode;

  constructor(mode) {
    this.mode = mode;
  }
}

export default ExtendedColor;
