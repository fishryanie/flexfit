import {createAppAsyncThunk, handleThunkError} from 'helpers/redux';
import {ApiResponse, ApiResponseData} from 'types/shared';
import {httpRequest} from 'utils/axios';
import {Token} from 'types/auth';

export const checkPhone = createAppAsyncThunk('auth/check-phone', async (phone: string, thunkApi) => {
  try {
    return await httpRequest<ApiResponse>({url: 'auth/check-phone', data: {phone}});
  } catch (error) {
    return handleThunkError(thunkApi, error);
  }
});

export const sendOTP = createAppAsyncThunk('auth/send-otp', async (phone: string, thunkApi) => {
  try {
    return await httpRequest<ApiResponse>({url: 'auth/check-phone', data: {phone}});
  } catch (error) {
    return handleThunkError(thunkApi, error);
  }
});

export const loginAction = createAppAsyncThunk(
  'auth/login',
  async (body: {username: string; password: string}, thunkApi) => {
    try {
      const data = {...body};
      return await httpRequest<ApiResponseData<Token>>({url: 'auth/login', method: 'post', data});
    } catch (err) {
      return handleThunkError(thunkApi, err, true);
    }
  },
);

export const logoutAction = createAppAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    const idUser = thunkApi.getState().user.userInfo.data?._id;
    return await httpRequest<ApiResponseData<Token>>({url: 'auth/logout', method: 'post', data: {idUser}});
  } catch (err) {
    return handleThunkError(thunkApi, err, true);
  }
});

export const loginSocialAction = createAppAsyncThunk(
  'auth/account-link',
  async (body: Partial<{uid: string; email: string; picture: string; displayName: string}>, thunkApi) => {
    try {
      const data = {...body};
      return await httpRequest<ApiResponseData<Token>>({url: 'auth/account-link', method: 'post', data});
    } catch (err) {
      return handleThunkError(thunkApi, err, true);
    }
  },
);
