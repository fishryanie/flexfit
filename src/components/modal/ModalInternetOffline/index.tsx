import React, {useEffect, useRef, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {saveDeviceIp} from 'stores/other/slice';
import {Block, Text} from 'components/base';
import {useAppDispatch} from 'hooks/redux';
import {getDeviceIp} from 'utils/helper';
import {Timeout} from 'types/common';
import {COLORS} from 'themes/color';

export const ModalInternetOffline = () => {
  const {isInternetReachable} = useNetInfo();
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const timeout = useRef<Timeout>();

  useEffect(() => {
    if (isInternetReachable) {
      getDeviceIp().then(ip => {
        dispatch(saveDeviceIp(ip));
      });
      setShow(false);
    } else {
      timeout.current = setTimeout(
        () => {
          setShow(true);
        },
        isInternetReachable === false ? 2000 : 5000,
      );
    }
    return () => {
      clearTimeout(timeout.current);
    };
  }, [isInternetReachable, dispatch]);

  return show ? (
    <Block absoluteFillObject backgroundColor={COLORS.white} contentCenter zIndex={20}>
      <Text>{'Vui lòng kiểm tra lại kết nối'}</Text>
    </Block>
  ) : null;
};
