/** @format */

import React, {useState} from 'react';
import {Block, Icon, Modal, Text, Pressable, ModalProps, Loading} from 'components/base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useLoginSocial} from 'stores/auth/apiHooks';
import {COLORS} from 'themes/color';
import {Platform} from 'react-native';
import useAccountLink from 'hooks/accountLink';

export default function ModalConnectSocial(props: ModalProps) {
  const [isLoadingSocial, setLoadingSocial] = useState(false);
  const {bottom} = useSafeAreaInsets();
  const {isLoading, request} = useLoginSocial();
  const {appleSignIn, googleSignIn} = useAccountLink();
  const handleLoginSocial = async (type: 'google' | 'facebook' | 'apple') => {
    setLoadingSocial(true);
    let profile;
    if (type === 'apple') {
      profile = await appleSignIn();
    } else if (type === 'google') {
      profile = await googleSignIn();
    }
    if (profile?.user.providerData[0]) {
      const {uid, email, displayName, photoURL} = profile.user.providerData[0];
      request({uid, email, displayName, picture: photoURL}).then(() => {
        props.setIsVisible?.(false);
      });
    }
    setLoadingSocial(false);
  };

  return (
    <Modal {...props} onBackdropPress={props.onClose}>
      <Loading visible={isLoadingSocial || isLoading} />
      <Block
        gap={1}
        radius={30}
        paddingBottom={35}
        marginHorizontal={15}
        marginBottom={bottom + 15}
        backgroundColor={COLORS.antiFlashWhite}>
        <Block rowCenter padding={15}>
          <Block flexGrow={1} flexBasis={0} justifyContent="flex-start" />
          <Text fontWeight={600} fontSize={18}>
            Other Option
          </Text>
          <Block flexGrow={1} flexBasis={0} justifyContent="flex-end">
            <Pressable onPress={props.onClose} alignSelf="flex-end">
              <Icon type="Ionicons" name="close-circle" color={COLORS.blackTransparent20} />
            </Pressable>
          </Block>
        </Block>
        <Pressable
          rowCenter
          gap={10}
          padding={15}
          backgroundColor={COLORS.white}
          onPress={() => handleLoginSocial('google')}>
          <Icon name="logo-google" type="Ionicons" />
          <Text fontWeight={600} fontSize={16}>
            Continue with Google
          </Text>
        </Pressable>
        {Platform.OS === 'ios' && (
          <Pressable
            rowCenter
            gap={10}
            padding={15}
            backgroundColor={COLORS.white}
            onPress={() => handleLoginSocial('apple')}>
            <Icon type="Ionicons" name="logo-apple" />
            <Text fontWeight={600} fontSize={16}>
              Continue with Apple
            </Text>
          </Pressable>
        )}
        <Block height={12} gap={10} backgroundColor={COLORS.antiFlashWhite} />
        <Pressable rowCenter padding={15} backgroundColor={COLORS.white}>
          <Icon marginRight={10} name="mail" type="MaterialIcons" />
          <Text fontWeight={600} fontSize={16}>
            Continue with Email
          </Text>
        </Pressable>
        <Pressable rowCenter gap={10} padding={15} backgroundColor={COLORS.white}>
          <Icon name="local-phone" type="MaterialIcons" />
          <Text fontWeight={600} fontSize={16}>
            Continue with Phone Number
          </Text>
        </Pressable>
      </Block>
    </Modal>
  );
}
