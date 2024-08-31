import {createAppAsyncThunk, handleThunkError} from 'helpers/redux';
import {ApiResponseData} from 'types/shared';
import {httpRequest} from 'utils/axios';
import {UserInfo} from 'types/user';
import {clearUser} from './slice';

export const getUser = createAppAsyncThunk('user/info', async (_, thunkApi) => {
  try {
    return await httpRequest<ApiResponseData<UserInfo>>({url: 'user', method: 'get'});
  } catch (error) {
    return handleThunkError(thunkApi, error);
  }
});

export const deleteUser = createAppAsyncThunk('user/delete', async (_, thunkApi) => {
  try {
    const result = await httpRequest<ApiResponseData<'ok'>>({url: 'user', method: 'delete'});
    thunkApi.dispatch(clearUser());
    return result;
  } catch (err) {
    return handleThunkError(thunkApi, err, true);
  }
});
