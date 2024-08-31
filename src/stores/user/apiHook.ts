import {createMutationHook, createQueryHook} from 'helpers/redux';
import {getUser, deleteUser} from './asyncThunk';

export const useGetUser = createQueryHook(getUser);
export const useDeleteUser = createMutationHook(deleteUser);
