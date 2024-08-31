import {createMutationHook} from 'helpers/redux';
import {loginAction, loginSocialAction, logoutAction} from './asyncThunk';

export const useLogout = createMutationHook(logoutAction);
export const useLogin = createMutationHook(loginAction);
export const useLoginSocial = createMutationHook(loginSocialAction);
