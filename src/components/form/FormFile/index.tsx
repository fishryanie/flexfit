import React, {ReactElement, useState} from 'react';
import DocumentPicker, {DocumentPickerResponse} from 'react-native-document-picker';
import {Control, FieldError, FieldPath, FieldValues, useController} from 'react-hook-form';
import {Block, BlockProps, Button, Loading, Text, TextProps} from 'components/base';
import {useUploadPicture} from 'redux/common/apiHooks';
import {COLORS} from 'theme';
import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';

type FormFileProps<F extends FieldValues> = {
  label?: string;
  required?: boolean;
  name: FieldPath<F>;
  control: Control<F>;
  messageError?: string;
  errProps?: TextProps;
  titleButton?: string;
  placeholder?: string;
  renderError?: (error?: FieldError) => ReactElement;
  containerProps?: BlockProps;
};

export const FormFile = <F extends FieldValues>({
  name,
  label,
  required,
  control,
  titleButton = 'Chọn tệp',
  placeholder = 'Chưa có tệp nào được chọn',
  messageError,
  renderError,
  containerProps,
}: FormFileProps<F>) => {
  const {t} = useTranslation();
  const {isLoading, request} = useUploadPicture();
  const [file, setFile] = useState<DocumentPickerResponse[] | null>(null);
  const {
    field: {onChange},
    fieldState: {error},
  } = useController({name, control});

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setFile(res);
      const resultUploadFile = await request({
        service: 'user',
        'picture[]': {uri: res[0].uri, name: `picture_${Date.now()}.pdf`, type: res[0].type || ''},
      });
      if (resultUploadFile.data && 'picture' in resultUploadFile.data) {
        onChange(resultUploadFile.data.picture[0]);
      } else {
        Alert.alert(resultUploadFile.data?.error[0].detail || 'upload lỗi');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error occurred:', err);
      }
    }
  };

  const _renderError = () => {
    return renderError ? (
      renderError(error)
    ) : messageError || error?.message ? (
      <Text marginTop={5} fontSize={14} color={'red'}>
        {t(messageError!) || t(error?.message!)}
      </Text>
    ) : null;
  };

  return (
    <Block {...containerProps}>
      <Loading visible={isLoading} />
      {label && label.length > 0 && (
        <Text font="semiBold" fontSize={16} marginBottom={10}>
          {label}
          {required && <Text color={'red'}> *</Text>}
        </Text>
      )}
      <Block
        rowCenter
        radius={5}
        height={45}
        borderWidth={1}
        paddingHorizontal={5}
        borderColor={messageError || error?.message ? 'red' : COLORS.antiFlashWhite}>
        <Button
          title={titleButton}
          height={35}
          fontSize={13}
          font="regular"
          radius={5}
          marginRight={12}
          paddingHorizontal={15}
          color={COLORS.raisinBlack}
          backgroundColor={COLORS.antiFlashWhite}
          onPress={pickFile}
        />
        <Text flex color={COLORS.gray}>
          {file ? file[0].name : placeholder}
        </Text>
      </Block>
      {_renderError()}
    </Block>
  );
};
