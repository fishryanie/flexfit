import React, {useState} from 'react';

import {StyleSheet, Platform} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {COLORS} from 'themes/color';
import {width} from 'themes/helper';
import {Block, Button, Icon, Image, Modal, Pressable, Text} from 'components/base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigationRef} from 'routers';

type HealthMetrics = 'BMI' | 'BMR' | 'TDEE';
type HealthMetricsItemList = {title: HealthMetrics; value: string; image_url: string; calculationFormula: string};

const listHealthMetrics: HealthMetricsItemList[] = [
  {
    title: 'BMI',
    value: '1800',
    image_url: 'https://cdn-icons-png.flaticon.com/128/4349/4349071.png',
    calculationFormula: '',
  },
  {
    title: 'TDEE',
    value: '1800',
    image_url: 'https://cdn-icons-png.flaticon.com/128/8923/8923711.png',
    calculationFormula: '',
  },
  {
    title: 'BMR',
    value: '1800',
    image_url: 'https://cdn-icons-png.flaticon.com/128/4514/4514739.png',
    calculationFormula: '',
  },
];

export const constants = {
  padding: 16,
  margin: 10,
  titleSize: 28,
  textSize: 20,
  subtextSize: 18,
  headerButtonWidth: 40,
  name: 'Developer',
  membersCount: 2,
};

export default function AccountInfoScreen() {
  const scrollY = useSharedValue(0);
  const {bottom} = useSafeAreaInsets();
  const [showInfoHealthMetrics, setShowInfoHealthMetrics] = useState<HealthMetricsItemList>();

  const handleScroll = useAnimatedScrollHandler(e => {
    scrollY.value = e.contentOffset.y;
  });

  const offsetValue = 140;
  const animatedHeader = useAnimatedStyle(() => {
    const headerInitialHeight = 130;
    const headerNextHeight = Platform.OS === 'ios' ? 110 : 120;
    const height = interpolate(
      scrollY.value,
      [0, offsetValue],
      [headerInitialHeight, headerNextHeight],
      Extrapolation.CLAMP,
    );

    const backgroundColor = interpolateColor(scrollY.value, [0, offsetValue], [COLORS.antiFlashWhite, COLORS.primary]);
    return {
      backgroundColor,
      height,
    };
  });
  const iconAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 100, offsetValue], [0, 0, 1], Extrapolation.CLAMP);
    return {opacity};
  });
  const nameAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 100, offsetValue], [0, 0, 1], Extrapolation.CLAMP);
    const translateX = interpolate(scrollY.value, [0, offsetValue], [-28, 0], Extrapolation.CLAMP);
    const translateY = interpolate(scrollY.value, [0, offsetValue], [28, 0], Extrapolation.CLAMP);
    return {opacity, transform: [{translateX}, {translateY}]};
  });
  const animImage = useAnimatedStyle(() => {
    const yValue = Platform.OS === 'ios' ? 54 : 45;
    const translateY = interpolate(scrollY.value, [0, offsetValue], [0, -yValue], Extrapolation.CLAMP);

    const xValue = width / 2 - 2 * constants.padding - constants.headerButtonWidth;
    const translateX = interpolate(scrollY.value, [0, offsetValue], [0, -xValue], Extrapolation.CLAMP);

    const scale = interpolate(scrollY.value, [0, offsetValue], [1, 0.3], Extrapolation.CLAMP);
    return {
      transform: [{translateY}, {translateX}, {scale}],
    };
  });

  return (
    <Block flex backgroundColor={COLORS.antiFlashWhite}>
      {/* header */}
      <Animated.View style={[styles.header, animatedHeader]}>
        <Pressable contentCenter position="relative" padding={8} onPress={navigationRef.goBack}>
          <Icon position="absolute" type="MaterialIcons" name="arrow-back" size={25} />
          <Animated.View style={iconAnimatedStyles}>
            <Icon type="MaterialIcons" name="arrow-back" size={25} color={COLORS.white} />
          </Animated.View>
        </Pressable>
        <Animated.View style={[nameAnimatedStyles]}>
          <Text style={styles.headerTitle}>{constants.name}</Text>
        </Animated.View>
        <Block rowCenter flexGrow={1} flexBasis={0} justifyContent="flex-end">
          <Pressable contentCenter position="relative" padding={8}>
            <Icon position="absolute" type="Feather" name="share" size={25} />
            <Animated.View style={iconAnimatedStyles}>
              <Icon type="Feather" name="share" size={25} color={COLORS.white} />
            </Animated.View>
          </Pressable>
          <Pressable contentCenter position="relative" padding={8}>
            <Icon position="absolute" type="Feather" name="more-vertical" size={25} />
            <Animated.View style={iconAnimatedStyles}>
              <Icon type="Feather" name="more-vertical" size={25} color={COLORS.white} />
            </Animated.View>
          </Pressable>
        </Block>
      </Animated.View>
      <Animated.Image
        source={{uri: 'https://hocdohoacaptoc.com/wp-content/uploads/2022/02/avata-dep-nam-2.jpg'}}
        style={[styles.profileImage, animImage]}
      />
      {/* ScrollView */}
      <Animated.ScrollView
        bounces={false}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: bottom + 50}}>
        <Block gap={5} paddingTop={100} paddingBottom={5} alignItems="center">
          <Text fontSize={25} fontWeight={500}>
            Developer
          </Text>
          <Block rowCenter>
            <Text fontSize={16}>0 follower</Text>
            <Icon type="Entypo" name="dot-single" />
            <Text fontSize={16}>0 following</Text>
          </Block>
        </Block>

        <Block rowCenter gap={12} padding={12}>
          {listHealthMetrics.map(item => (
            <Pressable
              flex
              gap={8}
              radius={15}
              padding={12}
              key={item.title}
              alignItems="center"
              backgroundColor={COLORS.white}
              onPress={() => setShowInfoHealthMetrics(item)}>
              <Image square={50} source={{uri: item.image_url}} />
              <Text flex textAlign="center" fontSize={16} fontWeight={900}>
                {item.title}
              </Text>
              <Text fontSize={16} fontWeight={600}>
                {item.value} <Text fontSize={12}>kcal</Text>
              </Text>
            </Pressable>
          ))}
        </Block>

        <Text fontSize={15} fontWeight={500} marginHorizontal={12} marginTop={12}>
          Fitness
        </Text>
        <Block radius={15} margin={12} paddingHorizontal={12} backgroundColor={COLORS.white}>
          <Block rowCenter paddingVertical={12}>
            <Icon type="MaterialCommunityIcons" name="dumbbell" marginRight={8} size={22} />
            <Text flex fontSize={17} fontWeight={600}>
              Goal
            </Text>
            <Text fontSize={16}>168 centimetres</Text>
            <Icon type="MaterialIcons" name="chevron-right" size={22} marginLeft={2} marginRight={-5} />
          </Block>
          <Block height={1} backgroundColor={COLORS.antiFlashWhite} />
          <Block rowCenter paddingVertical={12}>
            <Icon type="FontAwesome5" name="location-arrow" marginRight={8} size={18} />
            <Text flex fontSize={17} fontWeight={600}>
              Location
            </Text>
            <Text fontSize={16}>63 kilograms</Text>
            <Icon type="MaterialIcons" name="chevron-right" size={22} marginLeft={2} marginRight={-5} />
          </Block>
          <Block height={1} backgroundColor={COLORS.antiFlashWhite} />
          <Block rowCenter paddingVertical={12}>
            <Icon type="MaterialCommunityIcons" name="clock-time-nine-outline" marginRight={8} size={22} />
            <Text flex fontSize={17} fontWeight={600}>
              Frequency
            </Text>
            <Text fontSize={16}>63 kilograms</Text>
            <Icon type="MaterialIcons" name="chevron-right" size={22} marginLeft={2} marginRight={-5} />
          </Block>
          <Block height={1} backgroundColor={COLORS.antiFlashWhite} />
        </Block>

        <Text fontSize={15} fontWeight={500} marginHorizontal={12} marginTop={12}>
          Body Information
        </Text>
        <Block radius={15} margin={12} paddingHorizontal={12} backgroundColor={COLORS.white}>
          <Block rowCenter paddingVertical={12}>
            <Icon type="MaterialCommunityIcons" name="human-male-height" marginRight={8} size={22} />
            <Text flex fontSize={17} fontWeight={600}>
              Height
            </Text>
            <Text fontSize={16}>168 centimetres</Text>
            <Icon type="MaterialIcons" name="chevron-right" size={22} marginLeft={2} marginRight={-5} />
          </Block>
          <Block height={1} backgroundColor={COLORS.antiFlashWhite} />
          <Block rowCenter paddingVertical={12}>
            <Icon type="MaterialCommunityIcons" name="weight-lifter" marginRight={8} size={22} />
            <Text flex fontSize={17} fontWeight={600}>
              Weight
            </Text>
            <Text fontSize={16}>63 kilograms</Text>
            <Icon type="MaterialIcons" name="chevron-right" size={22} marginLeft={2} marginRight={-5} />
          </Block>
          <Block height={1} backgroundColor={COLORS.antiFlashWhite} />
          <Block rowCenter paddingVertical={12}>
            <Icon type="MaterialCommunityIcons" name="calendar-week" marginRight={8} size={22} />
            <Text flex fontSize={17} fontWeight={600}>
              Birthday
            </Text>
            <Text fontSize={16}>63 kilograms</Text>
            <Icon type="MaterialIcons" name="chevron-right" size={22} marginLeft={2} marginRight={-5} />
          </Block>
          <Block height={1} backgroundColor={COLORS.antiFlashWhite} />
          <Block rowCenter paddingVertical={12}>
            <Icon type="MaterialCommunityIcons" name="gender-transgender" marginRight={8} size={22} />
            <Text flex fontSize={17} fontWeight={600}>
              Gender
            </Text>
            <Text fontSize={16}>63 kilograms</Text>
            <Icon type="MaterialIcons" name="chevron-right" size={22} marginLeft={2} marginRight={-5} />
          </Block>
        </Block>

        <Text fontSize={15} fontWeight={500} marginHorizontal={12} marginTop={12}>
          Auth
        </Text>
        <Block radius={15} margin={12} paddingHorizontal={12} backgroundColor={COLORS.white}>
          <Block rowCenter paddingVertical={12}>
            <Icon type="Entypo" name="email" marginRight={12} size={20} />
            <Text flex fontSize={17} fontWeight={600}>
              Email
            </Text>
            <Button
              title="Set Up"
              height={30}
              radius={15}
              fontSize={14}
              fontWeight={600}
              paddingRight={15}
              paddingLeft={10}
              color={COLORS.textPrimary}
              backgroundColor={COLORS.antiFlashWhite}
              iconLeft={<Icon type="Ionicons" name="add-circle" size={18} marginRight={8} />}
            />
          </Block>
          <Block height={1} backgroundColor={COLORS.antiFlashWhite} />
          <Block rowCenter paddingVertical={12}>
            <Icon type="Entypo" name="phone" marginRight={12} size={20} />
            <Text flex fontSize={17} fontWeight={600}>
              Phone
            </Text>
            <Button
              title="Set Up"
              height={30}
              radius={15}
              fontSize={14}
              fontWeight={600}
              paddingRight={15}
              paddingLeft={10}
              color={COLORS.textPrimary}
              backgroundColor={COLORS.antiFlashWhite}
              iconLeft={<Icon type="Ionicons" name="add-circle" size={18} marginRight={8} />}
            />
          </Block>
        </Block>

        <Text fontSize={15} fontWeight={500} marginHorizontal={12} marginTop={12}>
          Linkd Accounts
        </Text>
        <Block radius={15} margin={12} paddingHorizontal={12} backgroundColor={COLORS.white}>
          <Block rowCenter paddingVertical={12}>
            <Icon type="Ionicons" name="logo-apple" marginRight={12} color={COLORS.black} />
            <Text flex fontSize={17} fontWeight={600}>
              Apple
            </Text>
            <Button
              title="Link"
              height={30}
              radius={15}
              fontSize={14}
              fontWeight={600}
              paddingHorizontal={15}
              color={COLORS.textPrimary}
              backgroundColor={COLORS.antiFlashWhite}
            />
          </Block>
          <Block height={1} backgroundColor={COLORS.antiFlashWhite} />
          <Block rowCenter paddingVertical={12}>
            <Icon type="Ionicons" name="logo-google" marginRight={12} color={COLORS.electricRed} />
            <Text flex fontSize={17} fontWeight={600}>
              Google
            </Text>
            <Button
              title="Link"
              height={30}
              radius={15}
              fontSize={14}
              fontWeight={600}
              paddingHorizontal={15}
              color={COLORS.textPrimary}
              backgroundColor={COLORS.antiFlashWhite}
            />
          </Block>
        </Block>

        <Button title="Logout" margin={12} />
        <Pressable>
          <Text textAlign="center">Delete Account</Text>
        </Pressable>
      </Animated.ScrollView>

      <Modal
        position="center"
        isVisible={!!showInfoHealthMetrics}
        onBackdropPress={() => setShowInfoHealthMetrics(undefined)}>
        <Block radius={12} padding={12} margin={12} backgroundColor={COLORS.white}>
          <Text fontSize={16} lineHeight={22}>
            TDEE (Total Daily Energy Expenditure) là tổng năng lượng tiêu thụ hàng ngày, phụ thuộc vào mức độ hoạt động
            của bạn. Công thức tính TDEE như sau:
          </Text>
          <Text>TDEE = BMR x Mức độ hoạt động</Text>
        </Block>
      </Modal>
    </Block>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 60,
    width: '100%',
    height: 120,
    paddingHorizontal: 8,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '500',
    marginHorizontal: 60,
    color: COLORS.white,
  },
  // backButton: {
  //   width: constants.headerButtonWidth,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: constants.padding,
  // },
  showMoreButton: {
    width: constants.headerButtonWidth,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 66 : 76,
    right: constants.padding,
    zIndex: 1,
  },
  nameTextContainer: {
    paddingTop: 100,
    paddingBottom: 4,
    alignItems: 'center',
  },
  name: {
    fontSize: constants.titleSize,
    alignSelf: 'center',
    marginBottom: 8,
  },
  threadType: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.textPlaceholder,
  },
  ctaStyles: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: constants.margin,
    paddingVertical: constants.padding,
  },
  addCommunityTab: {
    padding: constants.padding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityTextContainer: {paddingHorizontal: constants.padding, width: '90%'},
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: constants.margin,
    backgroundColor: COLORS.chineseOrange,
    borderRadius: 6,
  },
  tabTitleText: {
    color: COLORS.chineseOrange,
    fontSize: constants.textSize,
  },
  bringMembersText: {color: COLORS.textPlaceholder, fontSize: 15, marginTop: 4},
  createdAt: {
    color: COLORS.textPlaceholder,
    fontSize: 17,
    marginTop: constants.margin,
  },
  membersCountStyles: {
    paddingHorizontal: constants.padding,
    color: COLORS.textPlaceholder,
    fontSize: 15,
    marginTop: 4,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    position: 'absolute',
    zIndex: 99999,
    alignSelf: 'center',
    top: 70,
  },
});
