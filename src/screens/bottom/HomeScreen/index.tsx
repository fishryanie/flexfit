import React from 'react';
import moment from 'moment';
import {Block, Icon, Pressable, Text} from 'components/base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'themes/color';
import {Avatar} from 'components/common';
import {BarChart} from 'react-native-gifted-charts';
import {width} from 'themes/helper';
import SegmentedControl from './components/SegmentedControl';
import {useAppDispatch} from 'hooks/redux';
import {onToggleDrawer} from 'stores/app/slice';

const barData = [
  {value: 250, label: 'Mon'},
  {value: 500, label: 'Tue'},
  {value: 745, label: 'Wed'},
  {value: 320, label: 'Thu'},
  {value: 600, label: 'Fri'},
  {value: 256, label: 'Sat'},
  {value: 300, label: 'Sun'},
  {value: 500, label: 'Tue'},
  {value: 745, label: 'Wed'},
  {value: 320, label: 'Thu'},
  {value: 600, label: 'Fri'},
  {value: 256, label: 'Sat'},
  {value: 300, label: 'Sun'},
];

export default function HomeScreen() {
  return (
    <Block flex backgroundColor={COLORS.white}>
      <Header />
      <Block paddingHorizontal={12}>
        <Text fontSize={30} fontWeight={700} marginBottom={20} color={COLORS.primary} style={{letterSpacing: 1}}>
          Activities
        </Text>
        <SegmentedControl />
        <Block gap={5} marginBottom={20}>
          <Pressable rowCenter gap={8}>
            <Text fontSize={18} fontWeight={'bold'} color={COLORS.chineseOrange}>
              {moment().format('MMMM, YYYY')}
            </Text>
            <Icon type="Entypo" name="chevron-down" color={COLORS.chineseOrange} />
          </Pressable>
          <Text fontSize={12} color={COLORS.textPlaceholder}>
            Total steps
          </Text>
          <Text fontSize={20} fontWeight={'bold'}>
            8212
          </Text>
        </Block>

        <BarChart
          spacing={12}
          showGradient
          minHeight={3}
          barWidth={12}
          data={barData}
          barBorderRadius={3}
          width={width - 80}
          noOfSections={4}
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisLabelsVerticalShift={2}
          frontColor={COLORS.chineseOrange}
          gradientColor={COLORS.chineseOrange}
          xAxisLabelTextStyle={{color: COLORS.textPlaceholder}}
          yAxisTextStyle={{color: COLORS.textPlaceholder}}
          animationDuration={300}
          isAnimated
        />
      </Block>
    </Block>
  );
}

const Header = () => {
  const dispatch = useAppDispatch();
  const {top} = useSafeAreaInsets();

  return (
    <Block rowCenter paddingTop={top + 12} paddingHorizontal={12} gap={20} marginBottom={20}>
      <Pressable rowCenter gap={12} onPress={() => dispatch(onToggleDrawer(true))}>
        <Avatar name="Phan Hồng Quân" />
        <Block gap={5}>
          <Text fontSize={14} color={COLORS.textPlaceholder}>
            Wellcome 👋
          </Text>
          <Text fontSize={16} fontWeight={'semibold'} color={COLORS.textPlaceholder}>
            Phan Hồng Quân
          </Text>
        </Block>
      </Pressable>
      <Block flex rowCenter gap={20} justifyContent="flex-end">
        <Pressable>
          <Icon type="Feather" name="search" size={22} />
        </Pressable>
        <Pressable>
          <Icon type="Fontisto" name="bell" size={22} />
        </Pressable>
        <Pressable>
          <Icon type="MaterialCommunityIcons" name="qrcode-scan" size={22} />
        </Pressable>
      </Block>
    </Block>
  );
};
