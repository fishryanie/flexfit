/** @format */

import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    username: yup.string().required('loginScreen.email_empty_error'),
    password: yup.string().required('loginScreen.pass_empty_error'),
  })
  .required();

export const formConfig = {
  resolver: yupResolver(schema),
  defaultValues: {
    username: '',
    password: '',
  },
};
