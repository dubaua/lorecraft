import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Routes } from '@routes/routes';
import { Document } from '@features/documents/Document';
import { RouteParams } from './route-params.type';
import { Layout } from '@features/Layout';
import { NewDocument } from '@features/documents/NewDocument';

export const Router: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: Routes.root,
      Component: Layout,
      children: [
        {
          path: `${Routes.root}:${RouteParams.id}`,
          Component: Document,
        },
        {
          path: `${Routes.root}/new`,
          Component: NewDocument,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
