import React, {Ref, forwardRef, useCallback, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {handleFlex, handleRound, handleSquare, hs} from 'themes/helper';
import {DEFAULT_STYLES} from 'themes/defaultStyles';
import {Size} from 'types/common';
import {
  ColorValue,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export type PressableProps = TouchableOpacityProps &
  Partial<{
    flex: number | boolean;
    row: boolean;
    wrap: boolean;
    rowCenter: boolean;
    contentCenter: boolean;
    alignItems: ViewStyle['alignItems'];
    justifyContent: ViewStyle['justifyContent'];
    alignSelf: ViewStyle['alignSelf'];
    gap: ViewStyle['gap'];
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
    borderStyle: ViewStyle['borderStyle'];
    borderWidth: number;
    borderLeftWidth: number;
    borderTopWidth: number;
    borderRightWidth: number;
    borderBottomWidth: number;
    borderColor: ColorValue;
    borderLeftColor: ColorValue;
    borderTopColor: ColorValue;
    borderRightColor: ColorValue;
    borderBottomColor: ColorValue;
    position: ViewStyle['position'];
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
    backgroundColor: ColorValue;
    opacity: number;
    transform: ViewStyle['transform'];
    preventMultiPress: boolean | number;
  }>;

export const Pressable = forwardRef(
  (
    {
      children,
      style,
      row,
      flex,
      wrap,
      rowCenter,
      contentCenter,
      alignItems,
      justifyContent,
      alignSelf,
      zIndex,
      gap,
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
      borderStyle,
      borderWidth,
      borderLeftWidth,
      borderTopWidth,
      borderRightWidth,
      borderBottomWidth,
      borderColor,
      borderLeftColor,
      borderTopColor,
      borderRightColor,
      borderBottomColor,
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
      preventMultiPress = true,
      onPress,
      ...props
    }: PressableProps,
    ref: Ref<TouchableOpacity>,
  ) => {
    const safeInsets = useSafeAreaInsets();
    const pendingRef = useRef(false);

    const _style = [
      flex !== undefined ? handleFlex(flex) : undefined,
      row ? DEFAULT_STYLES.row : undefined,
      wrap ? DEFAULT_STYLES.wrap : undefined,
      rowCenter ? DEFAULT_STYLES.rowCenter : undefined,
      contentCenter ? DEFAULT_STYLES.contentCenter : undefined,
      absoluteFillObject ? DEFAULT_STYLES.absoluteFillObject : undefined,
      round ? handleRound(hs(round)) : undefined,
      square ? handleSquare(hs(square)) : undefined,
      alignItems ? {alignItems} : undefined,
      justifyContent ? {justifyContent} : undefined,
      alignSelf ? {alignSelf} : undefined,
      zIndex ? {zIndex} : undefined,
      backgroundColor !== undefined ? {backgroundColor} : undefined,
      opacity !== undefined ? {opacity} : undefined,
      transform !== undefined ? {transform} : undefined,
      gap !== undefined ? {gap: hs(gap)} : undefined,

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
      borderWidth !== undefined ? {borderWidth: hs(borderWidth)} : undefined,
      borderTopWidth !== undefined ? {borderTopWidth: hs(borderTopWidth)} : undefined,
      borderLeftWidth !== undefined ? {borderLeftWidth: hs(borderLeftWidth)} : undefined,
      borderRightWidth !== undefined ? {borderRightWidth: hs(borderRightWidth)} : undefined,
      borderBottomWidth !== undefined ? {borderBottomWidth: hs(borderBottomWidth)} : undefined,
      //
      borderColor !== undefined ? {borderColor} : undefined,
      borderLeftColor !== undefined ? {borderLeftColor} : undefined,
      borderTopColor !== undefined ? {borderTopColor} : undefined,
      borderRightColor !== undefined ? {borderRightColor} : undefined,
      borderBottomColor !== undefined ? {borderBottomColor} : undefined,
      borderStyle !== undefined ? {borderStyle} : undefined,
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

    const _onPress: TouchableOpacityProps['onPress'] = useCallback(
      (e: GestureResponderEvent) => {
        if (preventMultiPress) {
          if (!pendingRef.current) {
            pendingRef.current = true;
            setTimeout(
              () => {
                pendingRef.current = false;
              },
              typeof preventMultiPress === 'number' ? preventMultiPress : 500,
            );
            onPress?.(e);
          }
        } else {
          onPress?.(e);
        }
      },
      [onPress, preventMultiPress],
    );

    return (
      <TouchableOpacity onPress={_onPress} ref={ref} {...props} style={_style}>
        {children}
      </TouchableOpacity>
    );
  },
);
