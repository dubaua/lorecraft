import React, { useEffect, useState } from 'react';
import { ILocation } from './document.interface';
import { useUpsertDocument } from './use-upsert-document';
import { AppQuill } from '@features/quill/AppQuill';
import { useIsEditing } from './use-is-editing';
import { Description } from './Description';

type Props = {
  location: ILocation;
};

export const Location: React.FunctionComponent<Props> = ({ location }) => {
  const [name, setName] = useState(location.name);
  const [description, setDescription] = useState(location.description);
  const [isChanged, setIsChanged] = useState(false);
  const { isEditing } = useIsEditing();
  const { handleUpsertDocument, isUpserting } = useUpsertDocument();

  useEffect(() => {
    setName(location.name);
    setDescription(location.description);
  }, [location]);

  useEffect(() => {
    setIsChanged(name !== location.name || description !== location.description);
  }, [name, description, location.name, location.description]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleSaveChanges = (): void => {
    if (isChanged) {
      handleUpsertDocument({
        ...location,
        name,
        description,
      });
    }
  };

  const isButtonDisabled = !isChanged || isUpserting;

  return (
    <div>
      {isEditing ? (
        <>
          <h1>
            <input type="text" value={name} onChange={handleNameChange} />
          </h1>
          <AppQuill value={description} onChange={setDescription} />
        </>
      ) : (
        <>
          <h1>{name}</h1>
          <Description html={description} />
        </>
      )}
      {isEditing && (
        <button onClick={handleSaveChanges} disabled={isButtonDisabled}>
          Save Changes
        </button>
      )}
    </div>
  );
};
