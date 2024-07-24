import React, {useMemo, useRef, useState} from 'react';
import {useKeyboard} from '@react-native-community/hooks';
import {Block, Pressable, Text} from 'components/base';
import {Keyboard, TextInput} from 'react-native';
import {COLORS} from 'themes/color';

export type OTPInputProps = Partial<{
  codeLength: number;
  show: boolean;
  autoFocusOnLoad: boolean;
  onCodeFilled: (code: string) => void;
  clearCodeOnFullFilled: boolean;
  errorMessage: string;
  validateCode: string;
  onCodeDelete: (code: string) => void;
  /**
   * @default
   * = clearCodeOnFullFilled
   */
  dismissKeyboardOnFullFilled: boolean;
  placeholder: string;
}>;

export const OTPInput = ({
  codeLength = 6,
  errorMessage = '',
  validateCode,
  onCodeFilled,
  show = true,
  autoFocusOnLoad = true,
  clearCodeOnFullFilled,
  dismissKeyboardOnFullFilled = clearCodeOnFullFilled,
  onCodeDelete,
  placeholder = '*',
}: OTPInputProps) => {
  const [value, setValue] = useState('');
  const activeIndex = value.length;
  const __input = useRef<TextInput>(null);
  const {keyboardShown} = useKeyboard();
  const [isFocused, setIsFocused] = useState(autoFocusOnLoad);
  const [_errorMessage, setErrorMessage] = useState('');
  const arr = useMemo(() => {
    return Array(codeLength).fill('');
  }, [codeLength]);

  const onChangeText = (text: string) => {
    const validText = text.slice(0, codeLength).replace(/\D/g, '');
    setValue(validText);
    if (validText.length === codeLength) {
      if (validateCode && validateCode !== validText) {
        setErrorMessage(errorMessage);
      } else {
        onCodeFilled?.(validText);
      }
      clearCodeOnFullFilled && setValue('');
      dismissKeyboardOnFullFilled && Keyboard.dismiss();
    } else {
      setErrorMessage('');
      onCodeDelete?.(validText);
    }
  };

  const inputOnPress = () => {
    if (!keyboardShown) {
      if (isFocused) {
        __input.current?.blur();
        setTimeout(() => {
          __input.current?.focus();
        }, 100);
      } else {
        __input.current?.focus();
      }
    }
  };

  return (
    <Block>
      <Pressable onPress={inputOnPress} height={45} activeOpacity={1}>
        <TextInput
          value={value}
          autoComplete="one-time-code"
          onChangeText={onChangeText}
          keyboardType="numeric"
          autoFocus={autoFocusOnLoad}
          ref={__input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Block absoluteFillObject>
          <Block rowCenter flex backgroundColor={COLORS.white}>
            {arr.map((_, i) => {
              const isActive = i === activeIndex && isFocused && keyboardShown;
              return (
                <Block
                  key={i}
                  alignItems="center"
                  justifyContent="center"
                  borderWidth={1}
                  borderColor={!isActive ? COLORS.border : COLORS.primary}
                  radius={5}
                  square={45}
                  marginRight={15}>
                  {show ? (
                    <Text
                      fontWeight="bold"
                      marginTop={value[i] ? 0 : 7.5}
                      fontSize={value[i] ? 16 : 30}
                      color={value[i] ? COLORS.textPrimary : COLORS.border}>
                      {value[i] || placeholder}
                    </Text>
                  ) : (
                    <Text
                      fontWeight="bold"
                      marginTop={value[i] ? 0 : 7.5}
                      fontSize={30}
                      color={value[i] ? COLORS.textPrimary : COLORS.border}>
                      {placeholder}
                    </Text>
                  )}
                </Block>
              );
            })}
          </Block>
        </Block>
      </Pressable>
      {validateCode
        ? _errorMessage.length > 0 && (
            <Text marginTop={10} color={COLORS.electricRed} fontWeight={'regular'} fontSize={13}>
              {_errorMessage}
            </Text>
          )
        : errorMessage?.length > 0 && (
            <Text marginTop={10} color={COLORS.electricRed} fontWeight={'regular'} fontSize={13}>
              {errorMessage}
            </Text>
          )}
    </Block>
  );
};
