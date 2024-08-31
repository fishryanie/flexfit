import {AppDispatch, RootState} from 'stores';

export type DefaultState<D> = {
  data?: D;
  isLoading?: boolean;
  error?: any;
};

export const defaultState: DefaultState<any> = {isLoading: false};

export type DefaultLoadMoreState<D> = {
  totalPage: number;
  page: number;
  numShow: number;
  total: number;
  isLoadMore: boolean;
  data?: D[];
  isLoading: boolean;
  error?: any;
};

export const defaultLoadMoreState: DefaultLoadMoreState<any> = {
  totalPage: 0,
  page: 0,
  numShow: 0,
  total: 0,
  isLoading: false,
  isLoadMore: false,
};

export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

export type AsyncThunkArg<P = void, B = void> = void extends P
  ? void extends B
    ? void
    : {body: B}
  : void extends B
  ? {params: P}
  : {params: P; body: B};
