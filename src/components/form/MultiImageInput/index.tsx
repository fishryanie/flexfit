import {
  Block,
  BlockProps,
  Icon,
  Image,
  ImagePicker,
  ImageProps,
  Loading,
  PickerImage,
  Pressable,
  PressableProps,
  Text,
} from 'components/base';
import React, {useState} from 'react';
import ImageView from 'react-native-image-viewing';
import {Image as ImageCompressor} from 'react-native-compressor';
import {Control, FieldPath, FieldValues, useController} from 'react-hook-form';
import {CommonOptions, Options} from 'react-native-image-crop-picker';
import {COLORS, reverseHScale, width} from 'theme';
import {IMAGES} from 'assets';
import {idGenerate} from 'util/helper';
import {useUploadPicture} from 'redux/common/apiHooks';

type MultiImageInputProps<F extends FieldValues> = {
  label?: string;
  require?: boolean;
  placeholderTitle?: string;
  name: FieldPath<F>;
  control: Control<F>;
  options?: CommonOptions & Partial<Extract<Options, {mediaType: 'photo'}>> & {multiple?: true};
  containerProps?: BlockProps;
  placeholderProps?: PressableProps;
  imagePreviewProps?: ImageProps;
  placeholderSize?: number;
  /**
   * Max image size in MB
   * 0 = unlimited size
   * @default 5MB
   */
  maxSize?: number;
  /**
   * @default 5
   */
  maxImage?: number;
};

const ITEM_WIDTH = reverseHScale((width - 24) / 4);

export const MultiImageInput = <F extends FieldValues>({
  label,
  placeholderTitle = 'Chọn hình ảnh',
  name,
  control,
  options,
  require,
  containerProps,
  placeholderProps,
  imagePreviewProps,
  maxImage = 5,
}: MultiImageInputProps<F>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [viewAvatarVisible, setViewAvatarVisible] = useState(false);
  const [imagesPicker, setImagesPicker] = useState<PickerImage[]>();
  const {isLoading, request} = useUploadPicture();

  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController({
    name,
    control,
  });

  const onImagePick = async (pickerImages: PickerImage[]) => {
    setImagesPicker(pickerImages);
    const pickerImagesCompressor = await Promise.all(
      pickerImages.map(async (item, index) => {
        const resultImageCompressor = await ImageCompressor.compress(item.path, {maxWidth: 2000, maxHeight: 2000});
        return {
          uri: resultImageCompressor,
          name: `picture_${idGenerate() + index}.jpg`,
          type: item.mime,
        };
      }),
    );
    const resUploadImage = await request({service: 'user', 'picture[]': pickerImagesCompressor});
    if (resUploadImage.data && 'picture' in resUploadImage.data) {
      onChange(resUploadImage.data.picture);
    }
  };

  const onDeleteImage = (index: number) => {
    let arrayUrlImage = value as string[];
    onChange(arrayUrlImage?.filter((_, i) => i !== index));
    setImagesPicker(imagesPicker?.filter((_, i) => i !== index));
  };

  const renderPlaceHolder = () => {
    return (
      <Pressable
        contentCenter
        radius={10}
        borderWidth={1}
        square={ITEM_WIDTH}
        borderStyle="dashed"
        borderColor={COLORS.gray}
        backgroundColor={COLORS.antiFlashWhite}
        onPress={() => setModalVisible(true)}
        {...placeholderProps}>
        <Image source={IMAGES.img_upload} square={ITEM_WIDTH / 3} resizeMode="contain" />
        {placeholderTitle ? (
          <Text fontSize={12} marginTop={6} color={COLORS.gray}>
            {imagesPicker ? `${imagesPicker.length} / ${maxImage}` : placeholderTitle}
          </Text>
        ) : null}
      </Pressable>
    );
  };

  const renderImagePreview = () => {
    return imagesPicker?.map((x, i) => (
      <Pressable onPress={() => setViewAvatarVisible(true)}>
        <Image
          key={x.path}
          radius={10}
          marginRight={10}
          marginBottom={10}
          source={{uri: x.path}}
          resizeMode="cover"
          square={ITEM_WIDTH}
          {...imagePreviewProps}
        />
        <Pressable position="absolute" right={12} top={2} onPress={() => onDeleteImage(i)}>
          <Icon type="AntDesign" name="closecircle" size={20} color={COLORS.gray} />
        </Pressable>
      </Pressable>
    ));
  };

  return (
    <Block {...containerProps}>
      <Loading visible={isLoading} />
      {label ? (
        <Text fontSize={16} font="semiBold" marginBottom={10}>
          {label} {require && <Text color={COLORS.red}>*</Text>}
        </Text>
      ) : null}

      <Block row wrap>
        {imagesPicker ? renderImagePreview() : null}
        {!imagesPicker || imagesPicker.length < maxImage ? renderPlaceHolder() : null}
      </Block>
      {error?.message ? (
        <Text color={COLORS.red} fontSize={14} marginTop={8}>
          {error.message}
        </Text>
      ) : null}
      {modalVisible && (
        <ImagePicker
          isVisible={true}
          setIsVisible={setModalVisible}
          onImagePick={onImagePick}
          options={{...options, multiple: true, maxFiles: maxImage}}
        />
      )}
      <ImageView
        imageIndex={0}
        visible={viewAvatarVisible}
        presentationStyle="overFullScreen"
        images={imagesPicker?.map(e => ({uri: e.path}))!}
        onRequestClose={() => setViewAvatarVisible(false)}
      />
    </Block>
  );
};
