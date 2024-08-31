import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetTextInput,
  BottomSheetBackdropProps,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {COLORS} from 'themes/color';
import {Block, Text} from 'components/base';
import {BottomSheetBackdrop} from 'components/common';
import {useGetMuscle} from 'stores/muscle/apiHook';

export type MuscleListMethods = {
  open: () => void;
  close: () => void;
  clear: () => void;
};

export type MuscleListProps = {};

export const MuscleList = forwardRef<MuscleListMethods, MuscleListProps>(({}, ref) => {
  const {bottom} = useSafeAreaInsets();
  const {data} = useGetMuscle();
  const [textSearch, setTextSearch] = useState('');
  const [indexSheet, setIndexSheet] = useState<number>(-1);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);
  const snapPoints = useMemo(() => ['40%'], []);

  const backdropComponent = useCallback(
    (props: BottomSheetBackdropProps) => {
      return <BottomSheetBackdrop {...props} indexSheet={indexSheet} />;
    },
    [indexSheet],
  );

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetModalRef.current?.snapToIndex(0),
    close: () => bottomSheetModalRef.current?.close(),
    clear: () => setSelected(undefined),
  }));

  return (
    <BottomSheetModal
      index={-1}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      keyboardBehavior="extend"
      onChange={setIndexSheet}
      backdropComponent={backdropComponent}
      enablePanDownToClose={true}
      enableDismissOnClose={false}
      backgroundStyle={{backgroundColor: COLORS.white}}
      style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
      <Text fontWeight={500} fontSize={18} marginBottom={12} paddingHorizontal={15} color={COLORS.primary}>
        Ưu đãi
      </Text>
      <BottomSheetTextInput
        value={textSearch}
        style={styles.textInput}
        onChangeText={setTextSearch}
        placeholder="Nhập mã voucher"
        placeholderTextColor={COLORS.textPlaceholder}
      />
      <BottomSheetFlatList
        ref={flatListRef}
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={index => index.toString()}
        renderItem={({item}) => <Block></Block>}
        contentContainerStyle={{
          paddingBottom: bottom + 10,
          backgroundColor: COLORS.white,
        }}
      />
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 12,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.white,
  },
});
