import {createQueryHook} from 'helpers/redux';
import {getMuscleAction} from './asyncThunk';

export const useGetMuscle = createQueryHook(getMuscleAction);
