const PATTERNS = {
  CIRCLE_1: 'CIRCLE_1',
  CIRCLE_2: 'CIRCLE_2',
  CIRCLE_3: 'CIRCLE_3',
  CIRCLE_FILL_1: 'CIRCLE_FILL_1',
  CIRCLE_FILL_2: 'CIRCLE_FILL_2',
  CIRCLE_FILL_3: 'CIRCLE_FILL_3',
  SQUARE_1: 'SQUARE_1',
  SQUARE_2: 'SQUARE_2',
  SQUARE_3: 'SQUARE_3',
  SQUARE_FILL_1: 'SQUARE_FILL_1',
  SQUARE_FILL_2: 'SQUARE_FILL_2',
  SQUARE_FILL_3: 'SQUARE_FILL_3',
  LINE_HORIZONTAL: 'LINE_HORIZONTAL',
  LINE_DIAGONAL: 'LINE_DIAGONAL',
  TRIANGLE_FILL_RAND: 'TRIANGLE_FILL_RAND',
  TRIANGLE_RAND: 'TRIANGLE_RAND',
  LINE_CRAG: 'LINE_CRAG',
  ARC_RAND: 'ARC_RAND',
};

const GRID_PATTERN_SETS = [
  {
    label: 'Lines',
    patterns: [PATTERNS.LINE_HORIZONTAL, PATTERNS.LINE_DIAGONAL, PATTERNS.LINE_CRAG],
  },
  {
    label: 'Filled Circles',
    patterns: [PATTERNS.CIRCLE_FILL_1, PATTERNS.CIRCLE_FILL_2, PATTERNS.CIRCLE_FILL_3],
  },
  {
    label: 'Filled Circle',
    patterns: [PATTERNS.CIRCLE_FILL_3],
  },
  {
    label: 'Circles',
    patterns: [PATTERNS.CIRCLE_1, PATTERNS.CIRCLE_2, PATTERNS.CIRCLE_3],
  },
  {
    label: 'Circle',
    patterns: [PATTERNS.CIRCLE_3],
  },
  {
    label: 'Filled Squares',
    patterns: [PATTERNS.SQUARE_FILL_1, PATTERNS.SQUARE_FILL_2, PATTERNS.SQUARE_FILL_3],
  },
  {
    label: 'Filled Square',
    patterns: [PATTERNS.SQUARE_FILL_3],
  },
  {
    label: 'Squares',
    patterns: [PATTERNS.SQUARE_1, PATTERNS.SQUARE_2, PATTERNS.SQUARE_3],
  },
  {
    label: 'Square',
    patterns: [PATTERNS.SQUARE_3],
  },
  {
    label: 'Filled Triangle',
    patterns: [PATTERNS.TRIANGLE_FILL_RAND],
  },
  {
    label: 'Triangle',
    patterns: [PATTERNS.TRIANGLE_RAND],
  },
  {
    label: 'Arcs',
    patterns: [PATTERNS.ARC_RAND],
  },
  {
    label: 'All',
    patterns: Array.from(new Set(Object.values(PATTERNS))),
  },
];

const BASIC_RATIO = {
  1: 0.2,
  2: 0.5,
  3: 0.8,
};

function drawLinePattern(ctx, x, y, halfWidth, halfHeight, isUp, color, thickness, drawLines) {
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - halfWidth, y + (halfHeight * (isUp ? -1 : 1)));
  drawLines();
  ctx.stroke();
}

function drawCircle(ctx, x, y, radius) {
  drawArc(ctx, x, y, radius, 0, 2 * Math.PI);
}

function drawArc(ctx, x, y, radius, startingAngle, endingAngle) {
  ctx.arc(x, y, radius, startingAngle, endingAngle);
}

function drawSquare(ctx, x, y, halfWidth, halfHeight) {
  ctx.moveTo(x - halfWidth, y - halfHeight);
  ctx.lineTo(x + halfWidth, y - halfHeight);
  ctx.lineTo(x + halfWidth, y + halfHeight);
  ctx.lineTo(x - halfWidth, y + halfHeight);
  ctx.closePath();
}

function drawTriangle(ctx, x, y, halfWidth, halfHeight) {
  const corners = [
    [x - halfWidth, y - halfHeight],
    [x + halfWidth, y - halfHeight],
    [x + halfWidth, y + halfHeight],
    [x - halfWidth, y + halfHeight],
  ];
  const startingCorner = Math.floor(Math.random() * corners.length);
  ctx.moveTo(...corners[startingCorner]);
  for (let i = 1; i < 3; i++) {
    ctx.lineTo(...corners[(startingCorner + i) % corners.length]);
  }
  ctx.closePath();
}

function drawBasicPattern(ctx, x, y, color, thickness, filled, drawFn) {
  ctx[filled ? 'fillStyle' : 'strokeStyle'] = color;
  ctx.lineWidth = thickness;
  ctx.beginPath();
  drawFn();
  ctx[filled ? 'fill' : 'stroke']();
}

function drawPattern(patternName, ctx, x, y, halfWidth, halfHeight, isUp, color, thickness) {
  switch (patternName) {
    case PATTERNS.LINE_HORIZONTAL:
      drawLinePattern(
        ctx, x, y, halfWidth, halfHeight, isUp, color, thickness,
        () => ctx.lineTo(
          x + halfWidth,
          y + (halfHeight * (isUp ? -1 : 1)),
        ),
      );
      return isUp;
    case PATTERNS.LINE_DIAGONAL:
      drawLinePattern(
        ctx, x, y, halfWidth, halfHeight, isUp, color, thickness,
        () => ctx.lineTo(
          x + halfWidth,
          y + (halfHeight * (isUp ? 1 : -1)),
        ),
      );
      return !isUp;
    case PATTERNS.LINE_CRAG:
      drawLinePattern(
        ctx, x, y, halfWidth, halfHeight, isUp, color, thickness,
        () => {
          ctx.lineTo(
            x - halfWidth,
            y + (halfHeight * (isUp ? 1 : -1)),
          );
          ctx.lineTo(
            x + halfWidth,
            y + (halfHeight * (isUp ? 1 : -1)),
          );
        },
      );
      return !isUp;
    case PATTERNS.ARC_RAND:
      const startingAngle = Math.random() * Math.PI * 1.5;
      drawBasicPattern(ctx, x, y, color, thickness, false, () => drawArc(ctx, x, y, halfWidth, startingAngle, startingAngle + Math.PI / 2));
      break;
    default:
      let drawFn = () => {
      };
      if (patternName.startsWith('CIRCLE')) {
        drawFn = () => drawCircle(ctx, x, y, Math.min(halfWidth, halfHeight) * BASIC_RATIO[patternName.substr(-1)]);
      }
      else if (patternName.startsWith('SQUARE')) {
        const ratio = BASIC_RATIO[patternName.substr(-1)];
        drawFn = () => drawSquare(ctx, x, y, halfWidth * ratio, halfHeight * ratio);
      }
      else if (patternName.startsWith('TRIANGLE')) {
        drawFn = () => drawTriangle(ctx, x, y, halfWidth, halfHeight);
      }
      const filled = patternName.indexOf('_FILL_') > 0;
      drawBasicPattern(ctx, x, y, color, thickness, filled, drawFn);
      break;
  }
  return isUp;
}

export {drawPattern, GRID_PATTERN_SETS};

