import { useEffect } from 'react';
import { useGetDocumentsQuery } from '@api/api-slice';
import { useAppSelector } from '@store/use-app-selector';
import { useAppDispatch } from '@store/use-app-dispatch';
import { DocumentsActions, selectAllDocuments } from './documents.slice';
import { IDocumentSummary } from '@features/documents/document.interface';

type HookResult = {
  documents: IDocumentSummary[];
  isLoading: boolean;
};

export function useDocuments(): HookResult {
  const { data, isLoading, isSuccess } = useGetDocumentsQuery({ limit: 100 });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(DocumentsActions.upsertDocuments(data));
    }
  }, [data, isSuccess, dispatch]);

  const documents = useAppSelector((state) => selectAllDocuments(state));

  return {
    documents,
    isLoading,
  };
}
