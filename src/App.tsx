import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { persistor, store } from '@store/store';
import { Router } from '@routes/Router';

const queryClient = new QueryClient();

// loading null to create preloader for rehydrating persist store
export async function initApp(appRootNode: HTMLElement): Promise<void> {
  createRoot(appRootNode).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>,
  );
}
