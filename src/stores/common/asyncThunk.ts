import {createAppAsyncThunk, handleThunkError} from 'helpers/redux';
import {TermsPolicyInfo} from 'types/common';
import {ApiResponseData} from 'types/shared';
import {httpRequest} from 'utils/axios';

export const termsPolicyAction = createAppAsyncThunk('common/terms-policy', async (_, thunkApi) => {
  try {
    return await httpRequest<ApiResponseData<TermsPolicyInfo>>({url: 'common/terms-policy', method: 'get'});
  } catch (error) {
    return handleThunkError(thunkApi, error);
  }
});
