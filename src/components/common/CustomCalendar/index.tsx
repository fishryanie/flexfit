import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {Icon, Pressable} from 'components/base';
import {COLORS} from 'themes/color';

interface Props {
  selectedDate?: Date | null;
  dateChange?: (date: Date | null) => void;
  minDate?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  isMutable?: boolean;
  startEndDateChange?: (startData: Date | null, endData: Date | null) => void;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CustomCalendar: React.FC<Props> = ({
  isMutable,
  minDate,
  startDate,
  endDate,
  dateChange,
  startEndDateChange,
}) => {
  const [dateList, setDateList] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();

  let currentMonthDate = useRef<Date>(new Date()).current;
  let minimumDate = useRef<Date | null>(minDate).current;
  let maximumDate = useRef<Date | null>(null).current;

  const selectDateHandler = (date: Date) => {
    dateChange?.(date);
    setSelectedDate(date);
  };

  const setListOfDate = useCallback((monthDate: Date) => {
    const dates: Date[] = [];
    let newDate = new Date();
    newDate.setFullYear(monthDate.getFullYear(), monthDate.getMonth(), 0);
    const prevMonthDate = newDate.getDate();
    let previousMonthDay = 0;

    if (newDate.getDay() !== 0) {
      previousMonthDay = newDate.getDay() === 0 ? 7 : newDate.getDay();
      for (let i = 1; i <= previousMonthDay; i++) {
        const date = new Date(newDate);
        date.setDate(prevMonthDate - (previousMonthDay - i));
        dates.push(date);
      }
    }
    // 42 = 7 * 6:- 7 == column, 6 == rows
    for (let i = 0; i < 42 - previousMonthDay; i++) {
      const date = new Date(newDate);
      date.setDate(prevMonthDate + (i + 1));
      dates.push(date);
    }

    setDateList(dates);
  }, []);

  useEffect(() => {
    setListOfDate(new Date());
  }, [setListOfDate]);

  const getIsInRange = (date: Date) => {
    if (startDate != null && endDate != null) {
      return date > startDate && date < endDate;
    } else {
      return false;
    }
  };

  const getIsItStartAndEndDate = (date: Date) => {
    return startDate?.toDateString() === date.toDateString() || endDate?.toDateString() === date.toDateString();
  };

  const isStartDateRadius = (date: Date) => {
    // For selected start date and for Monday
    return startDate?.toDateString() === date.toDateString() || date.getDay() === 1;
  };

  const isEndDateRadius = (date: Date) => {
    // For selected end date and for Sunday
    return endDate?.toDateString() === date.toDateString() || date.getDay() === 0;
  };

  const onDatePressedValidations = (date: Date) => {
    if (currentMonthDate.getMonth() === date.getMonth()) {
      if (minimumDate != null && maximumDate != null) {
        const newMinimumDate = new Date(minimumDate);
        newMinimumDate.setDate(minimumDate.getDate() - 1);
        const newMaximumDate = new Date(maximumDate);
        newMaximumDate.setDate(maximumDate.getDate() + 1);

        if (date > newMinimumDate && date < newMaximumDate) {
          onDateClick(date);
        }
      } else if (minimumDate != null) {
        const newMinimumDate = new Date(minimumDate);

        if (date >= newMinimumDate) {
          onDateClick(date);
        }
      } else if (maximumDate != null) {
        const newMaximumDate = new Date(maximumDate);
        newMaximumDate.setDate(maximumDate.getDate() + 1);

        if (date < newMaximumDate) {
          onDateClick(date);
        }
      } else {
        onDateClick(date);
      }
    }
  };

  const onDateClick = (date: Date) => {
    if (startDate == null) {
      // when start is not selected
      startDate = date;
    } else if (startDate.toDateString() !== date.toDateString() && endDate == null) {
      // when (the clicked date is not start date) && (the end date is not selected)
      endDate = date;
    } else if (startDate.toDateString() === date.toDateString()) {
      // Clicked date is start date, so remove it
      startDate = null;
    } else if (endDate?.toDateString() === date.toDateString()) {
      // Clicked date is end date, so remove it
      endDate = null;
    }
    if (startDate == null && endDate != null) {
      startDate = endDate;
      endDate = null;
    }
    if (startDate != null && endDate != null) {
      if (endDate <= startDate) {
        const d = startDate;
        startDate = endDate;
        endDate = d;
      }
      if (date < startDate) {
        startDate = date;
      }
      if (date > endDate) {
        endDate = date;
      }
    }

    startEndDateChange(startDate, endDate);
  };

  const getDaysNameUI = () => {
    if (dateList.length === 0) {
      return;
    }

    const listUI: JSX.Element[] = [];
    for (let i = 0; i < 7; i++) {
      const weekDay = WEEK_DAYS[dateList[i].getDay()];

      listUI.push(
        <Text key={weekDay} style={styles.weekDayText}>
          {weekDay}
        </Text>,
      );
    }
    return listUI;
  };

  const getDaysNoUI = () => {
    const noList: JSX.Element[] = [];
    let count = 0;

    for (let i = 0; i < dateList.length / 7; i++) {
      const listUI: JSX.Element[] = [];

      for (let j = 0; j < 7; j++) {
        const date = dateList[count];

        const isDateStartOrEnd = getIsItStartAndEndDate(date);
        const isDateInRange = getIsInRange(date);

        listUI.push(
          <View key={`day_${count}`} style={{flex: 1, aspectRatio: 1.0}}>
            <View
              style={{
                flex: 1,
                marginVertical: 3,
                backgroundColor:
                  startDate != null && endDate != null
                    ? isDateStartOrEnd || isDateInRange
                      ? 'rgba(84, 211, 194, 0.4)'
                      : 'transparent'
                    : 'transparent',
                paddingLeft: isStartDateRadius(date) ? 4 : 0,
                paddingRight: isEndDateRadius(date) ? 4 : 0,
                borderBottomLeftRadius: isStartDateRadius(date) ? 24 : 0,
                borderTopLeftRadius: isStartDateRadius(date) ? 24 : 0,
                borderTopRightRadius: isEndDateRadius(date) ? 24 : 0,
                borderBottomRightRadius: isEndDateRadius(date) ? 24 : 0,
              }}
            />
            <View
              style={[
                styles.dayNoBtnContainer,
                {
                  borderWidth: (isMutable && isDateStartOrEnd) || selectedDate === date ? 2 : 0,
                  borderColor: (isMutable && isDateStartOrEnd) || selectedDate === date ? 'white' : 'transparent',
                  backgroundColor:
                    (isMutable && isDateStartOrEnd) || selectedDate === date ? COLORS.primary : 'transparent',
                },
                ((isMutable && isDateStartOrEnd) || selectedDate === date) && styles.activeDatesShadow,
              ]}>
              <Pressable
                style={styles.dayNoBtn}
                onPress={() => (isMutable ? onDatePressedValidations(date) : selectDateHandler(date))}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily:
                      (isMutable && isDateStartOrEnd) || selectedDate === date ? 'WorkSans-Bold' : 'WorkSans-Regular',
                    color:
                      (isMutable && isDateStartOrEnd) || selectedDate === date
                        ? 'white'
                        : currentMonthDate.getMonth() === date.getMonth()
                        ? 'black'
                        : 'lightgrey',
                  }}>
                  {date.getDate()}
                </Text>
                <View
                  style={[
                    styles.currentDateIndicator,
                    {
                      backgroundColor:
                        new Date().toDateString() === date.toDateString()
                          ? isDateStartOrEnd || isDateInRange
                            ? 'white'
                            : 'rgb(84, 211, 194)'
                          : 'transparent',
                    },
                  ]}
                />
              </Pressable>
            </View>
          </View>,
        );

        count += 1;
      }

      noList.push(
        <View key={`daysRow_${i}`} style={styles.dayNoRowView}>
          {listUI}
        </View>,
      );
    }
    return noList;
  };

  return (
    <View style={{paddingHorizontal: 8, paddingVertical: 4}}>
      <View style={{flexDirection: 'row', padding: 8}}>
        <View style={styles.arrowContainerStyle}>
          <Pressable
            style={styles.arrowBtnStyle}
            onPress={() => {
              currentMonthDate.setMonth(currentMonthDate.getMonth() - 1);
              setListOfDate(currentMonthDate);
            }}>
            <Icon type="MaterialIcons" name="keyboard-arrow-left" size={28} color="grey" />
          </Pressable>
        </View>
        <Text style={styles.monthHeaderStyle}>
          {MONTH_NAMES[currentMonthDate.getMonth()]}
          {`, ${currentMonthDate.getFullYear()}`}
        </Text>
        <View style={styles.arrowContainerStyle}>
          <Pressable
            style={styles.arrowBtnStyle}
            onPress={() => {
              currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
              setListOfDate(currentMonthDate);
            }}>
            <Icon type="MaterialIcons" name="keyboard-arrow-right" size={28} color="grey" />
          </Pressable>
        </View>
      </View>
      <View style={styles.weekDayContainer}>{getDaysNameUI()}</View>
      <View style={{paddingHorizontal: 8}}>{getDaysNoUI()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  arrowContainerStyle: {
    borderRadius: 24,
    borderWidth: 0.6,
    borderColor: 'lightgrey',
    overflow: 'hidden',
  },
  arrowBtnStyle: {
    height: 38,
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthHeaderStyle: {
    flex: 1,
    color: 'black',
    fontSize: 20,
    fontFamily: 'WorkSans-Medium',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  weekDayContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
    color: COLORS.primary,
  },
  dayNoRowView: {
    flexDirection: 'row',
    marginVertical: 1,
  },
  dayNoBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNoBtnContainer: {
    ...StyleSheet.absoluteFillObject,
    padding: 2,
    borderRadius: 32,
  },
  activeDatesShadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'grey',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.6,
        shadowRadius: 2.63,
      },
      android: {elevation: 4},
    }),
  },
  currentDateIndicator: {
    position: 'absolute',
    bottom: 6,
    height: 4,
    width: 4,
    borderRadius: 2,
  },
});
