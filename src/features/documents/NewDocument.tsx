import React, { useState } from 'react';
import { AppQuill } from '@features/quill/AppQuill';
import { useUpsertDocument } from './use-upsert-document';
import { DocumentType, DocumentTypes } from './document.interface';

export const NewDocument: React.FunctionComponent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<DocumentType | null>(null);
  const { handleUpsertDocument, isUpserting } = useUpsertDocument();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (value: string): void => {
    setDescription(value);
  };

  const handleDocumentTypeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setType(event.target.value as unknown as DocumentType);
  };

  const handleSave = (): void => {
    if (name && description && type) {
      handleUpsertDocument({
        name,
        description,
        type,
      });

      setName('');
      setDescription('');
      setType(DocumentTypes.Lore as unknown as DocumentType);
    }
  };

  const isButtonDisabled = !name || !description || isUpserting;

  return (
    <div>
      <h1>New Document</h1>
      <label>
        Name:
        <input type="text" name="name" value={name} onChange={handleInputChange} />
      </label>
      <label>
        Type:
        <select onChange={handleDocumentTypeChange}>
          <option selected disabled>
            Select
          </option>
          {Object.values(DocumentTypes).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label>
        Description:
        <AppQuill value={description} onChange={handleDescriptionChange} />
      </label>
      <button onClick={handleSave} disabled={isButtonDisabled}>
        Save Document
      </button>
    </div>
  );
};
