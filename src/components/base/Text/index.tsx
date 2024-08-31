import React from 'react';
import {ColorValue, Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle} from 'react-native';
import {COLORS} from 'themes/color';
// import {COLORS} from 'themes/color';
import {fs, handleFlex, hs} from 'themes/helper';
import {Size} from 'types/shared';

export type TextProps = RNTextProps &
  Partial<{
    flex: number | boolean;
    alignSelf: TextStyle['alignSelf'];
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
    position: TextStyle['position'];
    top: Size;
    right: Size;
    bottom: Size;
    left: Size;
    width: Size;
    height: Size;
    maxWidth: Size;
    maxHeight: Size;
    minWidth: Size;
    minHeight: Size;
    opacity: number;
    transform: TextStyle['transform'];
    fontWeight: TextStyle['fontWeight'];
    //
    color: ColorValue;
    fontSize: number;
    // font: keyof typeof FontBeVietnamPro;
    textAlign: TextStyle['textAlign'];
    textTransform: TextStyle['textTransform'];
    textDecorationLine: TextStyle['textDecorationLine'];
    lineHeight: number;
  }>;

export const Text = ({
  children,
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
  position,
  top,
  right,
  bottom,
  left,
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  opacity,
  transform,
  color = COLORS.textPrimary,
  fontSize = 14,
  fontWeight,
  // font = 'regular',
  textAlign,
  textTransform,
  textDecorationLine,
  lineHeight,
  ...props
}: TextProps) => {
  const _style = [
    {
      includeFontPadding: false,
      color,
      fontSize: fs(fontSize),
      fontWeight: fontWeight,
      // fontFamily: FontBeVietnamPro[font],
    },
    flex !== undefined ? handleFlex(flex) : undefined,
    alignSelf ? {alignSelf} : undefined,
    textAlign ? {textAlign} : undefined,
    textDecorationLine ? {textDecorationLine} : undefined,
    textTransform ? {textTransform} : undefined,
    lineHeight !== undefined ? {lineHeight: hs(lineHeight)} : undefined,
    zIndex !== undefined ? {zIndex} : undefined,
    opacity !== undefined ? {opacity} : undefined,
    transform !== undefined ? {transform} : undefined,
    //
    padding !== undefined ? {padding: hs(padding)} : undefined,
    paddingVertical !== undefined ? {paddingVertical: hs(paddingVertical)} : undefined,
    paddingHorizontal !== undefined ? {paddingHorizontal: hs(paddingHorizontal)} : undefined,
    paddingLeft !== undefined ? {paddingLeft: hs(paddingLeft)} : undefined,
    paddingRight !== undefined ? {paddingRight: hs(paddingRight)} : undefined,
    paddingTop !== undefined ? {paddingTop: hs(paddingTop)} : undefined,
    paddingBottom !== undefined ? {paddingBottom: hs(paddingBottom)} : undefined,
    //
    margin !== undefined ? {margin: hs(margin)} : undefined,
    marginVertical !== undefined ? {marginVertical: hs(marginVertical)} : undefined,
    marginHorizontal !== undefined ? {marginHorizontal: hs(marginHorizontal)} : undefined,
    marginLeft !== undefined ? {marginLeft: hs(marginLeft)} : undefined,
    marginRight !== undefined ? {marginRight: hs(marginRight)} : undefined,
    marginTop !== undefined ? {marginTop: hs(marginTop)} : undefined,
    marginBottom !== undefined ? {marginBottom: hs(marginBottom)} : undefined,
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

  return (
    <RNText {...props} style={_style}>
      {children}
    </RNText>
  );
};
