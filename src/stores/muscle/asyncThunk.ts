import {createAppAsyncThunk, handleThunkError} from 'helpers/redux';
import {MuscleInfo} from 'types/muscle';
import {ApiResponseData} from 'types/shared';
import {httpRequest} from 'utils/axios';

export const getMuscleAction = createAppAsyncThunk('muscle', async (_, thunkApi) => {
  try {
    return await httpRequest<ApiResponseData<MuscleInfo[]>>({url: 'muscle', method: 'get'});
  } catch (error) {
    return handleThunkError(thunkApi, error);
  }
});
