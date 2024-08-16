import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from 'themes/color';
import {width} from 'themes/helper';
import {Icon} from 'components/base';

type Props = {
  iconName: string;
  text: string;
  color: string;
};

type ListItemProps = {
  iconType: Function;
  icon: string;
  color: string;
  name: string;
  desc: string;
};
type CTAItemProps = {
  iconType: Function;
  iconName: string;
  color: string;
  name: string;
};

export const MembersTab = ({iconName, text, color}: Props) => {
  return (
    <View style={[styles.optionList, {alignItems: 'center'}]}>
      <View style={styles.circleIconContainer}>
        <Icon name={iconName} type={'MaterialIcons'} color={COLORS.white} />
      </View>
      <Text style={[styles.text, {color}]}>{text}</Text>
    </View>
  );
};

export const ListItem = ({iconType, icon, color, name, desc}: ListItemProps) => {
  return (
    <View style={styles.optionList}>
      <Icon type={iconType} name={icon} color={COLORS.border} />
      <View style={styles.optionListTextContainer}>
        <Text style={[styles.optionListText, {color}]}>{name}</Text>
        {desc && <Text style={styles.descriptionTextStyles}>{desc}</Text>}
      </View>
    </View>
  );
};

export const CTAItems = ({iconName, iconType, color, name}: CTAItemProps) => {
  return (
    <View style={styles.listItem}>
      {/* <Icon name={iconName} type={iconType} color={COLORS.chineseOrange} /> */}
      <Text style={{color, textAlign: 'center', fontWeight: '500', marginTop: 5}}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  optionList: {
    flexDirection: 'row',
    padding: 20,
  },
  circleIconContainer: {
    padding: 8,
    borderRadius: 20,
  },
  text: {
    paddingHorizontal: 12,
  },
  optionListText: {
    fontSize: 20,
    fontWeight: '500',
  },
  optionListTextContainer: {
    paddingHorizontal: 24,
    width: '80%',
  },
  descriptionTextStyles: {
    color: COLORS.border,
    marginTop: 4,
    fontSize: 12,
  },
  listItem: {
    width: width / 4 - 20,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border + '80',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
