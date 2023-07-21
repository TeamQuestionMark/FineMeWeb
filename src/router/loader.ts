import { QuestionsApi } from '@/api/stages';
import { SEARCH_PARAM_USER_ID } from '@/constants/stage';
import { SESSION_STORAGE_KEY } from '@/constants/storage';
import { stringToNumber } from '@/utils/stringToNumber';
import { LoaderFunction, LoaderFunctionArgs, redirect } from 'react-router-dom';
import { ReturnLoadStage } from './types';

async function loadStage({
  params,
  request,
}: LoaderFunctionArgs): Promise<ReturnLoadStage> {
  const stageId = stringToNumber(params.stageId);

  const data = await QuestionsApi.get(stageId, 1, 100);
  let userId = data.userId;
  const url = new URL(request.url);
  if (!userId) {
    // userId 정보가 없으면 에러
    const userIdParam = url.searchParams.get(SEARCH_PARAM_USER_ID);
    userId = stringToNumber(userIdParam || undefined);
  }

  if (!userId) {
    throw Error('스테이지를 찾을 수 없습니다');
  }

  return {
    ...data,
    isCustom: data.userId !== undefined,
    userId,
    stageId,
  };
}

export const previewStageLoader = loadStage;
export const landingStageLoader = loadStage;
export const stageLoader: LoaderFunction = async ({ params, request }) => {
  const loaderData = await loadStage({ params, request });
  const { userId, stageId } = loaderData;
  const nickname = sessionStorage.getItem(
    SESSION_STORAGE_KEY.nickname(stageId, userId),
  );

  // 닉네임을 입력하지 않았으면 StageLandingPage로 이동
  if (!nickname)
    return redirect(`/stages/${stageId}?${SEARCH_PARAM_USER_ID}=${userId}`);

  return loaderData;
};
