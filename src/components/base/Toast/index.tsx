import React from 'react';
import Toast, {ToastConfigParams} from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Block, Pressable, Text} from 'components/Base';
import {rhs, width} from 'themes/helper';
import {COLORS} from 'themes/color';
import {Image} from 'react-native';
import {ICONS} from 'assets';

const iconToast = {
  success: ICONS.ic_toastSuccessIcon,
  warning: ICONS.ic_toastWarningIcon,
  error: ICONS.ic_toastErrorIcon,
};

const textColor = {
  success: '#1f8722',
  warning: '#f08135',
  error: '#d9100a',
};

const bgIconToast = {
  success: '#def1d7',
  warning: '#fef7ec',
  error: '#fae1db',
};

export type ToastMessageProps = {
  status: 'error' | 'success' | 'warning';
  action: {title: string; onPress: () => void};
};

export const CustomToast = () => {
  const {top} = useSafeAreaInsets();
  return <Toast topOffset={top + 12} visibilityTime={8000} config={{ToastMessage}} />;
};

export const ToastMessage = (params: ToastConfigParams<ToastMessageProps>) => {
  const {
    text1,
    text2,
    props: {status, action},
  } = params;
  return (
    <Block
      radius={18}
      padding={12}
      width={rhs(width - 30)}
      borderColor={textColor[status]}
      backgroundColor={bgIconToast[status]}>
      <Block row alignItems={text2 ? undefined : 'center'}>
        <Image width={30} height={30} resizeMode="contain" source={iconToast[status]} />
        <Block flex marginLeft={15}>
          {!!text1 && (
            <Text fontWeight={600} fontSize={16} color={textColor[status]}>
              {text1}
            </Text>
          )}
          {!!text2 && <Text color={textColor[status]}>{text2}</Text>}
        </Block>
        <Pressable contentCenter square={30} onPress={() => Toast.hide()}>
          <Image source={{uri: ICONS.icClose}} width={16} height={16} tintColor={COLORS.textPrimary} />
        </Pressable>
      </Block>
      {action && (
        <Pressable
          marginLeft={45}
          marginTop={12}
          onPress={() => {
            Toast.hide();
            action.onPress();
          }}>
          <Text fontWeight={'black'} color={textColor[status]}>
            {action?.title}
          </Text>
        </Pressable>
      )}
    </Block>
  );
};
