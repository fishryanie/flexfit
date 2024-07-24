import React, {useEffect, useState} from 'react';
import {Block, BlockProps, Pressable, PressableProps, Text, TextProps} from 'components/base';
import {COLORS} from 'themes/color';

type DataRadio = {label: string; value: number};
export type RadioProps = {
  data: DataRadio[];
  horizontal?: boolean;
  valueChecked?: number;
  unCheckColor?: string;
  checkedColor?: string;
  itemProps?: PressableProps;
  labelProps?: TextProps;
  CustomLabel?: (data: DataRadio) => React.ReactElement | null;
  onChange?: (data: DataRadio) => void;
} & BlockProps;

export const Radio = ({
  data,
  onChange,
  CustomLabel,
  horizontal,
  valueChecked,
  unCheckColor = COLORS.antiFlashWhite,
  checkedColor = COLORS.primary,
  itemProps,
  labelProps,
  ...props
}: RadioProps) => {
  const [isSelected, setSelected] = useState<DataRadio>();

  useEffect(() => {
    if (valueChecked !== undefined) {
      setSelected(data.find(e => e.value === valueChecked));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueChecked]);

  return (
    <Block row={horizontal} {...props}>
      {data.map((item, index) => (
        <Pressable
          key={index}
          marginTop={!horizontal && index !== 0 ? 15 : undefined}
          marginLeft={horizontal && index !== 0 ? 15 : undefined}
          onPress={() => {
            setSelected(item);
            onChange && onChange(item);
          }}
          {...itemProps}>
          <Block row>
            {item.value === isSelected?.value ? (
              <Block round={20} borderWidth={5} borderColor={checkedColor} />
            ) : (
              <Block round={20} borderWidth={1} borderColor={unCheckColor} />
            )}
            {!item.label && CustomLabel ? (
              CustomLabel(item)
            ) : (
              <Text marginLeft={12} fontSize={16} {...labelProps}>
                {item.label}
              </Text>
            )}
          </Block>
        </Pressable>
      ))}
    </Block>
  );
};
