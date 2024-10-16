import { useDispatch, useSelector } from 'react-redux';
import { DocumentsActions, selectIsEditing } from '@features/documents/documents.slice';

type HookResult = { isEditing: boolean; toggleEditing: () => void };

export function useIsEditing(): HookResult {
  const dispatch = useDispatch();
  const isEditing = useSelector(selectIsEditing);

  const toggleEditing = (): void => {
    dispatch(DocumentsActions.toggleEditing());
  };

  return { isEditing, toggleEditing };
}
