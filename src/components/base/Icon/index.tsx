import React from 'react';
import {StyleSheet, TextStyle} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import {IconProps as VIconProps} from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import {COLORS} from 'themes/color';
import {handleFlex, hs} from 'themes/helper';
import {Size} from 'types/shared';

export type IconType =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome6'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'SimpleLineIcons'
  | 'Octicons'
  | 'Zocial'
  | 'Fontisto';

export type IconProps = VIconProps &
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
    //
    textAlign: TextStyle['textAlign'];
    solid: boolean;
    light: boolean;
  }> & {type: IconType};

export const Icon = ({
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
  size = 25,
  textAlign,
  ...props
}: IconProps) => {
  const _style = [
    {
      includeFontPadding: false,
    },
    flex !== undefined ? handleFlex(flex) : undefined,
    alignSelf ? {alignSelf} : undefined,
    textAlign ? {textAlign} : undefined,
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

  switch (props.type) {
    case 'AntDesign':
      return <AntDesign {...props} color={color} size={hs(size)} style={_style} />;
    case 'Entypo':
      return <Entypo {...props} color={color} size={hs(size)} style={_style} />;
    case 'EvilIcons':
      return <EvilIcons {...props} color={color} size={hs(size)} style={_style} />;
    case 'Feather':
      return <Feather {...props} color={color} size={hs(size)} style={_style} />;
    case 'FontAwesome':
      return <FontAwesome {...props} color={color} size={hs(size)} style={_style} />;
    case 'FontAwesome5':
      return <FontAwesome5 {...props} color={color} size={hs(size)} style={_style} />;
    case 'FontAwesome6':
      return <FontAwesome6 {...props} color={color} size={hs(size)} style={_style} />;
    case 'Foundation':
      return <Foundation {...props} color={color} size={hs(size)} style={_style} />;
    case 'Ionicons':
      return <Ionicons {...props} color={color} size={hs(size)} style={_style} />;
    case 'MaterialIcons':
      return <MaterialIcons {...props} color={color} size={hs(size)} style={_style} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...props} color={color} size={hs(size)} style={_style} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons {...props} color={color} size={hs(size)} style={_style} />;
    case 'Octicons':
      return <Octicons {...props} color={color} size={hs(size)} style={_style} />;
    case 'Zocial':
      return <Zocial {...props} color={color} size={hs(size)} style={_style} />;
    case 'Fontisto':
      return <Fontisto {...props} color={color} size={hs(size)} style={_style} />;
    default:
      return null;
  }
};
