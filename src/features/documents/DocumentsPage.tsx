import React from 'react';
import { NavLink } from 'react-router-dom';
import { Routes } from '@routes/routes';
import { useIsEditing } from './use-is-editing';
import { Navigation } from './Navigation';

export const DocumentsPage: React.FunctionComponent = () => {
  const { isEditing, toggleEditing } = useIsEditing();
  return (
    <div>
      <h1>Documents</h1>
      <p>
        <NavLink to={Routes.root}>Documents</NavLink>
      </p>
      <p>
        <NavLink to={`${Routes.root}new`}>New Document</NavLink>
      </p>
      <button onClick={toggleEditing}>{isEditing ? 'Switch to Reading' : 'Switch to Editing'}</button>
      <Navigation />
    </div>
  );
};
