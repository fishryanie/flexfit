import React, {ReactElement, useState} from 'react';
import ImageView from 'react-native-image-viewing';
import {Image as ImageCompressor} from 'react-native-compressor';
import {Control, FieldError, FieldPath, FieldValues, useController} from 'react-hook-form';
import {Block, BlockProps, Icon, ImagePicker, Loading, PickerImage, Pressable, TextProps} from 'components/base';
import {Avatar, AvatarProps} from 'components/common';
import {useUploadPicture} from 'redux/common/apiHooks';
import {COLORS} from 'theme';
import {IMAGES} from 'assets';
import {Alert} from 'react-native';

type FormAvatarProps<F extends FieldValues> = {
  label?: string;
  required?: boolean;
  name: FieldPath<F>;
  control: Control<F>;
  messageError?: string;
  errProps?: TextProps;
  renderError?: (error?: FieldError) => ReactElement;
  containerProps?: BlockProps;
};

export const FormAvatar = <F extends FieldValues>({
  name,
  control,
  containerProps,
  ...props
}: FormAvatarProps<F> & AvatarProps) => {
  const [viewAvatarVisible, setViewAvatarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {isLoading, request} = useUploadPicture();

  const {
    field: {value, onChange},
  } = useController({name, control});

  const handleImagePick = async (img: PickerImage) => {
    try {
      const result = await ImageCompressor.compress(img.path, {maxWidth: 2000, maxHeight: 2000});
      const res = await request({
        service: 'user',
        'picture[]': {uri: result, name: `picture_${Date.now()}.jpg`, type: img.mime},
      });
      if (res.data && 'picture' in res.data) {
        onChange(res.data.picture[0]);
      } else {
        Alert.alert(res.data?.error[0].detail || 'upload lỗi');
      }
    } catch (err) {
      onChange(undefined);
    }
  };

  return (
    <Block {...containerProps}>
      <Loading visible={isLoading} />
      <Avatar uri={value} {...props} onPress={() => setViewAvatarVisible(true)} />
      <Pressable
        right={0}
        bottom={0}
        contentCenter
        position="absolute"
        round={props.size ? props.size / 3 : 25}
        backgroundColor={COLORS.blackTransparent['30']}
        onPress={() => setModalVisible(true)}>
        <Icon type="FontAwesome" name="camera" size={props.size ? props.size / 6 : 14} color={COLORS.white} />
      </Pressable>
      <ImageView
        imageIndex={0}
        visible={viewAvatarVisible}
        presentationStyle="overFullScreen"
        images={[props.uri || IMAGES.img_noUserProfile]}
        onRequestClose={() => setViewAvatarVisible(false)}
      />
      {modalVisible && (
        <ImagePicker isVisible={true} setIsVisible={setModalVisible} onImagePick={handleImagePick} options={{}} />
      )}
    </Block>
  );
};
