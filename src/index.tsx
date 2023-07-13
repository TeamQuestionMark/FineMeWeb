import '@/themes/global.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TypographyPage from './pages/TypographyPage';
import { GlobalContainer } from './components/Layout/GlobalContainer';
import StageComponentsPage from './pages/StageComponentsPage';
import DummyStagePage from './pages/Stage/DummyStagePage';
import StagePreviewPage from './pages/Stage/StagePreviewPage';
import ResultPage from './pages/Result/ResultPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/typography',
    element: <TypographyPage />,
  },
  {
    path: '/stage-components',
    element: <StageComponentsPage />,
  },
  {
    path: '/stage',
    element: <DummyStagePage />,
  },
  {
    path: '/stage/preview',
    element: <StagePreviewPage />,
  },
  {
    path: '/result',
    element: <ResultPage />,
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalContainer>
    <RouterProvider router={router} />
  </GlobalContainer>,
);
