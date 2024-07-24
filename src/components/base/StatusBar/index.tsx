import React from 'react';
import {StatusBar as RNStatusBar, StatusBarProps} from 'react-native';

export const StatusBar = ({
  translucent = true,
  backgroundColor = 'transparent',
  barStyle = 'light-content',
  ...props
}: StatusBarProps) => {
  return <RNStatusBar {...{...props, translucent, backgroundColor, barStyle}} />;
};
