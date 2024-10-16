import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '@features/quill/style-redefine.css';
import { editorSettings } from './editor-settings';
import { useAppDispatch } from '@store/use-app-dispatch';
import { useAppSelector } from '@store/use-app-selector';
import { QuillActions, selectSelectedLink } from './quill.slice';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const AppQuill: React.FunctionComponent<Props> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const dispatch = useAppDispatch();
  const selectedLink = useAppSelector(selectSelectedLink);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.on('selection-change', (selection) => {
        if (selection) {
          const { index, length } = selection;
          const text = quill.getText(index, length).trim();
          if (text) {
            dispatch(QuillActions.selectText(text));
          } else {
            dispatch(QuillActions.clearText());
          }
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedLink && quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.format('link', selectedLink);
      dispatch(QuillActions.clearLink());
      quill.setSelection(0, 0);
    }
  }, [selectedLink, dispatch]);

  return (
    <>
      <ReactQuill ref={quillRef} value={value} onChange={onChange} modules={editorSettings} />
    </>
  );
};

// function handleAddLink(): void {
//   if (value && quillRef.current) {
//     const quill = quillRef.current.getEditor();
//     const selection = quill.getSelection();
//     if (selection && selection.length > 0 && documentId) {
//       const { index, length } = selection;
//       const selectedText = quill.getText(index, length); // get the text of the selection
//       console.log(selectedText); // log the selected text
//       quill.format('link', documentId);
//     }
//   }
// }
