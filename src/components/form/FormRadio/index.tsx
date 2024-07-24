// import React, {ReactElement} from 'react';
// import {Block, BlockProps, Text, TextProps} from 'components/base';
// import {Control, FieldError, FieldPath, FieldValues, useController} from 'react-hook-form';
// import {Radio, RadioProps} from 'components/base';

// type FormRadioProps<F extends FieldValues> = {
//   label?: string;
//   required?: boolean;
//   name: FieldPath<F>;
//   control: Control<F>;
//   messageError?: string;
//   errProps?: TextProps;
//   labelProps?: TextProps;
//   renderError?: (error?: FieldError) => ReactElement;
//   renderLabel?: (label?: string, required?: boolean) => ReactElement;
//   containerProps?: BlockProps;
// };

// export const FormRadio = <F extends FieldValues>({
//   data,
//   required,
//   label,
//   name,
//   control,
//   errProps,
//   labelProps,
//   messageError,
//   renderLabel,
//   renderError,
//   containerProps,
//   ...props
// }: FormRadioProps<F> & RadioProps) => {
//   const {
//     field: {value, onChange},
//     fieldState: {error},
//   } = useController({
//     name,
//     control,
//   });

//   const _renderLabel = () => {
//     return renderLabel ? (
//       renderLabel(label, required)
//     ) : label && label.length > 0 ? (
//       <Text font="semiBold" fontSize={16} marginBottom={10} {...labelProps}>
//         {label}
//         {required && <Text color={'red'}> *</Text>}
//       </Text>
//     ) : null;
//   };

//   const _renderError = () => {
//     return renderError ? (
//       renderError(error)
//     ) : messageError || error?.message ? (
//       <Text marginTop={5} fontSize={14} color={'red'} {...errProps}>
//         {messageError || error?.message}
//       </Text>
//     ) : null;
//   };

//   return (
//     <Block {...containerProps}>
//       {_renderLabel()}
//       <Radio
//         data={data}
//         valueChecked={typeof value === 'number' ? value : undefined}
//         onChange={e => onChange(e.value)}
//         {...props}
//       />
//       {_renderError()}
//     </Block>
//   );
// };
