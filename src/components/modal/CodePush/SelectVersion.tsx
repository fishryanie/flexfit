import React, {Fragment, useCallback, useEffect, useState} from 'react';
import CodePush, {LocalPackage, RemotePackage} from 'react-native-code-push';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Block, Loading, Modal, Switch, Text} from 'components/base';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {onToggleSelectCodePush} from 'stores/app/slice';
import {CODE_PUSH_DEPLOYMENT_KEY} from 'utils/constants';
import {Vibration, Platform} from 'react-native';
import {displayVersion, sleep} from 'utils/helper';
import {RestartApp} from 'components/modal';
import {COLORS} from 'themes/color';
import {hs} from 'themes/helper';

type CodePushItemList = {name: string; key: string; update: RemotePackage | null};
type SelectVersionProps = {
  isLoadingDownload: boolean;
  onUpdate: (deploymentKey: string, immediate: boolean) => void;
};

export const SelectVersion: React.FC<SelectVersionProps> = ({isLoadingDownload, onUpdate}) => {
  const dispatch = useAppDispatch();
  const {bottom} = useSafeAreaInsets();
  const {isShowSelectCodePush} = useAppSelector(state => state.app);
  const [isShowRestartAppModal, setShowRestartAppModal] = useState(false);
  const [isLoadingCheckCodePush, setLoadingCheckCodePush] = useState(false);
  const [listUpdate, setListUpdate] = useState<CodePushItemList[]>([]);
  const [currentCodepush, setCurrentCodepush] = useState<LocalPackage | null>(null);

  const switchCodePushHandler = (itemCodePush: CodePushItemList) => {
    if (itemCodePush.key === currentCodepush?.deploymentKey) {
      CodePush.clearUpdates();
      return sleep(500).then(() => setShowRestartAppModal(true));
    }
    onUpdate(itemCodePush.key, true);
  };

  const disabledKeyCodePush = (itemCodePush: CodePushItemList): boolean => {
    if (itemCodePush.update === null && currentCodepush?.deploymentKey !== itemCodePush.key) {
      return true;
    } else if (currentCodepush?.deploymentKey && itemCodePush.update === null) {
      return false;
    } else {
      return false;
    }
  };

  const closeSelectCodePushHandler = () => {
    setListUpdate([]);
    setCurrentCodepush(null);
    dispatch(onToggleSelectCodePush(false));
  };

  const getUpdateCheckCodePush = useCallback(async () => {
    if (isShowSelectCodePush && !isLoadingCheckCodePush && !listUpdate.length) {
      try {
        setLoadingCheckCodePush(true);
        Vibration.vibrate(Platform.OS === 'android' ? 400 : [0]);
        const running = await CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING);
        setCurrentCodepush(running);
        const listDeployment = await Promise.all(
          Object.entries(CODE_PUSH_DEPLOYMENT_KEY).map(async ([name, key]) => {
            try {
              const update = await CodePush.checkForUpdate(key);
              return {name, key, update};
            } catch (error) {
              return {name, key, update: null};
            }
          }),
        );
        setListUpdate(listDeployment);
      } catch (error) {
        console.log('🚀 ~ initCodePush ~ error:', error);
      } finally {
        setLoadingCheckCodePush(false);
      }
    }
  }, [isShowSelectCodePush, isLoadingCheckCodePush, listUpdate.length]);

  useEffect(() => {
    getUpdateCheckCodePush();
  }, [getUpdateCheckCodePush]);

  if (isLoadingCheckCodePush) {
    return <Loading visible={isLoadingCheckCodePush} />;
  }

  if (!listUpdate.length) {
    return null;
  }

  return (
    <Fragment>
      <RestartApp
        position="center"
        containerStyle={{bottom: hs(50)}}
        isVisible={isShowRestartAppModal}
        title="Đã gỡ bỏ bản cập nhật"
        subtitle="Hãy khởi động lại ứng dụng"
      />
      <Modal position="bottom" isVisible={isShowSelectCodePush} onBackdropPress={closeSelectCodePushHandler}>
        <Block
          gap={20}
          radius={20}
          paddingVertical={20}
          marginHorizontal={15}
          paddingHorizontal={15}
          marginBottom={bottom || 15}
          backgroundColor={COLORS.white}>
          <Block gap={3} marginBottom={15}>
            <Text fontSize={20} fontWeight="bold" color={COLORS.chineseOrange}>
              Phiên bản ứng dụng
            </Text>
            <Text color={COLORS.textPlaceholder}>{displayVersion()}</Text>
          </Block>
          {listUpdate.map(item => (
            <Block rowCenter key={item.key} opacity={disabledKeyCodePush(item) ? 0.5 : undefined}>
              <Block flex gap={3} marginRight={30}>
                <Block rowCenter gap={12}>
                  <Text fontSize={16} fontWeight="bold">
                    {item.name}
                  </Text>
                  {/* {item.isNewVersion && (
             <Pressable>
               <Icon type="MaterialCommunityIcons" name="cloud-download" />
             </Pressable>
           )} */}
                </Block>
                <Text numberOfLines={2} color={COLORS.textPlaceholder}>
                  {currentCodepush?.deploymentKey === item.key
                    ? currentCodepush.description
                    : item.update?.description || 'Chưa có bản cập nhật nào'}
                </Text>
              </Block>
              <Switch
                value={isLoadingDownload || currentCodepush?.deploymentKey === item.key}
                onChange={() => switchCodePushHandler(item)}
                activeColor={COLORS.chineseOrange}
              />
            </Block>
          ))}
        </Block>
      </Modal>
    </Fragment>
  );
};
