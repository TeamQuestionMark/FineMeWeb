import { Answer } from '@/types/stage';
import api from '../instance';

export interface StageAnwserPayload {
  userId: number;
  nickname: string;
  answerList: Answer[];
}

export const post = async (stageNo: number, payload: StageAnwserPayload) => {
  const { status } = await api.post(`/stages/${stageNo}/answer`, payload);
  return status;
};
