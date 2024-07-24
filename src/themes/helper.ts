import {isNumber} from 'lodash';
import {Dimensions} from 'react-native';
import {Size} from 'types/common';

export const DESIGN_WIDTH = 428;
export const DESIGN_HEIGHT = 926;

export const {width, height} = Dimensions.get('screen');

export const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

export const hScale = <T extends Size>(size: T, baseDesign = DESIGN_WIDTH) => {
  if (typeof size === 'number') {
    return (shortDimension / baseDesign) * size;
  }
  return size;
};

export const vScale = <T extends Size>(size: T, baseDesign = DESIGN_HEIGHT) => {
  if (typeof size === 'number') {
    return (longDimension / baseDesign) * size;
  }
  return size;
};

export const fontScale = (size: number, factor = 0.25, baseDesign = DESIGN_WIDTH) => {
  if (size <= 12) {
    return size;
  }
  return size + (hScale(size, baseDesign) - size) * factor;
};

export const reverseHScale = (size: number, baseDesign = DESIGN_WIDTH) => {
  return (baseDesign / shortDimension) * size;
};

export const reverseVScale = (size: number, baseDesign = DESIGN_HEIGHT) => {
  return (baseDesign / shortDimension) * size;
};

export const moderateHScale = <T extends Size>(size: T, factor = 0.5, baseDesign = DESIGN_WIDTH) => {
  if (typeof size === 'number') {
    return size + ((hScale(size, baseDesign) as number) - size) * factor;
  }
  return size;
};

export const moderateVScale = <T extends Size>(size: T, factor = 0.5, baseDesign = DESIGN_HEIGHT) => {
  if (typeof size === 'number') {
    return size + ((vScale(size, baseDesign) as number) - size) * factor;
  }
  return size;
};

export const reverseModerateHScale = (size: number, factor = 0.5, baseDesign = DESIGN_WIDTH) => {
  return size / (1 - factor + (factor * shortDimension) / baseDesign);
};

export const reverseModerateVScale = (size: number, factor = 0.5, baseDesign = DESIGN_HEIGHT) => {
  return size / (1 - factor + (factor * longDimension) / baseDesign);
};

export const handleSquare = (size: number) => {
  return {
    width: size,
    height: size,
  };
};

export const handleRound = (size: number) => {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
};

export const handleFlex = (flex: number | boolean) => {
  return {
    flex: isNumber(flex) ? flex : flex ? 1 : 0,
  };
};

export const handleFlexShrink = (flexShrink: number | true) => {
  return {
    flexShrink: isNumber(flexShrink) ? flexShrink : 1,
  };
};

export const handleFlexGrow = (flexGrow: number | true) => {
  return {
    flexGrow: isNumber(flexGrow) ? flexGrow : 1,
  };
};

export const getSpacing = ({
  left,
  top,
  right,
  bottom,
  horizontal,
  vertical,
  all,
  safeTop = 0,
  safeBottom = 0,
  safeLeft = 0,
  safeRight = 0,
}: {
  left?: Size;
  top?: Size;
  right?: Size;
  bottom?: Size;
  horizontal?: Size;
  vertical?: Size;
  all?: Size;
  safeTop?: number;
  safeBottom?: number;
  safeLeft?: number;
  safeRight?: number;
}) => {
  return {
    left: left || horizontal || all || reverseHScale(safeLeft) || 0,
    top: top || vertical || all || reverseHScale(safeTop) || 0,
    right: right || horizontal || all || reverseHScale(safeRight) || 0,
    bottom: bottom || vertical || all || reverseHScale(safeBottom) || 0,
  };
};

export const getBorderRadius = ({
  left = 0,
  top = 0,
  right = 0,
  bottom = 0,
  topLeft = 0,
  topRight = 0,
  bottomLeft = 0,
  bottomRight = 0,
  all = 0,
}) => {
  return {
    topLeft: topLeft || top || left || all || 0,
    topRight: topRight || top || right || all || 0,
    bottomLeft: bottomLeft || bottom || left || all || 0,
    bottomRight: bottomRight || bottom || right || all || 0,
  };
};

export const vs = vScale;
export const hs = hScale;
export const rhs = reverseHScale;
export const rvs = reverseVScale;
export const mhs = moderateHScale;
export const mvs = moderateVScale;
export const rmhs = reverseModerateHScale;
export const mmvs = reverseModerateVScale;
export const fs = fontScale;
