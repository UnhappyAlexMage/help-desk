import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient.ts';

import { RouterProvider } from 'react-router';
import router from './routes/router.tsx';

import { UserProvider } from './providers/RoleContext.tsx';

import './index.css';

async function enableMocking() {
  if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCKS === 'true') {
    const { worker } = await import('./mock/browser.ts')
    await worker.start({onUnhandledRequest: 'bypass'})
    console.log('MSW worker запущен');
  };
};

enableMocking().then(() => 
  {createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
      </UserProvider>
    </StrictMode>,
  )
});
