import { AnswerResult, Answer } from '@/types/answer';
import api, { ResponseData } from '../instance';

export interface StageAnwserPayload {
  userId: number;
  nickname: string;
  answerList: Answer[];
}

export const post = async (stageNo: number, payload: StageAnwserPayload) => {
  const { status } = await api.post(`/stages/${stageNo}/answer`, payload);
  return status;
};

export interface StageAnswerData {
  stageId: number;
  stageQuestionAnswerList: AnswerResult[];
}

export const get = async (uuid: string) => {
  const { data } = await api.get<ResponseData<StageAnswerData>>(
    `/user/stage-answer?uuid=${uuid}`,
  );
  return data.data;
};
