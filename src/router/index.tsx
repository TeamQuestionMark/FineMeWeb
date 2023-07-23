import ResultPage from '@/pages/Result/ResultPage';
import StageCompletedPage from '@/pages/Stage/StageCompletedPage';
import StageLandingPage from '@/pages/Stage/StageLandingPage';
import StagePage from '@/pages/Stage/StagePage';
import StageComponentsPage from '@/pages/StageComponentsPage';
import TermsPage from '@/pages/Terms/TermsPage';
import TypographyPage from '@/pages/TypographyPage';
import { createBrowserRouter } from 'react-router-dom';
import { landingStageLoader, previewStageLoader, stageLoader } from './loader';

const router = createBrowserRouter([
  {
    path: '/terms/privacy',
    element: <TermsPage type="privacy" />,
  },
  {
    path: '/terms/service',
    element: <TermsPage type="service" />,
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
    path: '/result',
    element: <ResultPage />,
  },
  {
    path: '/stages/:stageId/preview',
    element: <StagePage preview />,
    loader: previewStageLoader,
  },
  {
    path: '/stages/:stageId',
    element: <StageLandingPage />,
    loader: landingStageLoader,
  },
  {
    path: '/stages/:stageId/questions',
    element: <StagePage />,
    loader: stageLoader,
  },
  {
    path: '/stages/:stageId/completed/:nickname',
    element: <StageCompletedPage />,
  },
]);

export default router;
