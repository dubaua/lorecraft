import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/store';

interface IQuillState {
  selectedLink: string | null;
  selectedText: string | null;
}

const initialState: IQuillState = {
  selectedLink: null,
  selectedText: null,
};

const quillSlice = createSlice({
  name: 'quill',
  initialState,
  reducers: {
    selectLink: (state, action: PayloadAction<string>) => {
      state.selectedLink = action.payload;
    },
    clearLink: (state) => {
      state.selectedLink = null;
    },
    selectText: (state, action: PayloadAction<string>) => {
      state.selectedText = action.payload;
    },
    clearText: (state) => {
      state.selectedText = null;
    },
  },
});

export const QuillActions = quillSlice.actions;
export const quillReducer = quillSlice.reducer;
export type QuillActionsType = typeof QuillActions;

export const selectSelectedLink = (state: RootState): string | null => state.quill.selectedLink;
export const selectSelectedText = (state: RootState): string | null => state.quill.selectedText;
