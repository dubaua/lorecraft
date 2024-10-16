import React, { useEffect, useState } from 'react';
import { useDocuments } from './use-documents';
import { CircularProgress, Divider, ListItemText, MenuItem, MenuList } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { QuillActions, selectSelectedText } from '@features/quill/quill.slice';
import { useAppDispatch } from '@store/use-app-dispatch';
import { useAppSelector } from '@store/use-app-selector';
import Fuse from 'fuse.js';
import { IDocumentSummary } from './document.interface';

const fuseOptions = {
  keys: ['name'],
  includeScore: true,
};

export const Navigation: React.FunctionComponent = () => {
  const { documents, isLoading } = useDocuments();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedText = useAppSelector(selectSelectedText);
  const [fuse, setFuse] = useState<Fuse<IDocumentSummary> | null>(null);
  const [result, setResult] = useState<Fuse.FuseResult<IDocumentSummary>[]>([]);

  useEffect(() => {
    setFuse(new Fuse(documents, fuseOptions));
  }, [documents]);

  useEffect(() => {
    if (fuse && selectedText) {
      setResult(fuse.search(selectedText));
    }
  }, [selectedText, fuse]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <MenuList>
      <MenuItem>
        <ListItemText>{selectedText ? 'Inserting' : 'Navigating'}</ListItemText>
      </MenuItem>
      {result.length > 0 && (
        <>
          {result.map((result) => (
            <MenuItem
              key={result.item._id}
              onClick={(): void => {
                dispatch(QuillActions.selectLink(result.item._id));
              }}
            >
              <ListItemText>{result.item.name}</ListItemText>
            </MenuItem>
          ))}
          <Divider />
        </>
      )}
      {documents.map((item) => (
        <MenuItem
          key={item._id}
          onClick={(): void => {
            if (selectedText) {
              dispatch(QuillActions.selectLink(item._id));
            } else {
              navigate(item._id, { replace: true });
            }
          }}
        >
          <ListItemText>{item.name}</ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );
};
