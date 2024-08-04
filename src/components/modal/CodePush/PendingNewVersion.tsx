import React from 'react';
import LottieView from 'lottie-react-native';
import {DownloadProgress} from 'react-native-code-push';
import {Block, Modal, ModalProps, ProgressBar, Text} from 'components/base';
import {COLORS} from 'themes/color';
import {LOTTIE} from 'assets';
import {hs} from 'themes/helper';

const PendingNewVersion: React.FC<Partial<DownloadProgress> & ModalProps> = ({receivedBytes, totalBytes, ...props}) => {
  return (
    <Modal position="center" containerStyle={{bottom: hs(50)}} {...props}>
      <Block radius={20} marginHorizontal={15} paddingHorizontal={12} backgroundColor={COLORS.white}>
        <Block height={135} alignItems="center" style={{overflow: 'hidden'}}>
          <LottieView loop autoPlay source={LOTTIE.update} style={{width: 200, height: 200, bottom: 10}} />
        </Block>
        <Text lineHeight={25} textAlign="center" fontSize={16} fontWeight="semibold">
          {'Đang cập nhật dữ liệu\nXin vui lòng đợi trong ít phút...'}
        </Text>
        <ProgressBar
          value={receivedBytes}
          total={totalBytes}
          width={'75%'}
          marginVertical={20}
          alignSelf="center"
          backgroundColor={COLORS.antiFlashWhite}
        />
      </Block>
    </Modal>
  );
};

export default PendingNewVersion;
