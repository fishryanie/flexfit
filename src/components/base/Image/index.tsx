import React from 'react';
import FastImage, {FastImageProps, Source} from 'react-native-fast-image';
import {ImageRequireSource, ImageStyle, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {handleFlex, handleRound, handleSquare, hs} from 'themes/helper';
import {DEFAULT_STYLES} from 'themes/defaultStyles';
import {Size} from 'types/common';

export type ImageProps = Omit<FastImageProps, 'source'> &
  Partial<{
    flex: number | boolean;
    alignSelf: ImageStyle['alignSelf'];
    zIndex: number;
    padding: Size;
    paddingHorizontal: Size;
    paddingVertical: Size;
    paddingLeft: Size;
    paddingTop: Size;
    paddingRight: Size;
    paddingBottom: Size;
    margin: Size;
    marginHorizontal: Size;
    marginVertical: Size;
    marginLeft: Size;
    marginTop: Size;
    marginRight: Size;
    marginBottom: Size;
    safePaddingTop: boolean;
    safePaddingBottom: boolean;
    safeMarginTop: boolean;
    safeMarginBottom: boolean;
    radius: number;
    borderTopLeftRadius: number;
    borderTopRightRadius: number;
    borderBottomRightRadius: number;
    borderBottomLeftRadius: number;
    position: ImageStyle['position'];
    top: Size;
    right: Size;
    bottom: Size;
    left: Size;
    absoluteFillObject: boolean;
    width: Size;
    height: Size;
    maxWidth: Size;
    maxHeight: Size;
    minWidth: Size;
    minHeight: Size;
    round: number;
    square: number;
    backgroundColor: string;
    opacity: number;
    transform: ImageStyle['transform'];
    /**
     * - undefined: (default) fallback no_photo
     * - null: no fallback
     */
    sourceFallback: ImageRequireSource | Source | null;
  }> & {source: ImageRequireSource | Source};

export const Image = ({
  style,
  flex,
  alignSelf,
  zIndex,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingLeft,
  paddingTop,
  paddingRight,
  paddingBottom,
  margin,
  marginHorizontal,
  marginVertical,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  safePaddingTop,
  safePaddingBottom,
  safeMarginTop,
  safeMarginBottom,
  radius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
  borderBottomLeftRadius,
  position,
  top,
  right,
  bottom,
  left,
  absoluteFillObject,
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  round,
  square,
  backgroundColor,
  opacity,
  transform,
  resizeMode = 'cover',
  source,
  ...props
}: ImageProps) => {
  const safeInsets = useSafeAreaInsets();

  const _style = [
    flex !== undefined ? handleFlex(flex) : undefined,
    absoluteFillObject ? DEFAULT_STYLES.absoluteFillObject : undefined,
    round ? handleRound(hs(round)) : undefined,
    square ? handleSquare(hs(square)) : undefined,
    alignSelf ? {alignSelf} : undefined,
    zIndex ? {zIndex} : undefined,
    backgroundColor !== undefined ? {backgroundColor} : undefined,
    opacity !== undefined ? {opacity} : undefined,
    transform !== undefined ? {transform} : undefined,
    //
    padding !== undefined ? {padding: hs(padding)} : undefined,
    paddingVertical !== undefined ? {paddingVertical: hs(paddingVertical)} : undefined,
    paddingHorizontal !== undefined ? {paddingHorizontal: hs(paddingHorizontal)} : undefined,
    safePaddingTop !== undefined ? {paddingTop: safeInsets.top} : undefined,
    safePaddingBottom !== undefined ? {paddingBottom: safeInsets.bottom} : undefined,
    paddingLeft !== undefined ? {paddingLeft: hs(paddingLeft)} : undefined,
    paddingRight !== undefined ? {paddingRight: hs(paddingRight)} : undefined,
    paddingTop !== undefined ? {paddingTop: hs(paddingTop)} : undefined,
    paddingBottom !== undefined ? {paddingBottom: hs(paddingBottom)} : undefined,
    //
    margin !== undefined ? {margin: hs(margin)} : undefined,
    marginVertical !== undefined ? {marginVertical: hs(marginVertical)} : undefined,
    marginHorizontal !== undefined ? {marginHorizontal: hs(marginHorizontal)} : undefined,
    safeMarginTop !== undefined ? {marginTop: safeInsets.top} : undefined,
    safeMarginBottom !== undefined ? {marginBottom: safeInsets.bottom} : undefined,
    marginLeft !== undefined ? {marginLeft: hs(marginLeft)} : undefined,
    marginRight !== undefined ? {marginRight: hs(marginRight)} : undefined,
    marginTop !== undefined ? {marginTop: hs(marginTop)} : undefined,
    marginBottom !== undefined ? {marginBottom: hs(marginBottom)} : undefined,
    //
    radius !== undefined ? {borderRadius: hs(radius)} : undefined,
    borderTopLeftRadius !== undefined ? {borderTopLeftRadius: hs(borderTopLeftRadius)} : undefined,
    borderTopRightRadius !== undefined ? {borderTopRightRadius: hs(borderTopRightRadius)} : undefined,
    borderBottomLeftRadius !== undefined ? {borderBottomLeftRadius: hs(borderBottomLeftRadius)} : undefined,
    borderBottomRightRadius !== undefined ? {borderBottomRightRadius: hs(borderBottomRightRadius)} : undefined,
    //
    position !== undefined ? {position} : undefined,
    left !== undefined ? {left: hs(left)} : undefined,
    top !== undefined ? {top: hs(top)} : undefined,
    right !== undefined ? {right: hs(right)} : undefined,
    bottom !== undefined ? {bottom: hs(bottom)} : undefined,
    //
    width !== undefined ? {width: hs(width)} : undefined,
    height !== undefined ? {height: hs(height)} : undefined,
    maxWidth !== undefined ? {maxWidth: hs(maxWidth)} : undefined,
    maxHeight !== undefined ? {maxHeight: hs(maxHeight)} : undefined,
    minWidth !== undefined ? {minWidth: hs(minWidth)} : undefined,
    minHeight !== undefined ? {minHeight: hs(minHeight)} : undefined,
    //
    StyleSheet.flatten(style),
  ];

  return <FastImage resizeMode={resizeMode} source={source} style={_style} {...props} />;
};
