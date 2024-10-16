import React from 'react';
import { Outlet } from 'react-router-dom';
import { DocumentsPage } from './documents/DocumentsPage';
export const Layout: React.FunctionComponent = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexBasis: '320px' }}>
        <DocumentsPage />
      </div>
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};
