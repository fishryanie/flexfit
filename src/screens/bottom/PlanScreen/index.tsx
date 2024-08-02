import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {Block, WheelNumberPicker, WheelPicker} from 'components/base';
import {width} from 'themes/helper';

const HOURS = Array(12)
  .fill(0)
  .map((_, index) => {
    return {
      value: index,
      label: index < 10 ? '0' + index : index,
    };
  });

export default function PlanScreen() {
  //makes array infinite(not truly infinite) (array.length >= 3 required)

  return (
    <Block paddingTop={250}>
      <WheelPicker data={HOURS} />
    </Block>
  );
}
