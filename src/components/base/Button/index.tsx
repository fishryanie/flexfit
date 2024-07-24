// import React, {ReactElement} from 'react';
// import {ActivityIndicator} from 'react-native';
// import {Pressable, PressableProps, Text} from 'components/base';
// import {COLORS} from 'themes/color';
// // import {FontBeVietnamPro} from 'assets';

// type ButtonProps = Partial<
//   {
//     onPress: () => void;
//     outline: boolean;
//     disabled: boolean;
//     loading: boolean;
//     maxWidth: number;
//     title: string;
//     color: string;
//     fontSize: number;
//     colorTitle: string;
//     icon: ReactElement;
//   } & PressableProps
// >;

// export const Button = ({
//   onPress,
//   title = '',
//   disabled,
//   radius = 10,
//   height = 45,
//   font = 'medium',
//   fontSize = 16,
//   loading = false,
//   outline = false,
//   backgroundColor = outline ? 'transparent' : COLORS.primary,
//   color = outline ? COLORS.primary : COLORS.white,
//   ...containerProps
// }: ButtonProps) => {
//   return (
//     <Pressable
//       height={height}
//       radius={radius}
//       onPress={onPress}
//       contentCenter
//       borderWidth={1}
//       borderColor={outline ? color : disabled ? COLORS.brightGray : backgroundColor}
//       backgroundColor={disabled ? COLORS.brightGray : backgroundColor}
//       disabled={loading || disabled}
//       {...containerProps}>
//       {loading ? (
//         <ActivityIndicator size="small" color={color} />
//       ) : (
//         <Text color={color} fontSize={fontSize}>
//           {title}
//         </Text>
//       )}
//     </Pressable>
//   );
// };
