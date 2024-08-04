/** @format */

import React, {useCallback, useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Block, Button, Text} from 'components/base';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import {useFCMToken} from 'hooks/common';
import {useBiometricAuth} from 'hooks/useBiometricAuth';
import {useDeviceName} from 'react-native-device-info';
import {useAppDispatch} from 'hooks/redux';
import {COLORS} from 'themes/color';
import {formConfig} from './formConfig';
import ModalReferralCode from './components/ModalReferralCode';
import ModalConnectSocial from './components/ModalConnectSocial';

export default function LoginScreen() {
  const {t} = useTranslation();
  const {top, bottom} = useSafeAreaInsets();
  const {isBiometricSupported, isAuthenticated, authenticate} = useBiometricAuth();
  const {control, setValue, handleSubmit} = useForm(formConfig);
  const deviceToken = useFCMToken();
  const deviceName = useDeviceName();

  const [openOption, setOpenOption] = useState(false);
  const [showFormLogin, setShowFormLogin] = useState(false);
  const [openReferralCode, setOpenReferralCode] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <Block flex paddingTop={top + 10} backgroundColor={COLORS.antiFlashWhite}>
      <Block flex justifyContent="flex-start">
        <Text textAlign="center" fontWeight="semibold" fontSize={16}>
          FIT MATE
        </Text>
      </Block>
      <Text flex={1.5} fontWeight="bold" numberOfLines={2} paddingLeft={15} fontSize={55}>
        {t('Login.title')}
      </Text>

      {/* {showFormLogin && <FormLogin control={control} />} */}
      <Block flex justifyContent="flex-end" paddingHorizontal={15} marginBottom={bottom + 10}>
        <Block row>
          <Button flex radius={10} title={t('Login.buttonSubmit')} />
          {/* {isBiometricSupported && account.isActiveBiometrics && (
            <Pressable square={50} padding={10} radius={15} marginLeft={10} backgroundColor={COLORS.dark}>
              <Image square="100%" source={ICONS.ic_faceId} />
            </Pressable>
          )} */}
        </Block>
        <Text
          textAlign="center"
          fontWeight="medium"
          color={COLORS.textPlaceholder}
          marginVertical={15}
          onPress={() => setOpenOption(true)}>
          {t('Login.otherOption')}
        </Text>
      </Block>
      {/* <Button title="Continue with Facebook" iconLeft={<Icon marginRight={10} iconName="facebook" ICONSize={20} iconColor={COLORS.light} IconType={MaterialICONS} />} />
      <Button title="Continue with Google" iconLeft={<Icon marginRight={10} iconName="logo-google" ICONSize={20} iconColor={COLORS.light} IconType={IonICONS} />} /> */}
      <ModalConnectSocial isVisible={openOption} onClose={() => setOpenOption(false)} />
      <ModalReferralCode isVisible={openReferralCode} onClose={() => setOpenReferralCode(false)} />
    </Block>
  );
}
