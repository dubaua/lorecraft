import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosBaseQuery, axiosBaseQuery } from '@api/http-query-client';
import { EndpointBuilder, MutationDefinition, QueryDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { OmitFromUnion } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { IDocument, IDocumentSummary } from '@features/documents/document.interface';

export const baseUrl = 'https://lore.dubaua.ru';

const reducerPath = 'api';
type ReducerPath = typeof reducerPath;

const tagTypes = [] as const;
type TagTypes = (typeof tagTypes)[number];

export type AppBuilder = EndpointBuilder<AxiosBaseQuery, TagTypes, ReducerPath>;
export type AppQueryDefinition<QueryArgumentType, ResultType> = QueryDefinition<
  QueryArgumentType,
  AxiosBaseQuery,
  TagTypes,
  ResultType,
  ReducerPath
>;
export type AppMutationDefinition<MutationArgumentType, ResultType> = MutationDefinition<
  MutationArgumentType,
  AxiosBaseQuery,
  TagTypes,
  ResultType,
  ReducerPath
>;
/**
 * Accepts two template types:
 * @template QueryArgumentType type of query argument
 * @template ResultType type of return
 * @param definition the only argument, that we usually pass to builder.query
 * @returns factory function, accepting builder and returning query definition we need for api slice
 */
export function appQueryFactory<QueryArgumentType, ResultType>(
  definition: OmitFromUnion<AppQueryDefinition<QueryArgumentType, ResultType>, 'type'>,
) {
  return (
    builder: EndpointBuilder<AxiosBaseQuery, TagTypes, ReducerPath>,
  ): AppQueryDefinition<QueryArgumentType, ResultType> => builder.query(definition);
}

/**
 * Accepts two template types:
 * @template MutationArgumentType type of mutation argument
 * @template ResultType type of return
 * @param definition the only argument, that we usually pass to builder.mutation
 * @returns factory function, accepting builder and returning mutation definition we need for api slice
 */
export function appMutationFactory<MutationArgumentType, ResultType>(
  definition: OmitFromUnion<AppMutationDefinition<MutationArgumentType, ResultType>, 'type'>,
) {
  return (
    builder: EndpointBuilder<AxiosBaseQuery, TagTypes, ReducerPath>,
  ): AppMutationDefinition<MutationArgumentType, ResultType> => builder.mutation(definition);
}

type CollectionResponse<T> = { data: T[]; meta: { total: number } };

export const apiSlice = createApi({
  reducerPath,
  tagTypes,
  baseQuery: axiosBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getDocuments: builder.query<IDocumentSummary[], { limit?: number; skip?: number }>({
      query: ({ limit = 10, skip = 0 }) => ({
        url: `/cockpit/api/content/items/documents`,
        method: 'GET',
        params: {
          limit,
          skip,
          fields: JSON.stringify({ name: true, type: true, _id: true }),
        },
      }),
      transformResponse: (response: CollectionResponse<IDocumentSummary>) => response.data,
    }),
    getDocumentById: builder.query<IDocument, string>({
      query: (id) => ({
        url: `/cockpit/api/content/item/documents/${id}`,
        method: 'GET',
      }),
    }),
    upsertDocument: builder.mutation<IDocument, Partial<IDocument>>({
      query: (document) => ({
        url: `/cockpit/api/content/item/documents`,
        method: 'POST',
        data: {
          data: document,
        },
      }),
    }),
  }),
});

apiSlice.reducerPath;

export const { useGetDocumentsQuery, useGetDocumentByIdQuery, useUpsertDocumentMutation } = apiSlice;
