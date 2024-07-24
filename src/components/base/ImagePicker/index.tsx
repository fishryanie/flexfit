import React from 'react';
import {Block, Icon, Modal, Pressable, Text} from 'components/base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'themes/color';
import {
  Image,
  ImageOrVideo,
  Options,
  PossibleArray,
  Video,
  openCamera,
  openPicker,
} from 'react-native-image-crop-picker';

export type PickerImage = Image;
export type PickerVideo = Video;
export type PickerImageOrVideo = ImageOrVideo;

type MediaType<O> = undefined extends O
  ? PickerImage
  : O extends {mediaType: 'video'}
  ? PickerVideo
  : O extends {mediaType: 'photo'}
  ? PickerImage
  : O extends {mediaType: 'any'}
  ? PickerImageOrVideo
  : PickerImage;

export type ImagePickerProps<O> = {
  onImagePick?: (image: PossibleArray<O, MediaType<O>>) => void;
  disableGallery?: boolean;
  disableCamera?: boolean;
  options?: O;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};
const DEFAULT_OPTION: Options = {mediaType: 'photo', compressImageQuality: 0.4};

export const ImagePicker = <O extends Options | undefined>({
  isVisible,
  setIsVisible,
  onImagePick,
  disableCamera,
  disableGallery,
  options,
}: ImagePickerProps<O>) => {
  const {bottom} = useSafeAreaInsets();
  const _openCamera = () => {
    setIsVisible(false);
    const _options = options ? {...DEFAULT_OPTION, ...options} : DEFAULT_OPTION;
    openCamera(_options)
      .then(image => {
        onImagePick?.(image as PossibleArray<O, MediaType<O>>);
      })
      .catch(() => {});
  };

  const _openGallery = () => {
    setIsVisible(false);
    const _options = options ? {...DEFAULT_OPTION, ...options} : DEFAULT_OPTION;
    openPicker(_options)
      .then(image => {
        onImagePick?.(image as PossibleArray<O, MediaType<O>>);
      })
      .catch(() => {});
  };

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <Block paddingBottom={bottom} backgroundColor="white" borderTopLeftRadius={5} borderTopRightRadius={5}>
        {!disableCamera && (
          <Pressable
            onPress={_openCamera}
            rowCenter
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            paddingVertical={10}
            paddingHorizontal={15}>
            <Icon type={'Entypo'} name="camera" color={COLORS.border} />
            <Text fontWeight="semiBold" marginLeft={10}>
              {'Mở Máy ảnh'}
            </Text>
          </Pressable>
        )}
        {!disableGallery && (
          <Pressable
            onPress={_openGallery}
            rowCenter
            paddingVertical={10}
            paddingHorizontal={15}
            borderColor="lineBreak">
            <Icon type={'MaterialIcons'} name="photo-library" />
            <Text fontWeight="semibold" marginLeft={10}>
              {'Chọn từ máy'}
            </Text>
          </Pressable>
        )}
      </Block>
    </Modal>
  );
};
