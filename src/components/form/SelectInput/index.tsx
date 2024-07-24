// import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
// import {BottomSheetFlatList, BottomSheetModal, BottomSheetBackdropProps, BottomSheetTextInput} from '@gorhom/bottom-sheet';
// import {Block, BlockProps, Icon, Image, Pressable, PressableProps, Text, TextProps} from 'components/base';
// import {Control, FieldPath, FieldValues, useController} from 'react-hook-form';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {BottomSheetBackdrop} from 'components/common';
// import {searchIgnoreCaseAccent} from 'util/helper';
// import {StyleSheet} from 'react-native';
// import {COLORS} from 'theme';
// import {useTranslation} from 'react-i18next';

// export type ItemSelectInput<V> = {
//   value: V;
//   label: string;
//   icon?: string;
// };

// export type SelectInputProps<I, F extends FieldValues> = {
//   labelInput?: string;
//   labelPicker?: string;
//   placeholder?: string;
//   data?: I[];
//   haveSearch?: boolean;
//   modalContainerProps?: BlockProps;
//   inputProps?: PressableProps;
//   isFullMode?: boolean;
//   required?: boolean;
//   onSelectItem?: (item: I) => void;
//   labelInputProps?: TextProps;
//   containerProps?: BlockProps;
//   name: FieldPath<F>;
//   control: Control<F>;
//   disabled?: boolean;
// };

// export const SelectInput = <I extends ItemSelectInput<number | string>, F extends FieldValues>({
//   labelInput = '',
//   placeholder = '-- Select --',
//   data = [],
//   inputProps,
//   required,
//   onSelectItem,
//   labelInputProps,
//   containerProps,
//   name,
//   control,
//   disabled,
// }: SelectInputProps<I, F>) => {
//   const {t} = useTranslation();
//   const {bottom} = useSafeAreaInsets();
//   const [search, setSearch] = useState('');
//   const [indexSheet, setIndexSheet] = useState<number>(-1);

//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

//   const snapPoints = ['35%', '80%'];
//   const {
//     field: {onChange, onBlur, value: fValue},
//     fieldState: {error},
//   } = useController({name, control});
//   const [currentItem, setItem] = useState<I>();

//   const backdropComponent = useCallback(
//     (props: BottomSheetBackdropProps) => {
//       return <BottomSheetBackdrop {...props} indexSheet={indexSheet} />;
//     },
//     [indexSheet],
//   );

//   useEffect(() => {
//     bottomSheetModalRef.current?.present();
//   }, []);

//   useEffect(() => {
//     if (fValue !== currentItem?.value) {
//       const item = data.find(x => x.value === fValue);
//       setItem(item);
//     }
//   }, [fValue, data.length]);

//   const hideModal = () => {
//     setSearch('');
//     onBlur();
//   };

//   const itemOnPress = (item: I) => {
//     hideModal();
//     setItem(item);
//     onChange(item.value);
//     onSelectItem?.(item);
//     bottomSheetModalRef.current?.close();
//   };

//   const renderInput = () => {
//     const display = currentItem ? currentItem.label : placeholder;
//     const isEmptyData = !(data?.length > 0);
//     return (
//       <Block {...containerProps}>
//         {labelInput?.length > 0 && (
//           <Text fontSize={16} font="semiBold" marginBottom={10} {...labelInputProps}>
//             {labelInput} {required ? <Text color={'red'}>{'*'}</Text> : null}
//           </Text>
//         )}
//         <Pressable
//           rowCenter
//           disabled={isEmptyData || disabled}
//           onPress={() => {
//             setTimeout(() => {
//               bottomSheetModalRef.current?.snapToIndex(1);
//             }, 100);
//             bottomSheetModalRef.current?.present();
//           }}
//           radius={5}
//           height={45}
//           borderWidth={1}
//           paddingHorizontal={10}
//           borderColor={error?.message ? COLORS.red : COLORS.antiFlashWhite}
//           backgroundColor={isEmptyData ? COLORS.antiFlashWhite : COLORS.white}
//           {...inputProps}>
//           <Text flex color={!currentItem ? COLORS.gray : undefined} numberOfLines={1}>
//             {display}
//           </Text>
//           <Icon type={'Entypo'} size={25} color={COLORS.gray} name="chevron-small-down" />
//         </Pressable>
//         {error?.message ? (
//           <Text color="red" marginTop={5}>
//             {t(error.message)}
//           </Text>
//         ) : null}
//       </Block>
//     );
//   };

//   const renderModal = () => {
//     return (
//       <BottomSheetModal
//         index={-1}
//         ref={bottomSheetModalRef}
//         snapPoints={snapPoints}
//         keyboardBehavior="extend"
//         onChange={setIndexSheet}
//         backdropComponent={backdropComponent}
//         enablePanDownToClose={true}
//         enableDismissOnClose={false}
//         style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
//         {!!labelInput && (
//           <Text font="semiBold" fontSize={16} margin={12} color={COLORS.primary}>
//             {labelInput}
//           </Text>
//         )}
//         <BottomSheetTextInput
//           value={search}
//           style={styles.textInput}
//           onChangeText={setSearch}
//           placeholder="Nhập tên"
//           placeholderTextColor={COLORS.gray}
//         />
//         <BottomSheetFlatList
//           data={search.trim() ? data.filter(d => searchIgnoreCaseAccent(d.label, search.trim())) : data}
//           showsVerticalScrollIndicator={false}
//           keyExtractor={(_, index) => index.toString()}
//           contentContainerStyle={{paddingBottom: bottom}}
//           renderItem={({item, index}) => (
//             <Fragment>
//               {index !== 0 && <Block height={1} backgroundColor={COLORS.antiFlashWhite} />}
//               <Pressable rowCenter radius={5} padding={12} onPress={() => itemOnPress(item)}>
//                 {!!item?.icon && (
//                   <Image source={{uri: item.icon}} resizeMode="contain" width={40} height={35} marginRight={12} />
//                 )}
//                 <Text
//                   flex
//                   font={item.value === currentItem?.value ? 'medium' : 'regular'}
//                   color={item.value === currentItem?.value ? COLORS.primary : COLORS.raisinBlack}>
//                   {item.label || ''}
//                 </Text>
//                 {item.value === currentItem?.value && (
//                   <Icon type="FontAwesome" name="check" marginLeft={12} color={COLORS.primary} />
//                 )}
//               </Pressable>
//             </Fragment>
//           )}
//         />
//       </BottomSheetModal>
//     );
//   };

//   return (
//     <Fragment>
//       {renderInput()}
//       {renderModal()}
//     </Fragment>
//   );
// };

// const styles = StyleSheet.create({
//   textInput: {
//     height: 45,
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     marginHorizontal: 12,
//     marginBottom: 20,
//     color: COLORS.raisinBlack,
//     backgroundColor: COLORS.antiFlashWhite,
//   },
// });
