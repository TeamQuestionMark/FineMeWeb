import '@/themes/global.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import TypographyPage from './pages/TypographyPage';
import { GlobalContainer } from './components/Layout/GlobalContainer';
import StageComponentsPage from './pages/StageComponentsPage';
import StagePreviewPage from './pages/Stage/StagePreviewPage';
import ResultPage from './pages/Result/ResultPage';
import StagePage from './pages/Stage/StagePage';
import { QuestionsApi } from './api/stages';
import StageLandingPage from './pages/Stage/StageLandingPage';
import { stringToNumber } from './utils/stringToNumber';
import { SESSION_STORAGE_KEY } from './constants/storage';

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
    path: '/stage/preview',
    element: <StagePreviewPage />,
  },
  {
    path: '/result',
    element: <ResultPage />,
  },
  {
    path: '/stages/:stageId',
    element: <StageLandingPage />,
    loader: ({ params }) => {
      return stringToNumber(params.stageId as string);
    },
  },
  {
    path: '/stages/:stageId/questions',
    element: <StagePage />,
    loader: async ({ params }) => {
      const stageId = stringToNumber(params.stageId);
      const nickname = sessionStorage.getItem(
        SESSION_STORAGE_KEY.nickname(stageId),
      );
      if (!nickname) return redirect(`/stages/${stageId}`);
      return await QuestionsApi.get(stageId, 1, 100);
    },
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalContainer>
    <RouterProvider router={router} />
  </GlobalContainer>,
);
