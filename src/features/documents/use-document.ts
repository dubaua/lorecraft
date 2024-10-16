import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDocumentByIdQuery } from '@api/api-slice';
import { useAppSelector } from '@store/use-app-selector';
import { useAppDispatch } from '@store/use-app-dispatch';
import { DocumentsActions, selectCurrentDocument, selectDocumentById } from './documents.slice';
import { IDocument } from '@features/documents/document.interface';
import { RouteParamsType } from '@routes/route-params.type';

type HookResult = {
  document: IDocument | null;
  isLoading: boolean;
};

export function useDocument(): HookResult {
  const { id } = useParams<RouteParamsType>();
  const documentSummary = useAppSelector((state) => selectDocumentById(state, id!));
  const shouldSkip = !documentSummary;
  const { data, isLoading, isSuccess } = useGetDocumentByIdQuery(documentSummary!._id, { skip: shouldSkip });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(DocumentsActions.setDocument(data));
    }
  }, [data, isSuccess, dispatch, id]);

  const document = useAppSelector((state) => selectCurrentDocument(state));
  return { document, isLoading };
}
