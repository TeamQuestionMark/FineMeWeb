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
import ResultPage from './pages/Result/ResultPage';
import StagePage from './pages/Stage/StagePage';
import { QuestionsApi } from './api/stages';
import StageLandingPage from './pages/Stage/StageLandingPage';
import { stringToNumber } from './utils/stringToNumber';
import { SESSION_STORAGE_KEY } from './constants/storage';
import StageCompletedPage from './pages/Stage/StageCompletedPage';
import { SEARCH_PARAM_USER_ID } from './constants/stage';
import { StageQuestionData } from './api/stages/questions';

export interface StagePageLoaderData extends StageQuestionData {
  userId: number;
  isCustom: boolean;
}
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
    path: '/result',
    element: <ResultPage />,
  },
  {
    path: '/stages/:stageId/preview',
    element: <StagePage preview />,
    loader: async ({ params }) => {
      const stageId = stringToNumber(params.stageId as string);
      return await QuestionsApi.get(stageId, 1, 100);
    },
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
    loader: async ({
      params,
      request,
    }): Promise<StagePageLoaderData | Response> => {
      const stageId = stringToNumber(params.stageId);
      const nickname = sessionStorage.getItem(
        SESSION_STORAGE_KEY.nickname(stageId),
      );

      // 닉네임을 입력하지 않았으면 StageLandingPage로 이동
      if (!nickname) return redirect(`/stages/${stageId}`);

      // userId 정보가 없으면 에러
      const url = new URL(request.url);
      const userIdParam = url.searchParams.get(SEARCH_PARAM_USER_ID);
      const userId = stringToNumber(userIdParam);
      const data = await QuestionsApi.get(stageId, 1, 100);
      if (!data.userId && !userId) {
        throw Error('스테이지를 찾을 수 없습니다');
      }

      return {
        ...data,
        isCustom: data.userId !== undefined,
        userId: data.userId || userId,
      };
    },
  },
  {
    path: '/stages/:stageId/completed/:nickname',
    element: <StageCompletedPage />,
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalContainer>
    <RouterProvider router={router} />
  </GlobalContainer>,
);
