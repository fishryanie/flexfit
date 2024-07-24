import {Block, BlockProps, DateTimePicker, DateTimePickerProps, Icon, Pressable, Text} from 'components/base';
import moment from 'moment';
import React, {ReactElement, useState} from 'react';
import {Control, FieldError, FieldPath, FieldValues, useController} from 'react-hook-form';
import {COLORS} from 'theme';
import {IS_IOS} from 'util/constants';

export type DateTimeInputProps<F extends FieldValues> = {
  name: FieldPath<F>;
  control: Control<F> | undefined;
  /**
   * @default "date"
   */
  mode?: 'date' | 'time';
  label?: string;
  disabled?: boolean;
  /**
   * @default mode 'date': 'DD/MM/YYYY'
   * @default mode 'time': 'HH:mm'
   */
  displayFormat?: string;
  /**
   * - "unix": number of seconds unix timestamp
   * - "date": Date JS object
   * - string: moment format string DD/MM/YYYY, HH:mm
   * @default "unix"
   */
  returnFormat?: 'unix' | 'date' | string;
  placeholder?: string;
  borderColor?: string;
  containerProps?: BlockProps;
  inputProps?: BlockProps;
  customInput?: (props: {onPress: () => void; value?: Date; error?: FieldError}) => ReactElement;
} & Pick<DateTimePickerProps, 'maximumDate' | 'minimumDate'>;

export const DateTimeInput = <F extends FieldValues>({
  mode = 'date',
  name,
  control,
  label = '',
  disabled,
  displayFormat,
  placeholder = 'Chọn',
  returnFormat = 'unix',
  containerProps,
  inputProps,
  borderColor = COLORS.antiFlashWhite,
  customInput,
  ...pickerProps
}: DateTimeInputProps<F>) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController({name, control});

  const _value = value
    ? returnFormat === 'unix'
      ? new Date(value * 1000)
      : returnFormat === 'date'
      ? value
      : moment(value, returnFormat).toDate()
    : new Date();

  const showModal = () => {
    setModalVisible(true);
  };

  const onDatePick = (date: Date) => {
    onChange(
      returnFormat === 'unix'
        ? Math.round(date.getTime() / 1000)
        : returnFormat === 'date'
        ? date
        : moment(date).format(returnFormat),
    );
  };

  const _renderInput = () => {
    if (customInput) {
      return customInput({onPress: showModal, value: value ? _value : undefined, error: error});
    }
    const _displayFormat = displayFormat || (mode === 'time' ? 'HH:mm' : 'DD/MM/YYYY');
    return (
      <>
        {label?.length > 0 && (
          <Text fontSize={16} font="semiBold" marginBottom={10}>
            {label}
          </Text>
        )}
        <Pressable
          disabled={disabled}
          onPress={showModal}
          rowCenter
          radius={5}
          height={45}
          paddingHorizontal={10}
          borderWidth={1}
          borderColor={borderColor}
          {...inputProps}>
          <Text flex color={value ? COLORS.raisinBlack : COLORS.gray}>
            {value ? moment(_value).format(_displayFormat) : placeholder}
          </Text>
          <Icon type={'MaterialCommunityIcons'} name="calendar-month" />
        </Pressable>
        {error?.message && (
          <Text color="red" fontSize={14} marginTop={5}>
            {error?.message}
          </Text>
        )}
      </>
    );
  };

  return (
    <Block {...containerProps}>
      {_renderInput()}
      <DateTimePicker
        display={IS_IOS ? 'spinner' : 'default'}
        mode={mode}
        value={_value}
        onDatePick={onDatePick}
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        {...pickerProps}
      />
    </Block>
  );
};
