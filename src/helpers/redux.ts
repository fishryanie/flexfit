/* eslint-disable @typescript-eslint/no-shadow */
import {AnyObject, ApiResponse, ApiResponseData, AppAxiosError, PagingParams, PagingResponseData} from 'types/shared';
import {AsyncThunk, createAsyncThunk, GetThunkAPI} from '@reduxjs/toolkit';
import {useCallback, useEffect, useState} from 'react';
import {useDeepCompareEffect} from 'hooks/common';
import {AppDispatch, RootState} from 'stores';
import {useAppDispatch} from 'hooks/redux';
import {AsyncThunkConfig} from 'types/redux';
import {SKIP_TOKEN} from 'utils/constants';
import {showToast} from 'utils/helper';

export const createAppAsyncThunk = createAsyncThunk.withTypes<AsyncThunkConfig>();

export const handleThunkError = (
  thunkApi: GetThunkAPI<{state: RootState; dispatch: AppDispatch}>,
  err: unknown,
  isShowToast?: boolean,
) => {
  let error = err as AppAxiosError;
  if (error.response) {
    if (isShowToast) {
      showToast({type: 'error', text1: error.response?.data.message});
    }
    return thunkApi.rejectWithValue(error.response.data);
  } else {
    throw err;
  }
};

export const createQueryPagingHook =
  <D, R extends PagingResponseData<D>, A extends PagingParams>(asyncThunk: AsyncThunk<R, A, AsyncThunkConfig>) =>
  (params: A, {skip = false} = {}) => {
    const dispatch = useAppDispatch();
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [numShow, setNumShow] = useState(0);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(!(skip || params === SKIP_TOKEN));
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [data, setData] = useState<R['data']>();
    const [error, setError] = useState<unknown>();
    const [countRefresh, setCountRefresh] = useState(0);
    const [pageRequest, setPageRequest] = useState(1);
    const [result, setResult] = useState<R>();

    const request = useCallback(
      async (params: A) => {
        try {
          const p = params?.p;
          if (p && p > 1) {
            setIsLoadMore(true);
          } else {
            setIsLoading(true);
          }
          setError(undefined);
          const res = await dispatch(asyncThunk(params)).unwrap();
          const newData = res.current_page > 1 && data ? [...data, ...res.data] : res.data;
          setIsLoading(false);
          setIsLoadMore(false);
          setNumShow(res.per_page);
          setPage(res.current_page);
          setTotal(res.total);
          setTotalPage(res.total_pages);
          setData(newData);
          setResult(res);
          return res;
        } catch (e) {
          setError(e);
          setIsLoading(false);
          setIsLoadMore(false);
        }
      },
      [data, dispatch],
    );

    const refresh = useCallback(() => {
      setCountRefresh(c => c + 1);
    }, []);

    const loadMore = useCallback(() => {
      if (page < totalPage && !isLoading && !isLoadMore && data?.length) {
        setPageRequest(page + 1);
      }
    }, [data?.length, isLoading, isLoadMore, page, totalPage]);

    useDeepCompareEffect(() => {
      if (skip || params === SKIP_TOKEN) {
        return;
      }
      setPageRequest(params?.p || 1);
      request(params);
    }, [skip, params, countRefresh]);

    useEffect(() => {
      if (pageRequest > 1) {
        const _params = params ? {...params, p: pageRequest, limit: numShow} : {p: pageRequest, limit: numShow};
        request(_params as A);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageRequest]);

    return {
      total,
      totalPage,
      page,
      numShow,
      isLoading,
      isLoadMore,
      error,
      setData,
      request,
      refresh,
      loadMore,
      data,
      result,
    };
  };

export const createQueryHook =
  <D, R extends ApiResponseData<D> | ApiResponse | AnyObject | undefined, A>(
    asyncThunk: AsyncThunk<R, A, AsyncThunkConfig>,
  ) =>
  (params: A, {skip = false} = {}) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(!(skip || params === SKIP_TOKEN));
    const [data, setData] = useState<R extends ApiResponseData<D> ? R['data'] : undefined>();
    const [error, setError] = useState<unknown>();
    const [result, setResult] = useState<R>();
    const [countRefresh, setCountRefresh] = useState(0);

    const request = useCallback(
      async (params: A) => {
        try {
          setIsLoading(true);
          setError(undefined);
          const res = await dispatch(asyncThunk(params)).unwrap();
          if (res && 'data' in res) {
            setData(res.data);
          }
          setIsLoading(false);
          setResult(res);
          return res;
        } catch (e) {
          setError(e);
          setIsLoading(false);
          throw e;
        }
      },
      [dispatch],
    );

    const refresh = useCallback(() => {
      setCountRefresh(c => c + 1);
    }, []);

    useDeepCompareEffect(() => {
      if (skip || params === SKIP_TOKEN) {
        return;
      }
      request(params).catch(() => {});
    }, [skip, params, countRefresh]);

    return {
      isLoading,
      error,
      request,
      data,
      result,
      refresh,
      setData,
    };
  };

export const createMutationHook =
  <R, A>(asyncThunk: AsyncThunk<R, A, AsyncThunkConfig>) =>
  () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<R>();
    const [error, setError] = useState<unknown>();

    const request = useCallback(
      async (arg: A) => {
        try {
          setIsLoading(true);
          setError(undefined);
          const res = await dispatch(asyncThunk(arg)).unwrap();
          setIsLoading(false);
          setResult(res);
          return res;
        } catch (e) {
          setError(e);
          setIsLoading(false);
          throw e;
        }
      },
      [dispatch],
    );

    return {
      isLoading,
      error,
      request,
      result,
    };
  };
