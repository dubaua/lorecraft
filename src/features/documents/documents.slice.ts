import { IDocument, IDocumentSummary } from '@features/documents/document.interface';
import { EntityState, PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/store';

const adapter = createEntityAdapter<IDocumentSummary>({
  selectId: (entry) => entry._id,
});

type DocumentsState = EntityState<IDocumentSummary> & {
  current: IDocument | null;
  isEditing: boolean;
};

const slice = createSlice({
  name: 'Documents',
  initialState: adapter.getInitialState({ current: null, isEditing: false }) as DocumentsState,
  reducers: {
    upsertDocuments: adapter.upsertMany,
    upsertDocument: adapter.upsertOne,
    setDocument(state, action: PayloadAction<IDocument>) {
      state.current = action.payload;
    },
    toggleEditing(state) {
      state.isEditing = !state.isEditing;
    },
  },
});

const { selectAll, selectById } = adapter.getSelectors((state: RootState) => state.documents);

export const DocumentsActions = slice.actions;
export const documentsReducer = slice.reducer;
export type DocumentsActionsType = typeof DocumentsActions;
export const selectAllDocuments = selectAll;
export const selectDocumentById = selectById;
export const selectCurrentDocument = (state: RootState): IDocument | null => state.documents.current;
export const selectIsEditing = (state: RootState): boolean => state.documents.isEditing;
