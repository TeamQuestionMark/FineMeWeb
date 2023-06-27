import '@/themes/global.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TypographyPage from './pages/TypographyPage';
import { GlobalContainer } from './components/Layout/GlobalContainer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/typography',
    element: <TypographyPage />,
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalContainer>
    <RouterProvider router={router} />,
  </GlobalContainer>,
);
