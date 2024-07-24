import {StyleSheet} from 'react-native';
import {COLORS} from './color';

export const DEFAULT_STYLES = StyleSheet.create({
  row: {flexDirection: 'row'},
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
  contentCenter: {justifyContent: 'center', alignItems: 'center'},
  wrap: {flexWrap: 'wrap'},
  absoluteFillObject: StyleSheet.absoluteFillObject,
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.black,
  },
});
