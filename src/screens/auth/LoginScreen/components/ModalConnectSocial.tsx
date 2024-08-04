/** @format */

import React from 'react';
import {Block, Icon, Modal, Text, Pressable, ModalProps} from 'components/base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'themes/color';

export default function ModalConnectSocial(props: ModalProps) {
  const {bottom} = useSafeAreaInsets();
  // const handleSubmit = () => {
  //   setOpen(false);
  // };

  return (
    <Modal {...props}>
      <Block radius={20} marginBottom={bottom + 15} marginHorizontal={15} backgroundColor={COLORS.antiFlashWhite}>
        <Block padding={15} backgroundColor={COLORS.primary}>
          <Text fontWeight="bold" textAlign="center" fontSize={18}>
            Other Option
          </Text>
          <Icon
            right={15}
            top={15}
            size={20}
            type="AntDesign"
            name="closecircle"
            position="absolute"
            onPress={props.onClose}
            color={COLORS.blackTransparent20}
          />
        </Block>
        <Pressable rowCenter padding={15} borderBottomWidth={1} borderColor={COLORS.background}>
          <Icon marginRight={10} name="logo-google" size={20} type="Ionicons" />
          <Text fontWeight="bold" fontSize={14}>
            Continue with Google
          </Text>
        </Pressable>
        <Pressable rowCenter padding={15}>
          <Icon marginRight={10} type="MaterialIcons" name="facebook" size={20} />
          <Text fontWeight="bold">Continue with Facebook</Text>
        </Pressable>
        <Block height={25} width={'100%'} backgroundColor={COLORS.bg_bottom} />
        <Pressable rowCenter padding={15} borderBottomWidth={1} borderColor={COLORS.background}>
          <Icon
            marginRight={10}
            name="ios-phone-portrait-outline"
            size={20}
            color={COLORS.textPlaceholder}
            type={'Ionicons'}
          />
          <Text fontWeight="bold">Continue with Phone Number</Text>
        </Pressable>
        <Pressable rowCenter padding={15}>
          <Icon marginRight={10} name="mail" size={20} color={COLORS.textPlaceholder} type="Foundation" />
          <Text fontWeight="bold">Continue with Email</Text>
        </Pressable>
        <Block height={25} width={'100%'} backgroundColor={COLORS.bg_bottom} />
      </Block>
    </Modal>
  );
}
