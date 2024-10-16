import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { hasNestedFile } from '@utils/has-nested-file';
import { createFormData } from '@utils/form-data';

export const httpClient = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Api-Key': 'API-dd4accced060f20c456257f0f8f90d0a154a0df7',
  },
  withCredentials: true,
});

export function patchAuthorizationHeader(token: string): void {
  httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export type AxiosBaseQuery = BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  },
  unknown,
  unknown
>;

export function axiosBaseQuery({ baseUrl }: { baseUrl: string }): AxiosBaseQuery {
  return async ({ url, method, data, params }) => {
    try {
      // if posting a form with file, using special axios method for it
      // and creating and populating form data
      const methodNames = ['POST', 'PUT', 'PATCH'];
      const isMethodWithBody = method && methodNames.includes(method.toUpperCase());
      if (isMethodWithBody && hasNestedFile(data)) {
        const methodName = `${method.toLowerCase()}Form` as 'postForm' | 'putForm' | 'patchForm';
        const result = await httpClient[methodName](baseUrl + url, createFormData(data));
        return { data: result.data };
      }
      // else sending regular request with optional JSON body
      const result = await httpClient.request({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
}
