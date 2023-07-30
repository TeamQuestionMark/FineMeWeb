import { AnswerApi, QuestionsApi } from '@/api/stages';

export interface ReturnLoadStage extends QuestionsApi.StageQuestionData {
  userId: number;
  stageId: number;
  isCustom: boolean;
}

export interface ReturnResultLoader {
  answers: AnswerApi.StageAnswerData;
  questions: QuestionsApi.StageQuestionData;
}

export interface LoaderData {
  StagePage: ReturnLoadStage;
  StageLandingPage: ReturnLoadStage;
  StageCompletedPage: null;
  ResultPage: ReturnResultLoader;
}
