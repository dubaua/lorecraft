import { useAppDispatch } from '@store/use-app-dispatch';
import { QuillActions, selectSelectedLink, selectSelectedText } from './quill.slice';
import { useAppSelector } from '@store/use-app-selector';

type HookResult = {
  selectedLink: string | null;
  selectedText: string | null;
  selectLink: (id: string) => void;
  selectText: (id: string) => void;
  clearText: () => void;
};

export function useQuill(): HookResult {
  const dispatch = useAppDispatch();
  const selectedLink = useAppSelector(selectSelectedLink);
  const selectedText = useAppSelector(selectSelectedText);

  const selectLink = (id: string): void => {
    dispatch(QuillActions.selectLink(id));
  };

  const selectText = (id: string): void => {
    dispatch(QuillActions.selectText(id));
  };

  const clearText = (): void => {
    dispatch(QuillActions.clearText());
  };

  return { selectedLink, selectedText, selectLink, selectText, clearText };
}
