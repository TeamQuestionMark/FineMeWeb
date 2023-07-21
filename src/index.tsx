import '@/themes/global.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { GlobalContainer } from './components/Layout/GlobalContainer';
import router from './router';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalContainer>
    <RouterProvider router={router} />
  </GlobalContainer>,
);
