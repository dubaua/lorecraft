import { useUpsertDocumentMutation } from '@api/api-slice';
import { IDocument } from '@features/documents/document.interface';
import { useAppDispatch } from '@store/use-app-dispatch';
import { DocumentsActions } from './documents.slice';

type HookResult = {
  handleUpsertDocument: (document: Partial<IDocument>) => Promise<IDocument>;
  isUpserting: boolean;
};

export function useUpsertDocument(): HookResult {
  const [upsertDocumentMutation, { isLoading: isUpserting }] = useUpsertDocumentMutation();
  const dispatch = useAppDispatch();

  const handleUpsertDocument = async (document: Partial<IDocument>): Promise<IDocument> => {
    const result = await upsertDocumentMutation(document).unwrap();
    if (result) {
      dispatch(DocumentsActions.setDocument(result));
      dispatch(
        DocumentsActions.upsertDocument({
          _id: result._id,
          name: result.name,
          type: result.type,
        }),
      );
    }
    return result;
  };

  return {
    handleUpsertDocument,
    isUpserting,
  };
}
