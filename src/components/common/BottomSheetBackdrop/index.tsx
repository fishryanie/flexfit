import React from 'react';
import {BottomSheetBackdrop as BSBackdrop, BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import {useManufacturer} from 'react-native-device-info';
import {COLORS} from 'themes/color';

export const BottomSheetBackdrop = ({indexSheet, ...props}: BottomSheetBackdropProps & {indexSheet: number}) => {
  const {result} = useManufacturer();

  let appearsOnIndex = 1;
  let disappearsOnIndex = -1;

  if (result === 'Xiaomi') {
    appearsOnIndex = indexSheet === -1 ? 0 : 1;
    disappearsOnIndex = indexSheet === -1 ? 0 : -1;
  }

  return (
    <BSBackdrop
      {...props}
      pressBehavior="close"
      appearsOnIndex={appearsOnIndex}
      disappearsOnIndex={disappearsOnIndex}
      style={[props.style, {backgroundColor: COLORS.black}]}
    />
  );
};
